import { COOKIE_USER } from '$lib/constants/cookies';
import { verify } from '$lib/helpers/crypt';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
  const cookie = cookies.get(COOKIE_USER)!,
    user = await verify<User>(cookie);
  return { user };
}) satisfies LayoutServerLoad;
