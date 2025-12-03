import type React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import tableCss from "../../styles/table.module.scss";
import TablePage from "@/components/Page/TablePage";
import { getOrderList, getOrderListCacheKeys, type Order } from "@/request/order";
import { useTablePageData } from "@/components/Page/TablePage.hook";
import MappingTable, { type MappingTableOptions } from "@/components/Table/MappingTable";
import PageName from "@/components/Page/PageName";
import TableDateCell from "@/components/Table/TableDateCell";
import { Button } from "@/components/ui/button";

const SUPPORT_PAGE_SIZES = [25, 50, 100];

const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { pageNum, pageSize, useFooterData } = useTablePageData({ sizes: SUPPORT_PAGE_SIZES });

  const { data, isFetching, refetch: refetchList } = useQuery({
    queryKey: getOrderListCacheKeys({ pageSize, pageNum }),
    queryFn: () => getOrderList({ pageSize, pageNum }),
  });

  const { list, footerProps } = useFooterData(data);

  const tableOptions: MappingTableOptions<Order> = [
    {
      name: '订单ID',
      index: 'id',
    },
    {
      name: '用户ID',
      index: 'userId',
    },
    {
      name: '订单状态',
      index: 'status',
    },
    {
      name: '总金额',
      index: 'summary',
      render(value) {
        // Assuming value is { totalAmount: number }. Dividing by 100 if it's in cents.
        return value?.totalAmount ? (value.totalAmount / 100).toFixed(2) : 'N/A';
      },
    },
    {
      name: '支付时间',
      index: 'payAt',
      className: tableCss.date,
      render(value) {
        return value ? <TableDateCell date={value} /> : '-';
      },
    },
    {
      name: '发货时间',
      index: 'shippingAt',
      className: tableCss.date,
      render(value) {
        return value ? <TableDateCell date={value} /> : '-';
      },
    },
    {
      name: '操作',
      index: 'id',
      className: tableCss.actions,
      render(id) {
        return (
          <>
            <Button size='sm' variant="outline" onClick={() => navigate(`/orders/${id}`)}>详情</Button>
          </>
        );
      },
    },
  ];

  return (
    <TablePage
      label={<PageName name='订单管理' isLoading={isFetching} onRefresh={refetchList} />}
      {...footerProps}
    >
      <MappingTable
        options={tableOptions}
        sourceData={list}
        isLoading={isFetching}
        pageSize={pageSize}
      />
    </TablePage>
  );
};

export default OrdersPage;
