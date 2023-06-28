import { COOKIE_USER } from '$lib/constants/cookies';
import { sign } from '$lib/helpers/crypt';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, cookies }) => {
  const { uid } = await locals.D1.prepare(
      'insert into User default values returning uid'
    ).first<{ uid: number }>('uid'),
    user: User = { type: 'anonymous', uid },
    jwt = await sign(user);
  cookies.set(COOKIE_USER, jwt);
}) satisfies PageServerLoad;
