import type React from "react"
import dayjs from "dayjs"
import { Doll69If, useQuery } from "shared"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useMemo, useState } from "react"
import { Skeleton } from "../ui/skeleton"
import { Button } from "../ui/button"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import TableFooter, { type TableFooterOnValueChange } from "../TableFooter"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const SUPPORT_PAGE_SIZE = [25, 50, 100]

const SUPPORT_TYPE = ['APP', 'ADMIN']

const Users: React.FC = () => {
  const [userType, setUserType] = useState(SUPPORT_TYPE[0])
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(SUPPORT_PAGE_SIZE[0])
  const url = useMemo(() => `/api/admin/user/page?type=${userType}&pageNum=${pageNum}&pageSize=${pageSize}`, [pageNum, pageSize, userType])
  const { data, isLoading, isDone, refetch } = useQuery<any>(url)
  useEffect(() => {
    refetch()
  }, [url])
  const list = useMemo<any[]>(() => {
    return data?.data?.list ?? []
  }, [data])
  const totalPageNum = useMemo(() => {
    return data?.data?.totalPage ?? 1
  }, [data])
  const onPageChange: TableFooterOnValueChange = ({ pageNum, pageSize }) => {
    setPageNum(pageNum)
    setPageSize(pageSize)
  }

  const [editUser, setEditUser] = useState<any>()
  const isOpenSheet = useMemo(() => !!editUser, [editUser])
  const { refetch: saveUser, reset } = useQuery('/api/admin/user/update', {
    method: 'PUT',
    body: {
      id: editUser?.id,
      nickname: editUser?.nickname,
    },
    fetchOnMount: false,
  })
  const save = async () => {
    await saveUser()
    setEditUser(undefined)
    reset()
    await refetch()
  }
  return <>
    <h1>Users</h1>
    <Tabs defaultValue={userType} onValueChange={(v) => setUserType(v)}>
      <TabsList>
        <TabsTrigger value={SUPPORT_TYPE[0]}>普通用户</TabsTrigger>
        <TabsTrigger value={SUPPORT_TYPE[1]}>管理员</TabsTrigger>
      </TabsList>
    </Tabs>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>昵称</TableHead>
          <TableHead>状态</TableHead>
          <TableHead>创建时间</TableHead>
          <TableHead className="w-[120px]">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <Doll69If display={isLoading}>
          {
            Array(20).map(() => <TableRow>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
            </TableRow>)
          }
        </Doll69If>
        <Doll69If display={isDone}>
          {
            list.map((item, index) => {
              return <TableRow key={index}>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.nickname}</TableCell>
                <TableCell>{item.status ? '可用' : '不可用'}</TableCell>
                <TableCell title={dayjs(item.createdAt).format('YYYY-MM-DD HH:MM:SS ZZ')}>
                  { dayjs(item.createdAt).format('YYYY-MM-DD') }
                </TableCell>
                <TableCell>
                  <Button size={'sm'} variant="outline" onClick={() => setEditUser(item)}>修改</Button>
                </TableCell>
              </TableRow>
            })
          }
        </Doll69If>
      </TableBody>
    </Table>
    <TableFooter
      pageNum={pageNum}
      totalPageNum={totalPageNum}
      pageSize={pageSize}
      pageSizes={SUPPORT_PAGE_SIZE}
      onValueChange={onPageChange}
    />
    <Sheet open={isOpenSheet}>
      <SheetContent headerClose={false}>
        <SheetHeader>
          <SheetTitle>修改用户信息</SheetTitle>
          <SheetDescription>
            当前正在修改用户[{`${editUser?.email}`}]的信息
          </SheetDescription>
        </SheetHeader>
        <div className="grid auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="user-id">ID</Label>
            <Input id="user-id" defaultValue={editUser?.id} readOnly={true} name='id' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-email">Email</Label>
            <Input id="user-email" defaultValue={editUser?.email} readOnly={true} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-nickname">昵称</Label>
            <Input id="user-nickname" defaultValue={editUser?.nickname} name='nickname' />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="user-id">状态</Label>
            <Select defaultValue={editUser?.status.toString()}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">可用</SelectItem>
                <SelectItem value="false">不可用</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" variant="outline" onClick={() => save()}>立即修改</Button>
          <Button variant="outline" onClick={() => setEditUser(undefined)}>关闭</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </>
}

export default Users
