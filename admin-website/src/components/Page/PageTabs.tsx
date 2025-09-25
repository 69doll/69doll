import type React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export type PageTabsOptions = {
    name: string,
    value: string,
  }[]

interface PageTabsProps {
  options: PageTabsOptions,
  defaultValue?: string,
  onValueChange?: (v: string) => any,
}

const PageTabs: React.FC<PageTabsProps> = ({ options, defaultValue, onValueChange }) => {
  return <Tabs defaultValue={defaultValue} onValueChange={onValueChange}>
    <TabsList>
      {
        options.map(({ name, value }, index) => <TabsTrigger value={value} key={index}>{name}</TabsTrigger>)
      }
    </TabsList>
  </Tabs>
}

export default PageTabs
