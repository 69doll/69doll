import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query"
import {
  createCategory,
  deleteCategory,
  getCategoryAllList,
  updateCategory,
  type AddCategoryInfo,
  type Category,
  type CategoryAllList,
  type CategoryAllListOptions,
} from "@/request/category";
import type { ApiResBody, UseCustomQueryOptions } from "@/types/api.type";

const ROOT_KEYS = ['category', 'info']

export function useAllCategories <
  O extends UseCustomQueryOptions<CategoryAllList> = UseCustomQueryOptions<CategoryAllList>,
>(
  options?: CategoryAllListOptions,
  useQueryOptions?: O,
) {
  const result = useQuery({
    gcTime: 30 * 1000, // 30 seconds
    staleTime: 30 * 60 * 1000, // 30 min
    ...(useQueryOptions ?? {}),
    queryKey: [
      ...ROOT_KEYS,
      'all_list',
      options,
    ].filter(Boolean),
    queryFn: () => getCategoryAllList(options),
  })
  return result
}

export function useCreateCategory (
  useMutationOptions: Omit<UseMutationOptions<ApiResBody, Error, AddCategoryInfo>, 'mutationFn'> = {},
) {
  const queryClient = useQueryClient()
  const result = useMutation({
    mutationKey: [...ROOT_KEYS, 'create'],
    mutationFn: (categoryInfo: Parameters<typeof createCategory>[0]) => createCategory(categoryInfo),
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

export function useUpdateCategory (
  useMutationOptions: Omit<UseMutationOptions<ApiResBody, Error, Category>, 'mutationFn'> = {},
) {
  const queryClient = useQueryClient()
  const result = useMutation({
    mutationKey: [...ROOT_KEYS, 'update'],
    mutationFn: (categoryInfo: Category) => updateCategory(categoryInfo.id, categoryInfo),
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

export function useDeleteCategory (
  useMutationOptions: Omit<UseMutationOptions<ApiResBody, Error, Category>, 'mutationFn'> = {},
) {
  const queryClient = useQueryClient()
  const result = useMutation({
    mutationKey: [...ROOT_KEYS, 'delete'],
    mutationFn: (categoryInfo: Category) => deleteCategory(categoryInfo.id),
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
