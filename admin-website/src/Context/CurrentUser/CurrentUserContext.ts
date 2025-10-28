import { createContext } from "react";
import { type User } from "@/request/user";

const CurrentUserContext = createContext<{ user: User | undefined, refresh: () => Promise<any> }>(undefined!)

export default CurrentUserContext
