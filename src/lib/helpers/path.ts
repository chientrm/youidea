import { base } from '$app/paths';

export const path = (uri?: string | null) => {
  if (!uri) return '/';
  return `${base}${uri}`;
};
