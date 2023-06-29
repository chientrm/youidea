import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
  const { user } = locals;
  return { user };
}) satisfies LayoutServerLoad;
