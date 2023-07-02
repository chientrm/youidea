import { base } from '$app/paths';
import { COOKIE_USER } from '$lib/constants/cookies';
import { sign } from '$lib/helpers/crypt';
import { hashPassword } from '$lib/helpers/password';
import { validate } from '$lib/helpers/validate';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { ref, string } from 'yup';
import type { PageServerLoad } from '../$types';

export const load = (({ locals, url }) => {
  if (locals.user.type !== 'anonymous') {
    throw redirect(303, `${base}${url.searchParams.get('redirectTo') ?? '/'}`);
  }
  const { isMobile } = locals;
  return { isMobile };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals, cookies, url }) => {
    try {
      const { uid } = locals.user,
        { email, password } = await validate(request, {
          email: string().trim().label('Email').required().email(),
          password: string().label('Password').required().min(6),
          confirmPassword: string().oneOf(
            [ref('password')],
            'Password mismatch!'
          )
        }),
        passwordHash = await hashPassword(password),
        _ = await locals.D1.prepare(
          'update User set email = ?1, passwordHash = ?2 where uid = ?3'
        )
          .bind(email, passwordHash, uid)
          .run(),
        jwt = await sign({ type: 'email', uid, email });
      cookies.set(COOKIE_USER, jwt, { path: `${base}/` });
    } catch (e: any) {
      if (
        e instanceof Error &&
        (e.message.includes('UNIQUE constraint failed') ||
          // @ts-ignore
          e.cause?.message.includes('UNIQUE constraint failed'))
      ) {
        return fail(400, { message: 'Email is already existed!' });
      }
      const message = e.message;
      return fail(400, { message });
    }
    throw redirect(303, `${base}${url.searchParams.get('redirectTo') ?? '/'}`);
  }
} satisfies Actions;
