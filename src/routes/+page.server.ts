import { base } from '$app/paths';
import { COOKIE_USER } from '$lib/constants/cookies';
import { sign } from '$lib/helpers/crypt';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ locals, cookies }) => {
    const { uid } = await locals.D1.prepare(
        'insert into User default values returning uid'
      ).first<{ uid: number }>(),
      jwt = await sign<User>({ type: 'anonymous', uid });
    cookies.set(COOKIE_USER, jwt, {path: `${base}/`});
    throw redirect(303, `${base}/`);
  }
} satisfies Actions;
