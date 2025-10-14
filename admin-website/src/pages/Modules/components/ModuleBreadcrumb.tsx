import type React from "react";
import ModuleBreadcrumbItem from "./ModuleBreadcrumbItem";
import { MODULE_ENV } from "@/request/modules";
import { Breadcrumb, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface ModuleBreadcrumbProps {
  currenEnv: MODULE_ENV,
  onChange?: (env: MODULE_ENV) => any,
}

const ModuleBreadcrumb: React.FC<ModuleBreadcrumbProps> = ({
  currenEnv,
  onChange,
}) => {
  return <Breadcrumb>
    <BreadcrumbList>
      <ModuleBreadcrumbItem
        currentEnv={currenEnv}
        env={MODULE_ENV.DRAFT}
        onChange={onChange}
      >
        草稿阶段
      </ModuleBreadcrumbItem>
      <BreadcrumbSeparator />
      <ModuleBreadcrumbItem
        currentEnv={currenEnv}
        env={MODULE_ENV.STAGING}
        onChange={onChange}
      >
        预览环境
      </ModuleBreadcrumbItem>
      <BreadcrumbSeparator />
      <ModuleBreadcrumbItem
        currentEnv={currenEnv}
        env={MODULE_ENV.PRODUCTION}
        onChange={onChange}
      >
        生成环境
      </ModuleBreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
}

export default ModuleBreadcrumb
