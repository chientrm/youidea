import { COOKIE_USER } from '$lib/constants/cookies';
import { sign } from '$lib/helpers/crypt';
import { validatePassword } from '$lib/helpers/password';
import { validate } from '$lib/helpers/validate';
import { fail, type Actions } from '@sveltejs/kit';
import { string } from 'yup';

export const actions = {
  default: async ({ request, locals, cookies }) => {
    try {
      const { email, password } = await validate(request, {
          email: string().label('Email').required().email(),
          password: string().label('Password').required()
        }),
        dbUser = await locals.D1.prepare(
          'select passwordHash from User where email= ?1'
        )
          .bind(email)
          .first<{ uid: number; passwordHash: string }>();
      if (!dbUser || !(await validatePassword(password, dbUser.passwordHash))) {
        throw new Error('Invalid user or password');
      }
      const uid = dbUser.uid,
        user: User = { type: 'email', uid },
        jwt = await sign(user);
      cookies.set(COOKIE_USER, jwt);
    } catch (e: any) {
      const message = e.message;
      return fail(400, { message });
    }
  }
} satisfies Actions;
