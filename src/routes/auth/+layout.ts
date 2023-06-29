import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
  const { user } = await event.parent();
  if (user.type !== 'anonymous') {
    throw redirect(302, '/');
  }
}) satisfies LayoutLoad;
