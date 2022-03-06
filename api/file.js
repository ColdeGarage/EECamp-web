export function save(api, data, headers) {
  return api('POST', '/file/save', data, headers);
}

export function upload(api, data, headers) {
  return api('POST', '/file/upload', data, headers);
}

export function getFiles(api, data) {
  return api('POST', '/file/getFiles', data);
}

export function removeFile(api, data) {
  return api('POST', '/file/removeFile', data);
}
