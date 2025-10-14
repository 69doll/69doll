import type React from "react";
import { Doll69If } from "shared";
import type { MODULE_ENV } from "@/request/modules";
import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";

interface ModuleBreadcrumbItemProps {
  currentEnv: MODULE_ENV,
  env: MODULE_ENV,
  onChange?: (env: MODULE_ENV) => any,
}

const ModuleBreadcrumbItem: React.FC<React.PropsWithChildren<ModuleBreadcrumbItemProps>> = ({
  env,
  currentEnv,
  onChange,
  children,
}) => {
  return <>
    <BreadcrumbItem>
      <Doll69If display={currentEnv === env}>
        <BreadcrumbPage>
          {children}
        </BreadcrumbPage>
      </Doll69If>
      <Doll69If display={currentEnv !== env}>
        <div className="cursor-pointer" onClick={() => onChange?.(env)}>
          {children}
        </div>
      </Doll69If>
    </BreadcrumbItem>
  </>
}

export default ModuleBreadcrumbItem
