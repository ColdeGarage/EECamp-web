export function getWebsite(api, data) {
  return api('POST', '/web/getWebsite', data);
}

export function modifyWebsite(api, data) {
  return api('POST', '/web/modifyWebsite', data);
}
