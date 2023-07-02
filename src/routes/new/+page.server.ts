import { base } from '$app/paths';
import { validate } from '$lib/helpers/validate';
import { fail, redirect } from '@sveltejs/kit';
import { string } from 'yup';
import type { Actions } from '../$types';
import type { PageServerLoad } from './$types';

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
        { title, description } = await validate(request, {
          title: string().label('Title').trim().required().max(100),
          description: string().label('Description').trim().required().max(5000)
        }),
        idea = await locals.D1.prepare(
          'insert into Idea(uid, title, description) values(?1, ?2, ?3) returning id'
        )
          .bind(uid, title, description)
          .first<{ id: number }>();
      id = idea.id;
    } catch (e: any) {
      const message = e.message;
      return fail(400, { message });
    }
    throw redirect(303, `${base}/idea/${id}`);
  }
} satisfies Actions;
