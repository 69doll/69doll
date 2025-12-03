import type React from "react";
import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import type { ID } from "@/types/bean";
import { useAllCategories } from "@/hooks/request/category";

export type SelectCategoryProps = {
  value: ID,
  onChange?: (id: ID) => any,
  excludeIds?: ID[],
}

const SelectCategory: React.FC<Omit<React.ComponentProps<typeof Select>, 'value'> & SelectCategoryProps> = ({
  value,
  onChange,
  excludeIds = [],
  ...props
}) => {
  const { data, isFetching } = useAllCategories()
  const list = useMemo(() => {
    const list = data?.data ?? []
    if (excludeIds.length) {
      return list.filter((item) => !excludeIds.includes(item.id))
    }
    return list
  }, [data])
  return <>
    <Select
      {...props}
      value={value?.toString()}
      onValueChange={(value) => onChange?.(Number(value))}
      disabled={(props.disabled ?? false) || isFetching}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'0'}>根分类 (ID:0)</SelectItem>
        {
          list
            .map((item, index) => {
              return <SelectItem key={`category-${index}`} value={item.id.toString()}>{item.name} (ID:{item.id})</SelectItem>
            })
        }
      </SelectContent>
    </Select>
  </>
}

export default SelectCategory
