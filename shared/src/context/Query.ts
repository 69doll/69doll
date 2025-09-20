import React from "react";

export interface QueryContextValue {
  mapping: Record<string, any>,
}

export const context = React.createContext<QueryContextValue>({ } as any)
