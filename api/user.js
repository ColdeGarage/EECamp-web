export function register(api, params) {
  return api('POST', '/user/register', params);
}
