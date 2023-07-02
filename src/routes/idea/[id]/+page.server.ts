import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { Actions, PageServerLoad } from './$types';
dayjs.extend(utc);
dayjs.extend(timezone);

export const load = (async ({ params, locals }) => {
  const { id } = params,
    { uid } = locals.user,
    [idea, comments] = await Promise.all([
      locals.D1.prepare(
        'select title, description, Idea.createdAt, email, Idea_Love.createdAt as loveCreatedAt, loves from Idea, User left join Idea_Love on Idea_Love.ideaId = ?1 and Idea_Love.uid = ?2 where Idea.id=?1 and Idea.uid = User.uid'
      )
        .bind(id, uid)
        .first<{
          title: string;
          description: string;
          createdAt: Date;
          loveCreatedAt: Date;
          email: string;
          loves: number;
        }>(),
      locals.D1.prepare(
        'select content, Idea_Comment.createdAt, email from User, Idea_Comment where ideaId=?1 and User.uid = Idea_Comment.uid'
      )
        .bind(id)
        .all<{ content: string; createdAt: Date; email: string }>()
        .then((result) => result.results ?? [])
    ]),
    { isMobile, tz } = locals,
    hour = dayjs(idea.createdAt).tz(tz).format('h:mm a'),
    date = dayjs(idea.createdAt).tz(tz).format('MMM DD YYYY');
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
      { uid } = locals.user;
    const tmp = await locals.D1.prepare(
      'delete from Idea_Love where ideaId=?1 and uid=?2'
    )
      .bind(id, uid)
      .run();
    console.log(tmp);
    await locals.D1.prepare('update Idea set loves = loves - 1 where id=?1')
      .bind(id)
      .run();
  }
} satisfies Actions;
