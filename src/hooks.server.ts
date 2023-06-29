import { building } from '$app/environment';
import { COOKIE_USER } from '$lib/constants/cookies';
import { sign, verify } from '$lib/helpers/crypt';
import type { Handle } from '@sveltejs/kit';
import { createD1 } from 'cf-workers-proxy';

export const handle = (async ({ event, resolve }) => {
  if (!building) {
    event.locals.D1 = event.platform?.env.D1 ?? createD1({ name: 'D1' });
    const cookie = event.cookies.get(COOKIE_USER);
    if (cookie) {
      const user = await verify<User>(cookie);
      event.locals.user = user;
    } else {
      const { uid } = await event.locals.D1.prepare(
          'insert into User default values returning uid'
        ).first<{ uid: number }>(),
        user: User = { type: 'anonymous', uid },
        jwt = await sign(user);
      event.cookies.set(COOKIE_USER, jwt);
      event.locals.user = user;
    }
  }
  return await resolve(event);
}) satisfies Handle;
