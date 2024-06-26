export { default } from 'next-auth/middleware';
export const config = {
  matcher: ['/yachts/add', '/profile', '/yachts/saved', '/messages']
};