import { base } from '$app/paths';
import { formatDate, toNow } from '$lib/helpers/day';
import { validate } from '$lib/helpers/validate';
import { fail, redirect } from '@sveltejs/kit';
import { string } from 'yup';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
  const { id } = params,
    { uid } = locals.user,
    [idea, comments] = await Promise.all([
      locals.D1.prepare(
        'select title, description, Idea.createdAt, email, Idea_Love.createdAt as loveCreatedAt, loves, comments from Idea, User left join Idea_Love on Idea_Love.ideaId = ?1 and Idea_Love.uid = ?2 where Idea.id=?1 and Idea.uid = User.uid'
      )
        .bind(id, uid)
        .first<{
          title: string;
          description: string;
          createdAt: Date;
          loveCreatedAt: Date;
          email: string;
          loves: number;
          comments: number;
        }>(),
      locals.D1.prepare(
        'select id, content, Idea_Comment.createdAt, email from User, Idea_Comment where ideaId=?1 and User.uid = Idea_Comment.uid'
      )
        .bind(id)
        .all<{ id: number; content: string; createdAt: Date; email: string }>()
        .then((result) => result.results ?? [])
        .then((comments) =>
          comments.map((comment) => ({
            ...comment,
            to: toNow(comment.createdAt)
          }))
        )
    ]),
    { isMobile, tz } = locals,
    hour = formatDate(idea.createdAt, tz, 'h:mm a'),
    date = formatDate(idea.createdAt, tz, 'MMM DD YYYY');
  return { idea, comments, id, hour, date, isMobile };
}) satisfies PageServerLoad;

export const actions = {
  love: async ({ params, locals }) => {
    const { id } = params,
      { uid, type } = locals.user;
    if (type === 'anonymous') {
      throw redirect(303, `${base}/login?redirectTo=/idea/${id}`);
    }
    await locals.D1.prepare('insert into Idea_Love(uid, ideaId) values(?1, ?2)')
      .bind(uid, id)
      .run();
    await locals.D1.prepare('update Idea set loves = loves + 1 where id=?1')
      .bind(id)
      .run();
  },
  unlove: async ({ params, locals }) => {
    const { id } = params,
      { uid } = locals.user,
      { meta } = await locals.D1.prepare(
        'delete from Idea_Love where ideaId=?1 and uid=?2'
      )
        .bind(id, uid)
        .run();
    if (meta.changes === 1) {
      await locals.D1.prepare('update Idea set loves = loves - 1 where id=?1')
        .bind(id)
        .run();
    }
  },
  comment: async ({ params, locals, request }) => {
    const { id } = params,
      { uid, type } = locals.user;
    if (type === 'anonymous') {
      throw redirect(303, `${base}/login?redirectTo=/idea/${id}`);
    }
    try {
      const { content } = await validate(request, {
          content: string().required().trim().label('Comment').max(5000)
        }),
        { meta } = await locals.D1.prepare(
          'insert into Idea_Comment(uid, ideaId, content) values(?1, ?2, ?3)'
        )
          .bind(uid, id, content)
          .run();
      if (meta.changes === 1) {
        await locals.D1.prepare(
          'update Idea set comments = comments + 1 where id=?1'
        )
          .bind(id)
          .run();
      }
    } catch (e: any) {
      const message = e.message;
      return fail(400, { message });
    }
  }
} satisfies Actions;
