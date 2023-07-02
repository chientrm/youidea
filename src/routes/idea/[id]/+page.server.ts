import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
  const { id } = params,
    { description, createdAt } = await locals.D1.prepare(
      'select description, createdAt from Idea where id=?1'
    )
      .bind(id)
      .first<{ description: string; createdAt: Date }>();
  return { description, createdAt };
}) satisfies PageServerLoad;
