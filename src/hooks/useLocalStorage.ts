import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";

export default function <T>(...args: Parameters<typeof useLocalStorage<T>>) {
  return import.meta.env.SSR ? React.useState<T>(args[1] as T) : useLocalStorage(...args)
}
