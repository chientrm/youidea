import { hashPassword } from '$lib/helpers/password';
import { validate } from '$lib/helpers/validate';
import { fail, type Actions } from '@sveltejs/kit';
import { ref, string } from 'yup';

export const actions = {
  default: async ({ request, locals, cookies }) => {
    try {
      const { email, password } = await validate(request, {
          email: string().label('Email').required().email(),
          password: string().label('Password').required(),
          confirmPassword: string().oneOf(
            [ref('password')],
            'Password mismatch!'
          )
        }),
        passwordHash = await hashPassword(password),
        _ = await locals.D1.prepare(
          'insert into User (email, passwordHash) values (?1, ?2)'
        )
          .bind(email, passwordHash)
          .run();
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
