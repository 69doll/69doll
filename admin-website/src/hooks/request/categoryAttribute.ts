import { useMutation, useQuery, useQueryClient, type UseMutationOptions } from "@tanstack/react-query"
import { deleteCategoryAttribute, getCategoryAttribute, updateCategoryAttribute, type CategoryAttribute, type CategoryAttributeDetail, type CategoryAttributeDetailOptions } from "@/request/categoryAttribute"
import type { ApiResBody, UseCustomQueryOptions } from "@/types/api.type"

const ROOT_KEYS = ['category', 'attribute']

export function useCategoryAttribute <
  O extends UseCustomQueryOptions<CategoryAttributeDetail> = UseCustomQueryOptions<CategoryAttributeDetail>,
>(
  options: CategoryAttributeDetailOptions,
  useQueryOptions?: O,
) {
  const result = useQuery({
    gcTime: 30 * 1000, // 30 seconds
    staleTime: 30 * 60 * 1000, // 30 min
    ...(useQueryOptions ?? {}),
    queryKey: [
      ...ROOT_KEYS,
      options,
    ].filter(Boolean),
    queryFn: () => getCategoryAttribute(options),
  })
  return result
}

export function useUpdateCategoryAttribute (
  useMutationOptions: Omit<UseMutationOptions<ApiResBody, Error, CategoryAttribute>, 'mutationFn'> = {},
) {
  const queryClient = useQueryClient()
  const result = useMutation({
    mutationKey: [...ROOT_KEYS, 'update'],
    mutationFn: (categoryAttributeInfo: CategoryAttribute) => updateCategoryAttribute(categoryAttributeInfo.id, categoryAttributeInfo),
    ...useMutationOptions,
    onSuccess: async (...params) => {
      const { code } = params[0]
      if (code === 200) {
        queryClient.refetchQueries({ queryKey: [...ROOT_KEYS] })
      }
      await useMutationOptions.onSuccess?.(...params)
    },
  })
  return result
}

export function useDeleteCategoryAttribute (
  useMutationOptions: Omit<UseMutationOptions<ApiResBody, Error, Pick<CategoryAttribute, 'id'>>, 'mutationFn'> = {},
) {
  const queryClient = useQueryClient()
  const result = useMutation({
    mutationKey: [...ROOT_KEYS, 'delete'],
    mutationFn: (categoryAttributeInfo: Pick<CategoryAttribute, 'id'>) => deleteCategoryAttribute(categoryAttributeInfo.id),
    ...useMutationOptions,
    onSuccess: async (...params) => {
      const { code } = params[0]
      if (code === 200) {
        queryClient.refetchQueries({ queryKey: [...ROOT_KEYS] })
      }
      await useMutationOptions.onSuccess?.(...params)
    },
  })
  return result
}

