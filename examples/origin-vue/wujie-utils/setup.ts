import type { cacheOptions } from "wujie";

export function setupWujie(setupApp: (options: cacheOptions) => void,setupOptions: cacheOptions[]){
  setupOptions.forEach(options => setupApp(options))
}