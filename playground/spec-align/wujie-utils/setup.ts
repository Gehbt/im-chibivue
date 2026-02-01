import type { cacheOptions, plugin } from "wujie";

import { hostMap } from "./hostMap";

export function setupWujie(
  setupApp: (options: cacheOptions) => void,
  appName: string[],
  setupOptionTemplate: Partial<cacheOptions>,
) {
  const setupOptions = appName.map((name) => {
    const option = { ...setupOptionTemplate };
    return Object.assign(option, <cacheOptions>{
      name,
      url: hostMap(name),
    }) as cacheOptions;
  });
  setupOptions.forEach((options, index) => {
    DEV && console.log("setup app", appName[index]);
    setupApp(options);
  });

  DEV && console.log("wujie setup success!");
}
