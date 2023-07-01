import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ locals }) => {
  if (locals.user.type === 'anonymous') {
    throw redirect(303, `${base}/login?redirectTo=/new`);
  }
}) satisfies PageServerLoad;
