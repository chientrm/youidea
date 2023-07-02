import { base } from '$app/paths';
import { COOKIE_USER } from '$lib/constants/cookies';
import { sign } from '$lib/helpers/crypt';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Actions, PageServerLoad } from './$types';
dayjs.extend(relativeTime);

const _dayjs = dayjs();

export const load = (async ({ locals }) => {
  const result = await locals.D1.prepare(
      'select Idea.id, email, description, Idea.createdAt, loves from Idea, User where Idea.uid = User.uid order by Idea.createdAt desc'
    ).all<{
      id: number;
      email: string;
      description: string;
      createdAt: Date;
      loves: number;
    }>(),
    ideas = (result.results ?? []).map((idea) => ({
      ...idea,
      to: _dayjs.to(idea.createdAt)
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
