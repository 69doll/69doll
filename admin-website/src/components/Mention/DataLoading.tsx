import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { Spinner } from "../ui/spinner";

export default function DataLoading () {
  return <Empty>
    <EmptyHeader>
      <EmptyMedia variant='icon'>
        <Spinner />
      </EmptyMedia>
      <EmptyTitle>
        数据加载中...
      </EmptyTitle>
    </EmptyHeader>
  </Empty>
}
