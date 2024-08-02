// only in production
const map:Record<string, string> = {
  "playground": "//localhost:12322/",
  "aff-vue": "//localhost:12323/",
};

export function hostMap(host: string) {
  return map[host];
}
