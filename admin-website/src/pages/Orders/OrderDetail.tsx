import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderDetail, getOrderDetailCacheKeys, type OrderLine } from '@/request/order';
import Page from '@/components/Page/Page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import MappingTable, { type MappingTableOptions } from '@/components/Table/MappingTable';
import ImageActions from '@/components/Image/ImageActions';
import TableDateCell from '@/components/Table/TableDateCell';
import { Doll69If } from 'shared';

const OrderDescriptionItem = ({ label, value }: { label: string, value: React.ReactNode }) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span>{value || '-'}</span>
  </div>
);

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: res, isLoading, isFetched } = useQuery({
    queryKey: getOrderDetailCacheKeys(Number(id!)),
    queryFn: () => getOrderDetail(Number(id!)),
    enabled: !!id,
  });

  const order = res?.data;
  const isNotFound = isFetched && !order;

  const orderLinesTableOptions: MappingTableOptions<OrderLine> = [
    {
      name: '商品图片',
      index: 'skuImage',
      render: (value) => <ImageActions src={value} className="size-24" />
    },
    {
      name: '商品名称',
      index: 'skuName',
    },
    {
      name: '数量',
      index: 'quantity',
    },
    {
      name: '单价',
      index: 'summary',
      render: (value) => (value?.totalAmount / 100).toFixed(2)
    },
  ];

  return (
    <Page
      label={isLoading ? <Skeleton className="h-8 w-32" /> : `订单详情 #${id}`}
      header={
        <Button variant="outline" size={'sm'} onClick={() => navigate('/orders')}>返回列表</Button>
      }
    >
      <Doll69If display={isNotFound}>
        <div className="text-center text-red-500 py-10">订单不存在或已被删除</div>
      </Doll69If>
      <Doll69If display={!isNotFound}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>订单摘要</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <OrderDescriptionItem label="订单号" value={order?.id} />
                <OrderDescriptionItem label="订单状态" value={order?.status} />
                <OrderDescriptionItem label="支付时间" value={order?.payAt ? <TableDateCell date={order.payAt} /> : '-'} />
                <OrderDescriptionItem label="发货时间" value={order?.shippingAt ? <TableDateCell date={order.shippingAt} /> : '-'} />
                <OrderDescriptionItem label="确认收货时间" value={order?.confirmAt ? <TableDateCell date={order.confirmAt} /> : '-'} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>订单条目</CardTitle>
              </CardHeader>
              <CardContent>
                <MappingTable options={orderLinesTableOptions} sourceData={order?.orderLines ?? []} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>客户与配送</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <OrderDescriptionItem label="用户ID" value={order?.userId} />
                <CardDescription>收货地址</CardDescription>
                <p className='text-sm'>{order?.shippingAddress}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>金额汇总</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <OrderDescriptionItem label="商品总数" value={`${order?.summary?.totalItems} 件`} />
                <OrderDescriptionItem label="订单总额" value={`¥ ${(order?.summary?.totalAmount / 100).toFixed(2)}`} />
              </CardContent>
            </Card>
          </div>
        </div>
      </Doll69If>
    </Page>
  )
}
