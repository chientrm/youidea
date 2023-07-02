import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
  const { user, isMobile } = locals;
  return { user, isMobile };
}) satisfies LayoutServerLoad;
