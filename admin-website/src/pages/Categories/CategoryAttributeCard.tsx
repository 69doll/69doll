import type React from "react";
import { lazy, Suspense, useEffect } from "react";
import { Doll69If } from "shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CategoryAttribute } from "@/request/categoryAttribute";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/components/Form/FormWrapper";
import FormItem from "@/components/Form/FormItem";
import ActionInput, { ActionInputActions } from "@/components/Input/ActionInput";
import useList from "@/hooks/useList";

const PlusCircle = lazy(() => import('@/components/Icon/PlusCircle'));
const Edit = lazy(() => import('@/components/Icon/Edit'));
const Save = lazy(() => import('@/components/Icon/Save'));
const Back = lazy(() => import('@/components/Icon/Back'));
const Delete = lazy(() => import('@/components/Icon/Delete'));

interface CategoryAttributeCardProps {
  categoryAttribute: CategoryAttribute,
  isEdit: boolean,
  disabled?: boolean,
  onCancel: () => any,
  onSave: () => any,
  onDelete: (categoryAttribute: CategoryAttribute) => any,
  onEdit: (categoryAttribute: CategoryAttribute) => any,
  onChange: (key: keyof CategoryAttribute, value: any) => any,
}

const CategoryAttributeCard: React.FC<CategoryAttributeCardProps> = ({
  categoryAttribute,
  isEdit,
  disabled = false,
  onCancel,
  onSave,
  onEdit,
  onChange,
}) => {
  const [values, { init, removeAt, setAt, push }] = useList<string>([])
  useEffect(() => {
    init(JSON.parse(categoryAttribute.valuesJson ?? '[]') as string[])
  }, [categoryAttribute])
  useEffect(() => {
    const content = JSON.stringify(values)
    if (content !== categoryAttribute.valuesJson) {
      onChange('valuesJson', content)
    }
  }, [values])
  return <>
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row justify-between items-center min-h-[32px]">
            <div>属性 - {categoryAttribute.name}</div>
            <div className="flex flex-row gap-2">
              <Doll69If display={!isEdit}>
                <Suspense>
                  <Button
                    variant='outline'
                    size='icon-sm'
                    onClick={() => onEdit(categoryAttribute)}
                  >
                    <Delete />
                  </Button>
                  <Button
                    variant='outline'
                    size='icon-sm'
                    onClick={() => onEdit(categoryAttribute)}
                  >
                    <Edit />
                  </Button>
                </Suspense>
              </Doll69If>
              <Doll69If display={isEdit}>
                <Suspense>
                  <Doll69If display={!disabled}>
                    <Button
                      variant='outline'
                      size='icon-sm'
                      onClick={() => onCancel()}
                    >
                      <Back />
                    </Button>
                  </Doll69If>
                  <Button
                    variant='outline'
                    size='icon-sm'
                    onClick={() => onSave()}
                    disabled={disabled}
                  >
                    <Save />
                  </Button>
                </Suspense>
              </Doll69If>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FormWrapper>
          <FormItem label='属性名'>
            <ActionInput
              value={categoryAttribute.name}
              onChange={(e) => onChange('name', e.target.value)}
              actions={ActionInputActions.Clear(() => onChange('name', ''))}
              required={true}
              disabled={!isEdit || disabled}
            />
          </FormItem>
          <FormItem label='属性值'>
            {
              values.map((value, aIndex) => {
                return <ActionInput
                  key={aIndex}
                  tabIndex={aIndex + 1}
                  value={value}
                  onChange={(e) => setAt(aIndex, e.target.value)}
                  actions={[
                    ActionInputActions.Minus(() => removeAt(aIndex)),
                    ActionInputActions.Clear(() => setAt(aIndex, ''))
                  ]}
                  disabled={!isEdit || disabled}
                />
              })
            }
            <Doll69If display={isEdit}>
              <Suspense>
                <Button
                  variant='outline'
                  onClick={() => push('')}
                  disabled={disabled}
                >
                  <PlusCircle />
                </Button>
              </Suspense>
            </Doll69If>
          </FormItem>
        </FormWrapper>
      </CardContent>
    </Card>
  </>
}

export default CategoryAttributeCard
