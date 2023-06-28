import type { Handle } from '@sveltejs/kit';
import { createD1 } from 'cf-workers-proxy';

export const handle = (async ({ event, resolve }) => {
  event.locals.D1 =
    event.platform?.env?.D1 ??
    createD1({ host: 'http://localhost:8787', name: 'D1' });
  return await resolve(event);
}) satisfies Handle;
