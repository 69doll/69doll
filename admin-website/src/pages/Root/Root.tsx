import { lazy } from "react";
import type React from "react";
import Layout from "../../components/Layout";

const Toaster = lazy(() => import('@/components/ui/Toaster'))

const Root: React.FC<React.PropsWithChildren> = () => {
  return (<>
    <Layout />
    <Toaster />
  </>)
}

export default Root
