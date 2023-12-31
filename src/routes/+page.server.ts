import { base } from '$app/paths';
import { COOKIE_USER } from '$lib/constants/cookies';
import { sign } from '$lib/helpers/crypt';
import { toNow } from '$lib/helpers/day';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
  const result = await locals.D1.prepare(
      'select Idea.id, email, title, Idea.createdAt, loves, comments from Idea, User where Idea.uid = User.uid order by Idea.createdAt asc'
    ).all<{
      id: number;
      email: string;
      title: string;
      createdAt: Date;
      loves: number;
      comments: number;
    }>(),
    ideas = (result.results ?? []).map((idea) => ({
      ...idea,
      to: toNow(idea.createdAt)
    }));
  return { ideas };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ locals, cookies }) => {
    const { uid } = await locals.D1.prepare(
        'insert into User default values returning uid'
      ).first<{ uid: number }>(),
      jwt = await sign<User>({ type: 'anonymous', uid });
    cookies.set(COOKIE_USER, jwt, { path: `${base}/` });
    throw redirect(303, `${base}/`);
  }
} satisfies Actions;
