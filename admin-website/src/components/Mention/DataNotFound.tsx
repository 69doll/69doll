import { lazy, Suspense } from "react";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";

const Ban = lazy(() => import('@/components/Icon/Ban'))

export default function DataNotFound () {
  return <Empty>
    <EmptyHeader>
      <EmptyMedia variant='icon'>
        <Suspense>
          <Ban />
        </Suspense>
      </EmptyMedia>
      <EmptyTitle>
        数据不存在或已被删除
      </EmptyTitle>
    </EmptyHeader>
  </Empty>
}
