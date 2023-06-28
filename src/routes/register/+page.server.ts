import { COOKIE_USER } from '$lib/constants/cookies';
import { sign, verify } from '$lib/helpers/crypt';
import { hashPassword } from '$lib/helpers/password';
import { validate } from '$lib/helpers/validate';
import { fail, type Actions } from '@sveltejs/kit';
import { ref, string } from 'yup';

export const actions = {
  default: async ({ request, locals, cookies }) => {
    try {
      const { uid } = await verify<User>(cookies.get(COOKIE_USER)!),
        { email, password } = await validate(request, {
          email: string().label('Email').required().email(),
          password: string().label('Password').required(),
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
        jwt = await sign<User>({ type: 'email', uid, email });
      cookies.set(COOKIE_USER, jwt);
    } catch (e: any) {
      if (
        e instanceof Error &&
        e.message.includes('UNIQUE constraint failed')
      ) {
        return fail(400, { message: 'Email is already existed!' });
      }
      const message = e.message;
      return fail(400, { message });
    }
  }
} satisfies Actions;
