export function register(api, data) {
  return api('POST', '/user/register', data);
}

export function getUsersStatus(api, data) {
  return api('POST', '/user/getUsersStatus', data);
}
