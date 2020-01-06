import { writeFileSync } from 'fs';
import { init } from './utils';
import { Course } from '../models';

async function main(): Promise<void> {
  const courses = await Course.query();

  const urls = [
    '',
    '/courses',
    ...courses.map(({ id }) => `/course/${id}`),
    '/reviews',
    '/review',
    '/login',
    '/register',
    '/reset-password',
    '/set-password',
    '/privacy',
    '/terms',
    '/user/profile',
    '/user/reviews',
    ...[400, 401, 402, 403, 404, 500].map(code => `/error/${code}`)
  ].map(path => 'https://omscentral.com' + path);

  writeFileSync(`${__dirname}/../../../sitemap.txt`, urls.join('\n'), 'utf8');
}

init(main);
