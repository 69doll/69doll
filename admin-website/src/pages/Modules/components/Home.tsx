import { useMutation, useQuery } from "@tanstack/react-query";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Doll69If } from "shared";
import { ArchiveX, ArrowDownIcon, ArrowUpIcon, Eye, HardDriveUpload, Plus, RefreshCcw, Save } from "lucide-react";
import { castArray } from "es-toolkit/compat";
import ModuleBreadcrumb from "./ModuleBreadcrumb";
import TKDCard from "./TKDCard";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getPageModuleData, getPageModuleDataCacheKeys, MODULE_ENV, updatePageModuleData, type PageModuleData } from "@/request/modules";
import useTKDState from "@/hooks/useTKDState";
import useList from "@/hooks/useList";
import useIsQuerying from "@/hooks/useIsQuerying";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelectImagesDialogRef } from "@/components/Image/SelectImagesDialog.hook";
import ImageActions from "@/components/Image/ImageActions";
import SelectImagesDialog from "@/components/Image/SelectImagesDialog";
import useImagePreview from "@/Context/ImagePreview/useImagePreview";

interface HomeProps {
  currentPage: string,
  page: string,
}

const COMPONENT = {
  BANNER: 'banner',
  RECOMMEND: 'recommend',
  LARGE_AD: 'largeAD',
} as const

type COMPONENT = typeof COMPONENT[keyof typeof COMPONENT]

type COMPONENT_BANNER_DATA = {
  component: typeof COMPONENT.BANNER,
  revealList: { imageUrl: string }[],
  menuList: [
    { imageUrl: string },
    { imageUrl: string },
    { imageUrl: string },
    { imageUrl: string },
  ],
}

type COMPONENT_RECOMMEND_DATA = {
  component: typeof COMPONENT.RECOMMEND,
  title: string,
  tags: string[],
  map: Record<string, { imageUrl: string, title: string, flags: string[] }>,
}

type COMPONENT_LARGE_AD_DATA = {
  component: typeof COMPONENT.LARGE_AD,
  imageUrl: string
}

type HomePageData = COMPONENT_BANNER_DATA |
  COMPONENT_RECOMMEND_DATA |
  COMPONENT_LARGE_AD_DATA

const i18n = {
  [COMPONENT.BANNER]: 'Banner',
  [COMPONENT.RECOMMEND]: '推荐栏目',
  [COMPONENT.LARGE_AD]: '大屏广告',
} as const

const Home: React.FC<HomeProps> = ({ currentPage, page }) => {
  const imagePreview = useImagePreview()
  const selectImagesDialogRef = useSelectImagesDialogRef()
  const isLoading = useIsQuerying()
  const [tkd, setTKD, initTKD] = useTKDState()
  const [list, { init, moveUp, moveDown, removeAt, setAt, unshift, push }] = useList<HomePageData>()
  const [moduleEnv, setModuleEnv] = useState<MODULE_ENV>(MODULE_ENV.DRAFT)
  const { data, isFetching, refetch: refreshData } = useQuery({
    queryKey: getPageModuleDataCacheKeys(page, moduleEnv),
    queryFn: () => getPageModuleData<HomePageData[]>(page, moduleEnv),
    enabled: currentPage === page,
    refetchOnWindowFocus: false,
  })
  useEffect(() => {
    initTKD(data ?? {})
    init(data?.data ?? [])
  }, [data])
  const changeModuleEnv = (env: MODULE_ENV) => {
    setModuleEnv(env)
    refreshData()
  }
  const changeValueByIndexByKey = (index: number, key: string, value: any) => {
    setAt(index, key, value)
  }
  const onSelectImage = useRef<((selectedKeys: string[]) => void)>(null);
  const startSelectImages = (selectedKeys: string | string[], onChange: (selectedKeys: string[]) => void) => {
    onSelectImage.current = onChange
    selectImagesDialogRef.current?.open(castArray(selectedKeys))
  }
  const disabledEdit = useMemo(() => {
    return isLoading || moduleEnv !== MODULE_ENV.DRAFT
  }, [isLoading, moduleEnv])

  const { mutateAsync } = useMutation({
    mutationFn: async (env: MODULE_ENV) => {
      const body: PageModuleData<HomePageData[]> = {
        ...data!,
        data: list,
        title: tkd.title!,
        description: tkd.description!,
        keywords: tkd.keywords!,
      }
      await updatePageModuleData(body, page, env)
    },
  })
  const deploy = async (env: MODULE_ENV) => {
    await mutateAsync(env)
    env !== MODULE_ENV.DRAFT && changeModuleEnv(env)
  }

  const appendButton = useCallback(({ onChange }: { onChange?: (componentObj: object) => any }) => {
    const hasBanner = list.some((item) => item.component === COMPONENT.BANNER)
    const componentList = [
      {
        value: COMPONENT.BANNER,
        label: `增加${i18n[COMPONENT.BANNER]}`,
        disabled: hasBanner,
        default: {
          revealList: [],
          menuList: Array(4).fill(undefined).map(() => ({})),
        },
      },
      { value: COMPONENT.RECOMMEND, label: `增加${i18n[COMPONENT.RECOMMEND]}` },
      { value: COMPONENT.LARGE_AD, label: `增加${i18n[COMPONENT.LARGE_AD]}` },
    ]
    return <>
      <Doll69If display={!disabledEdit}>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-56">
                <Plus />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                {
                  componentList.map((componentItem, index) => {
                    const defaultComponentObject = {
                      component: componentItem.value,
                      ...componentItem.default ?? {},
                    }
                    return <DropdownMenuItem
                      key={index}
                      onClick={() => onChange?.(defaultComponentObject)}
                      disabled={componentItem.disabled}
                    >{componentItem.label}</DropdownMenuItem>
                  })
                }
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Doll69If>
    </>
  }, [list, disabledEdit])
  return <>
    <div className="flex flex-wrap justify-between items-center min-h-[45px] gap-2 py-2">
      <div className="shrink-0">
        <ModuleBreadcrumb currenEnv={moduleEnv} onChange={(env) => changeModuleEnv(env)} />
      </div>
      {
        !isFetching && <>
          <div className="flex gap-2">
            <Doll69If display={moduleEnv === MODULE_ENV.DRAFT}>
              <Button size='sm' variant="outline" disabled={isLoading} onClick={() => refreshData()}><RefreshCcw />重新加载</Button>
              <Button size='sm' variant="outline" disabled={isLoading} onClick={() => deploy(MODULE_ENV.STAGING)}><HardDriveUpload />发布到预览环境</Button>
              <Button size='sm' variant="outline" disabled={isLoading} onClick={() => deploy(MODULE_ENV.DRAFT)}><Save />保存草稿</Button>
            </Doll69If>
            <Doll69If display={moduleEnv === MODULE_ENV.STAGING}>
              <Button size='sm' variant="outline" disabled={isLoading} onClick={() => deploy(MODULE_ENV.PRODUCTION)}><HardDriveUpload />发布到生产环境</Button>
            </Doll69If>
          </div>
        </>
      }
    </div>
    <div className="flex flex-col gap-4">
      {
        isFetching && <>
          <Skeleton className="w-full h-[300px]" />
        </>
      }
      {
        !isFetching && <>
          <TKDCard
            {...tkd}
            onChange={(key, value) => setTKD(key, value)}
            disabled={disabledEdit}
          />
          {
            list.length >= 1 &&
            appendButton({ onChange: (obj) => unshift(obj as any) })
          }
          {
            list?.map((itemObj, index, list) => {
              return <Card key={`card-${index}`}>
                <CardHeader>
                  <CardTitle>{i18n[itemObj.component]}</CardTitle>
                  <Doll69If display={moduleEnv === MODULE_ENV.DRAFT}>
                    <CardAction>
                      <div className="flex flex-row gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={isLoading || index === 0}
                          onClick={() => moveUp(index)}
                        >
                          <ArrowUpIcon />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={isLoading || index === list.length - 1}
                          onClick={() => moveDown(index)}
                        >
                          <ArrowDownIcon />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeAt(index)}
                          disabled={isLoading}
                        >
                          <ArchiveX />
                        </Button>
                      </div>
                    </CardAction>
                  </Doll69If>
                </CardHeader>
                <CardContent>
                  {
                    itemObj.component === COMPONENT.BANNER && <>
                      <div className="flex flex-col gap-3">
                        {
                          (itemObj.revealList.length ? itemObj.revealList : Array(1).fill(undefined).map(() => ({ imageUrl: undefined }))).map((revealItem, rIndex) => {
                            return <>
                              <ImageActions
                                src={revealItem.imageUrl}
                                {...(revealItem.imageUrl ? {
                                  actionBody: <Eye />,
                                  onActionBody: () => imagePreview(revealItem.imageUrl),
                                  actionFooter: '选择图片',
                                  onActionFooter: () => startSelectImages(revealItem.imageUrl, ([imageUrl]) => changeValueByIndexByKey(index, `revealList[${rIndex}]`, { imageUrl }))
                                } : {
                                  actionBody: '选择图片',
                                  onActionBody: () => startSelectImages([], ([imageUrl]) => changeValueByIndexByKey(index, `revealList[${rIndex}]`, { imageUrl }))
                                })}
                              />
                            </>
                          })
                        }
                        <div className="grid grid-flow-col">
                          {
                            itemObj.menuList.map((menuItem, mIndex) => {
                              return <>
                                <ImageActions
                                  key={mIndex}
                                  src={menuItem.imageUrl}
                                  {...(menuItem.imageUrl ? {
                                    actionBody: <Eye />,
                                    onActionBody: () => imagePreview(menuItem.imageUrl),
                                    actionFooter: '选择图片',
                                    onActionFooter: () => startSelectImages(menuItem.imageUrl, ([value]) => changeValueByIndexByKey(index, `menuList[${mIndex}]`, { imageUrl: value }))
                                  } : {
                                    actionBody: '选择图片',
                                    onActionBody: () => startSelectImages(menuItem.imageUrl, ([value]) => changeValueByIndexByKey(index, `menuList[${mIndex}]`, { imageUrl: value }))
                                  })}
                                />
                              </>
                            })
                          }
                        </div>
                      </div>
                    </>
                  }
                  {
                    itemObj.component === COMPONENT.RECOMMEND && <>
                    </>
                  }
                  {
                    itemObj.component === COMPONENT.LARGE_AD && <>
                      <ImageActions
                        src={itemObj.imageUrl}
                        {...(itemObj.imageUrl ? {
                          actionBody: <Eye />,
                          onActionBody: () => imagePreview(itemObj.imageUrl),
                          actionFooter: '选择图片',
                          onActionFooter: () => startSelectImages(itemObj.imageUrl, ([value]) => changeValueByIndexByKey(index, 'imageUrl', value))
                        } : {
                          actionBody: '选择图片',
                          onActionBody: () => startSelectImages(itemObj.imageUrl, ([value]) => changeValueByIndexByKey(index, 'imageUrl', value))
                        })}
                      />
                    </>
                  }
                </CardContent>
              </Card>
            })
          }
          {
            appendButton({ onChange: (obj) => push(obj as any) })
          }
          <SelectImagesDialog
            ref={selectImagesDialogRef}
            min={1}
            max={1}
            onChange={(selectedKeys) => onSelectImage.current?.(selectedKeys)}
          />
        </>
      }
    </div>
  </>
}

export default Home
