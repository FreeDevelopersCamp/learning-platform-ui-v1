import { nprogress } from "@mantine/nprogress";
import { ComponentType, LazyExoticComponent, lazy as baseLazy } from "react";

export function lazy<T extends ComponentType<any>>(
  load: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return baseLazy(async () => {
    nprogress.start();
    const file = await load();
    nprogress.complete();

    return file;
  });
}
