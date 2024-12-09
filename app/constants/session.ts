export const myCookie = {
  name: 'login_test',
  options: { httpOnly: true, secure: true, path: '/' },
  duration: 24 * 60 * 60 * 1000,
}