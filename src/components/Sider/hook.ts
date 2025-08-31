import { useContext } from "react";
import { context as DisplayContext } from "../../context/SiderDisplay";

export const useDisplaySider = () => useContext(DisplayContext)
