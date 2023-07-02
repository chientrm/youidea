import { base } from '$app/paths';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from '../$types';
import { validate } from '$lib/helpers/validate';
import { string } from 'yup';

export const load = (({ locals }) => {
  if (locals.user.type === 'anonymous') {
    throw redirect(303, `${base}/login?redirectTo=/new`);
  }
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals }) => {
    let id: number;
    try {
      const { uid } = locals.user,
        { description } = await validate(request, {
          description: string()
            .label('Description')
            .required()
            .min(30)
            .max(5000)
        }),
        idea = await locals.D1.prepare(
          'insert into Idea(uid, description) values(?1, ?2) returning id'
        )
          .bind(uid, description)
          .first<{ id: number }>();
      id = idea.id;
    } catch (e: any) {
      const message = e.message;
      return fail(400, { message });
    }
    throw redirect(303, `${base}/idea/${id}`);
  }
} satisfies Actions;
