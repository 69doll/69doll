import type React from "react";
import Layout from "../../components/Layout";
import { Toaster } from "@/components/ui/sonner";

const Root: React.FC<React.PropsWithChildren> = () => {
  return (<>
    <Layout />
    <Toaster />
  </>)
}

export default Root
