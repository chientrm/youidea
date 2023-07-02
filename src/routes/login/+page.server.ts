import { base } from '$app/paths';
import { COOKIE_USER } from '$lib/constants/cookies';
import { sign } from '$lib/helpers/crypt';
import { validatePassword } from '$lib/helpers/password';
import { validate } from '$lib/helpers/validate';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { string } from 'yup';
import type { PageServerLoad } from '../$types';

export const load = (({ locals, url }) => {
  if (locals.user.type !== 'anonymous') {
    throw redirect(303, `${base}${url.searchParams.get('redirectTo') ?? '/'}`);
  }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals, cookies, url }) => {
    try {
      const { email, password } = await validate(request, {
          email: string().trim().label('Email').required().email(),
          password: string().label('Password').required()
        }),
        dbUser = await locals.D1.prepare(
          'select uid, passwordHash from User where email= ?1'
        )
          .bind(email)
          .first<{ uid: number; passwordHash: string }>();
      if (!dbUser || !(await validatePassword(password, dbUser.passwordHash))) {
        throw new Error('Invalid user or password');
      }
      const uid = dbUser.uid,
        user: User = { type: 'email', uid, email },
        jwt = await sign(user);
      cookies.set(COOKIE_USER, jwt, { path: `${base}/` });
    } catch (e: any) {
      const message = e.message;
      return fail(400, { message });
    }
    throw redirect(303, `${base}${url.searchParams.get('redirectTo') ?? '/'}`);
  }
} satisfies Actions;
