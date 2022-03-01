export function save(api, data, headers) {
  return api('POST', '/file/save', data, headers);
}

export function getFiles(api, data) {
  return api('POST', '/file/getFiles', data);
}
