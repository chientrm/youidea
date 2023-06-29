import { COOKIE_USER } from '$lib/constants/cookies';
import { sign } from '$lib/helpers/crypt';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { path } from '$lib/helpers/path';

export const actions = {
  default: async ({ locals, cookies }) => {
    const { uid } = await locals.D1.prepare(
        'insert into User default values returning uid'
      ).first<{ uid: number }>(),
      jwt = await sign<User>({ type: 'anonymous', uid });
    cookies.set(COOKIE_USER, jwt);
    throw redirect(303, path());
  }
} satisfies Actions;
