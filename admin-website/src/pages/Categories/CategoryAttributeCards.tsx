import { lazy, Suspense, useMemo, useState } from "react"
import { Doll69If } from "shared"
import { Plus } from "lucide-react"
import CategoryAttributeCard from "./CategoryAttributeCard"
import { useCategoryAttribute, useDeleteCategoryAttribute, useUpdateCategoryAttribute } from "@/hooks/request/categoryAttribute"
import type { Category } from "@/request/category"
import type { OneOf } from "@/types/common"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

const DataLoading = lazy(() => import('@/components/Mention/DataLoading'));

interface CategoryAttributeCardsProps {
  category: Pick<Category, 'id'>,
}

const CategoryAttributeCards: React.FC<CategoryAttributeCardsProps> = ({
  category,
}) => {
  const isNew = useMemo(() => !category.id, [category])
  const {
    data: categoryAttributeRes,
    isFetching: isCategoryAttributeFetching,
    isFetched: isCategoryAttributeFetched,
    refetch,
  } = useCategoryAttribute(
    { categoryId: category?.id },
    { enabled: !!category?.id },
  )
  const categoryAttributeList = useMemo(() => {
    return categoryAttributeRes?.data ?? []
  }, [categoryAttributeRes, isCategoryAttributeFetched])

  const [
    editingCategoryAttribute,
    setEditingCategoryAttribute
  ] = useState<OneOf<typeof categoryAttributeList>>()
  const updateAttributeByKey = <K extends keyof NonNullable<typeof editingCategoryAttribute>>(key: K, value: NonNullable<typeof editingCategoryAttribute>[K]) => {
    setEditingCategoryAttribute(prev => prev ? { ...prev, [key]: value } : prev)
  }
  const isEditingAttribute = (originData: OneOf<NonNullable<typeof categoryAttributeRes>['data']>) => {
    return editingCategoryAttribute?.id === originData.id
  }
  const { mutateAsync: startUpdateCategoryAttribute, isPending: isUpdating } = useUpdateCategoryAttribute({
    onSuccess (data) {
      if (data.code === 200) {
        refetch()
      }
    }
  })
  const updateCategoryAttribute = async () => {
    if (!editingCategoryAttribute) return
    await startUpdateCategoryAttribute({
      ...editingCategoryAttribute,
      valuesJson: JSON.stringify((JSON.parse(editingCategoryAttribute.valuesJson) as string[]).filter(Boolean)),
    })
    setEditingCategoryAttribute(undefined)
  }
  const { mutateAsync: startDeleteCategoryAttribute, isPending: isDeleting } = useDeleteCategoryAttribute({
    onSuccess (data) {
      if (data.code === 200) {
        refetch()
      }
    }
  })

  return <>
    <Doll69If display={!isNew && isCategoryAttributeFetching && !categoryAttributeList.length}>
      <Card>
        <CardContent>
          <Suspense><DataLoading /></Suspense>
        </CardContent>
      </Card>
    </Doll69If>

    <Doll69If display={isNew || isCategoryAttributeFetched}>
      {
        categoryAttributeList.map((categoryAttribute, index) => {
          return <CategoryAttributeCard
            key={`category-attribute-${index}`}
            isEdit={isEditingAttribute(categoryAttribute)}
            categoryAttribute={isEditingAttribute(categoryAttribute) ? editingCategoryAttribute! : categoryAttribute}
            onCancel={() => setEditingCategoryAttribute(undefined)}
            onEdit={() => setEditingCategoryAttribute(categoryAttribute)}
            onSave={() => updateCategoryAttribute()}
            onDelete={() => startDeleteCategoryAttribute(categoryAttribute)}
            onChange={(key, value) => updateAttributeByKey(key, value)}
            disabled={isCategoryAttributeFetching || isUpdating || isDeleting}
          />
        })
      }
      <Doll69If display={!editingCategoryAttribute && !isCategoryAttributeFetching}>
        <Card>
          <CardContent>
            <Empty>
              <EmptyHeader>
                <EmptyMedia>
                  <Plus />
                </EmptyMedia>
                <EmptyTitle>增加分类属性</EmptyTitle>
                <Doll69If display={isNew}>
                  <EmptyDescription>添加分类后才能进行添加/编辑分类属性</EmptyDescription>
                </Doll69If>
              </EmptyHeader>
              <Doll69If display={!isNew}>
                <EmptyContent>
                  <Button variant='outline'>增加分类属性</Button>
                </EmptyContent>
              </Doll69If>
            </Empty>
          </CardContent>
        </Card>
      </Doll69If>
    </Doll69If>
  </>
}

export default CategoryAttributeCards
