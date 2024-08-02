export function credentialsFetch(url: RequestInfo, options?: RequestInit) {
  return window.fetch(url, {
    ...options,
    credentials: "omit",
  });
}
