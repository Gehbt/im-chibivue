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
    // oxlint-disable-next-line no-unused-expressions
    WJ_DEBUG && console.log("setup app", appName[index]);
    setupApp(options);
  });

  // oxlint-disable-next-line no-unused-expressions
  WJ_DEBUG && console.log("wujie setup success!");
}
