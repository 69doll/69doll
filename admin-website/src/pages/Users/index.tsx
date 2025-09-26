import type React from "react"
import { useMemo, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Button } from "../../components/ui/button"
import DeleteButton from "../../components/Button/DeleteButton"
import { Doll69If } from "shared"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../../components/ui/sheet"
import { Skeleton } from "../../components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import TableDateCell from "../../components/Table/TableDateCell"
import tableCss from '../../styles/table.module.scss'
import { createUser, deleteUser, getUserList, getUserListCacheKeys, updateUser, UserType, type User } from "../../request/user"
import TablePage, { type TablePageOnValueChange } from "@/components/Page/TablePage"
import PageTabs from "@/components/Page/PageTabs"
import { useCurrentUser, useRefreshCurrentUser } from "@/Context/CurrentUser"
import PageName from "@/components/Page/PageName"
import { hasAuthorization } from "@/store/authorization"

const SUPPORT_PAGE_SIZE = [15, 25, 50, 100]

const Users: React.FC = () => {
  const userTabs = [
    { name: '普通用户', value: UserType.APP },
    { name: '管理员', value: UserType.ADMIN },
  ]

  const [userType, setUserType] = useState<UserType>(UserType.APP)
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(SUPPORT_PAGE_SIZE[0])
  const getUserListOpts = useMemo(() => ({ type: userType, pageNum, pageSize }), [pageNum, pageSize, userType])
  const queryKey = useMemo(() => getUserListCacheKeys(getUserListOpts), [getUserListOpts])
  const queryFn = useMemo(() => () => getUserList(getUserListOpts), [getUserListOpts])
  const { data, isFetching, isSuccess, refetch: refetchList } = useQuery({
    queryKey,
    queryFn: queryFn,
    enabled: hasAuthorization(),
  })
  const list = useMemo(() => {
    return data?.data?.list ?? []
  }, [data])
  const totalNum = useMemo(() => {
    return data?.data?.total ?? list.length
  }, [data])
  const totalPageNum = useMemo(() => {
    return data?.data?.totalPage ?? 1
  }, [data])
  const onPageChange: TablePageOnValueChange = ({ pageNum: nextPageNum, pageSize: nextPageSize }) => {
    if (nextPageSize && nextPageSize !== pageSize) {
      setPageNum(1)
      setPageSize(nextPageSize)
    } else {
      setPageNum(nextPageNum)
    }
  }

  const [editUser, setEditUser] = useState<any>()
  const onFormChange = ({ name, value }: { name: string, value: any }) => {
    setEditUser({
      ...editUser,
      [name]: value,
    })
  }
  const isOpenSheet = useMemo(() => !!editUser, [editUser])

  const currentUser = useCurrentUser()
  const refreshCurrentUser = useRefreshCurrentUser()

  const { mutateAsync: addUser } = useMutation({
    mutationFn: (userInfo: Parameters<typeof createUser>[0]) => createUser(userInfo),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        setEditUser(undefined)
        setPageNum(1)
        await refetchList()
      }
    }
  })
  const add = async () => {
    await addUser(editUser)
  }
  const { mutateAsync: saveUser } = useMutation({
    mutationFn: (userInfo: User) => updateUser(userInfo.id, userInfo),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        setEditUser(undefined)
        await refetchList()
        await refreshCurrentUser()
      }
    }
  })
  const save = async () => {
    await saveUser(editUser)
  }
  const { mutateAsync: removeUser } = useMutation({
    mutationFn: (userInfo: User) => deleteUser(userInfo.id),
    onSuccess: async ({ code }) => {
      if (code === 200) {
        await refetchList()
      }
    }
  })
  return <>
    <TablePage
      label={<PageName name='用户管理' isLoading={isFetching} onRefresh={refetchList} />}
      pageNum={pageNum}
      totalNum={totalNum}
      totalPageNum={totalPageNum}
      pageSize={pageSize}
      pageSizes={SUPPORT_PAGE_SIZE}
      onValueChange={onPageChange}
      header={
        <div className='w-full flex flex-row justify-between'>
          <PageTabs
            options={userTabs}
            defaultValue={userType}
            onValueChange={(v) => setUserType(v as UserType)}
          />
          <Button variant="outline" size='sm' onClick={() => setEditUser({ status: true })}>新增用户</Button>
        </div>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>昵称</TableHead>
            <TableHead>状态</TableHead>
            <TableHead className={tableCss.date}>创建时间</TableHead>
            <TableHead className={tableCss.actions}>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Doll69If display={isFetching}>
            {
              Array(pageSize).fill(undefined).map(() => <TableRow>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                <TableCell className={tableCss.date}><Skeleton className="h-4 w-full" /></TableCell>
              </TableRow>)
            }
          </Doll69If>
          <Doll69If display={!isFetching && isSuccess}>
            {
              list.map((item, index) => {
                return <TableRow key={index}>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.nickname}</TableCell>
                  <TableCell>{item.status ? '可用' : '不可用'}</TableCell>
                  <TableCell className={tableCss.date}>
                    <TableDateCell date={item.createdAt} />
                  </TableCell>
                  <TableCell className={tableCss.actions}>
                    <Button size='sm' variant="outline" onClick={() => setEditUser(item)}>修改</Button>
                    <Doll69If display={item.id !== currentUser?.id}>
                      <DeleteButton size='sm' onClick={() => removeUser(item)} />
                    </Doll69If>
                  </TableCell>
                </TableRow>
              })
            }
          </Doll69If>
        </TableBody>
      </Table>
    </TablePage>
    <Sheet open={isOpenSheet}>
      <SheetContent headerClose={false}>
        <SheetHeader>
          <Doll69If display={!editUser?.id}>
            <SheetTitle>添加用户</SheetTitle>
            <SheetDescription>
              添加一个{userType === UserType.APP ? '普通用户' : '管理员'}
            </SheetDescription>
          </Doll69If>
          <Doll69If display={editUser?.id}>
            <SheetTitle>修改用户信息</SheetTitle>
            <SheetDescription>
              当前正在修改用户[{`${editUser?.email}`}]的信息
            </SheetDescription>
          </Doll69If>
        </SheetHeader>
        <form className="grid auto-rows-min gap-6 px-4" onChange={(a) => onFormChange(a.target as any)}>
          <div className="grid gap-3">
            <Label htmlFor="user-id">ID</Label>
            <Input id="user-id" defaultValue={editUser?.id} disabled={true} name='id' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-email">Email</Label>
            <Input id="user-email" defaultValue={editUser?.email} disabled={!!editUser?.id} name='email' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-nickname">昵称</Label>
            <Input id="user-nickname" defaultValue={editUser?.nickname} name='nickname' />
          </div>
          <Doll69If display={!editUser?.id}>
            <div className="grid gap-3">
              <Label htmlFor="user-password">密码</Label>
              <Input id="user-password" defaultValue={editUser?.rawPassword} name='rawPassword' type='password' />
            </div>
          </Doll69If>
          <div className="grid gap-3">
            <Label htmlFor="user-id">状态</Label>
            <Select defaultValue={editUser?.status.toString()} disabled={!!editUser?.id} name='status'>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">可用</SelectItem>
                <SelectItem value="false">不可用</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        <SheetFooter>
          <Doll69If display={!editUser?.id}>
            <Button type="submit" variant="outline" onClick={() => add()}>立即添加</Button>
          </Doll69If>
          <Doll69If display={editUser?.id}>
            <Button type="submit" variant="outline" onClick={() => save()}>立即修改</Button>
          </Doll69If>
          <Button variant="outline" onClick={() => setEditUser(undefined)}>关闭</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </>
}

export default Users
