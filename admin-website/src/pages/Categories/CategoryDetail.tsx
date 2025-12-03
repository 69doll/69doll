import type React from "react"
import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Doll69If } from "shared"
import CategoryAttributeCards from "./CategoryAttributeCards"
import SelectCategory from "@/components/Category/SelectCategory"
import FormItem from "@/components/Form/FormItem"
import FormWrapper from "@/components/Form/FormWrapper"
import ActionInput, { ActionInputActions } from "@/components/Input/ActionInput"
import Page from "@/components/Page/Page"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useAllCategories, useCreateCategory, useUpdateCategory } from "@/hooks/request/category"
import useErrors from "@/hooks/useErrors"
import type { Category } from "@/request/category"

const DataNotFound = lazy(() => import('@/components/Mention/DataNotFound'));
const DataLoading = lazy(() => import('@/components/Mention/DataLoading'));

const CategoryDetail: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const isNew = useMemo(() => categoryId === 'new', [categoryId])

  const navigate = useNavigate()
  const location = useLocation()
  const originData = location.state as { data: Category } | undefined

  const {
    data: categoryRes,
    isFetching: isCategoryFetching,
    isFetched: isCategoryFetched,
  } = useAllCategories(undefined, {
    enabled: !originData && !isNew,
  })
  const currentCategory = useMemo(() => {
    if (isNew) return { parentId: 0 } as any as Category
    if (originData) return originData.data
    return categoryRes?.data.find(c => c.id.toString() === categoryId)
  }, [categoryRes])
  const isNotFound = useMemo(() => {
    return !isNew && isCategoryFetched && !currentCategory || categoryRes?.code === 404
  }, [isNew, isCategoryFetched, currentCategory, categoryRes])

  const pageLabel = useMemo(() => {
    if (isNew) return '新建产品'
    if (isCategoryFetching && !currentCategory) return <Skeleton className="h-[30px] w-[100px]" />
    return currentCategory?.name
  }, [currentCategory, isCategoryFetching, isCategoryFetched])

  const [editCategory, setEditCategory] = useState<Category>()
  const setCategoryValueByKey = <K extends keyof Category>(key: K, value: Category[K]) => {
    setEditCategory(prev => ({
      ...(prev as Category),
      [key]: value,
    }))
  }
  useEffect(() => {
    if (!currentCategory) return
    setEditCategory(currentCategory)
  }, [currentCategory])
  const categoryList = useMemo(() => categoryRes?.data || [], [categoryRes])
  const {
    validate,
    errorMap,
    hasError,
  } = useErrors(editCategory!, {
    name: [
      (value) => !value ? '还没有填分类名' : undefined,
      (value) => categoryList.find((category) => category.name === value && category.id !== editCategory?.id) ? '已存在分类名' : undefined,
    ],
  })
  const { mutateAsync: startCreateCategory } = useCreateCategory()
  const createCategory = async () => {
    if (validate()) {
      await startCreateCategory(editCategory!)
      navigate('/categories')
    }
  }
  const { mutateAsync: startUpdateCategory } = useUpdateCategory()
  const updateCategory = async () => {
    if (validate()) {
      await startUpdateCategory(editCategory!)
      navigate('/categories')
    }
  }

  return <>
    <Page
      label={pageLabel}
      header={<>
        <div className="inline-flex items-center justify-end w-full gap-2">
          <Button variant="outline" size={'sm'} onClick={() => navigate('/categories')}>返回列表</Button>
          <Doll69If display={!isNotFound}>
            <Doll69If display={isNew}>
              <Button variant="outline" size={'sm'} onClick={() => createCategory()}>创建分类</Button>
            </Doll69If>
            <Doll69If display={!isNew}>
              <Button variant="outline" size={'sm'} onClick={() => updateCategory()}>更新分类</Button>
            </Doll69If>
          </Doll69If>
        </div>
      </>}
    >
      <Doll69If display={isNotFound}>
        <Suspense><DataNotFound /></Suspense>
      </Doll69If>
      <Doll69If display={!isNew && isCategoryFetching && !currentCategory}>
        <Suspense><DataLoading /></Suspense>
      </Doll69If>
      <Doll69If display={!!currentCategory}>
        <div className={"grid gap-4 lg:grid-cols-2"}>
          <div>
            <Card>
              <CardContent>
                <FormWrapper>
                  <FormItem label='ID'>
                    <Input
                      defaultValue={isNew ? '添加后自动生成' : editCategory?.id}
                      disabled={true}
                    />
                  </FormItem>
                  <FormItem label='分类名' errors={errorMap['name']}>
                    <ActionInput
                      defaultValue={editCategory?.name}
                      onChange={(e) => setEditCategory(Object.assign({}, editCategory, { name: e.target.value }))}
                      required={true}
                      aria-invalid={hasError('name')}
                      actions={editCategory?.name ? ActionInputActions.Clear(() => setCategoryValueByKey('name', '')) : []}
                    />
                  </FormItem>
                  <FormItem label='父分类'>
                    <SelectCategory
                      value={editCategory?.parentId ?? 0}
                      disabled={!isNew}
                      onChange={(id) => setCategoryValueByKey('parentId', id)}
                      required={isNew}
                    />
                  </FormItem>
                </FormWrapper>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-4 lg:gap-2">
            <CategoryAttributeCards
              category={currentCategory!}
            />
          </div>
        </div>
      </Doll69If>
    </Page>
  </>
}

export default CategoryDetail
