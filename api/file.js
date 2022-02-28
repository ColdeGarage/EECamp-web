export function save(api, data, headers) {
  return api('POST', '/file/save', data, headers);
}
