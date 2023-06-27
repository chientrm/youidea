import { validate } from '$lib/helpers/validate';
import { fail, type Actions } from '@sveltejs/kit';
import { ref, string } from 'yup';

export const actions = {
  default: async ({ request }) => {
    try {
      const { email, password } = await validate(request, {
        email: string().label('Email').required().email(),
        password: string().label('Password').required()
      });
    } catch (e: any) {
      const message = e.message;
      return fail(400, { message });
    }
  }
} satisfies Actions;
