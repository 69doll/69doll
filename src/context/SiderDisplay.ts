import { createContext, useState } from "react";

export const context = createContext<ReturnType<typeof useState<boolean>>>(undefined as any)
