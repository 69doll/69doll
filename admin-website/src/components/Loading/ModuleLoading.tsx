import React from "react";

export default function ModuleLoading ({ children }: { children: React.ReactNode }) {
  return <React.Suspense fallback={<div>Module Loading...</div>}>
    {children}
  </React.Suspense>
}
