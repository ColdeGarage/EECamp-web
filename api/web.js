export function getWebsite(api, data) {
  return api('POST', '/web/getWebsite', data);
}
