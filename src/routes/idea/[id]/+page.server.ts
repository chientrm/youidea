import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { PageServerLoad } from './$types';
dayjs.extend(utc);
dayjs.extend(timezone);

export const load = (async ({ params, locals, request }) => {
  const { id } = params,
    data = await locals.D1.prepare(
      'select description, Idea.createdAt, email from Idea, User where id=?1 and Idea.uid = User.uid'
    )
      .bind(id)
      .first<{ description: string; createdAt: Date; email: string }>(),
    // @ts-ignore
    tz = (request.cf?.timezone as string) ?? 'UTC',
    hour = dayjs(data.createdAt).tz(tz, true).format('h:mm a'),
    date = dayjs(data.createdAt).tz(tz, true).format('MMM DD YYYY'),
    { isMobile } = locals;
  return { ...data, hour, date, isMobile };
}) satisfies PageServerLoad;
