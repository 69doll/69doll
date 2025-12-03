import { checkRes, getDefaultHeaders, redirectSignInPage, setUrlSearchParams } from "./common";
import type { ApiReqPage, ApiResBody, ApiResBodyPage } from "@/types/api.type";
import { API_BASE_URL } from "@/constant";
import { hasAuthorization } from "@/store/authorization";
import type { ID } from "@/types/bean";
import type { SPU, SKU } from "./product";

// Based on swagger.json definitions

export interface OrderLine {
  createdAt: string;
  customizationConfig: string;
  extra: string;
  id: ID;
  product: any; // You might want to define a specific ProductData type
  quantity: number;
  skuId: SKU['id'];
  skuImage: string;
  skuName: string;
  spuId: SPU['id'];
  status: string;
  summary: any; // You might want to define OrderLineSummaryInfo
  updatedAt: string;
  userId: ID;
}

export interface Order {
  confirmAt: string;
  id: ID;
  orderLines: OrderLine[];
  payAt: string;
  shippingAddress: string;
  shippingAt: string;
  status: string;
  summary: any; // You might want to define OrderSummaryInfo
  userId: ID;
}

// #region Order List

type OrderListOptions = ApiReqPage<{
  endTime?: string;
  id?: ID;
  startTime?: string;
  status?: string;
  userId?: ID;
}>;

type OrderList = ApiResBodyPage<Order[]>;

export const getOrderListCacheKeys = (options?: Partial<OrderListOptions>) => {
  const keys = [
    'order',
    'list',
    { ...options },
  ];
  return keys;
};

export async function getOrderList(options?: Partial<OrderListOptions>) {
  if (!hasAuthorization()) redirectSignInPage(true);
  const url = new URL('/api/admin/order/page', API_BASE_URL);
  setUrlSearchParams(url, options as Record<string, string>);
  const res = await fetch(url, {
    headers: getDefaultHeaders(),
  });
  await checkRes(res);
  return await res.json() as OrderList;
}

// #endregion Order List

// #region Order Detail

type OrderDetail = ApiResBody<{ data: Order }>;

export const getOrderDetailCacheKeys = (id: ID) => {
  const keys = ['order', 'detail', { id }];
  return keys;
};

export async function getOrderDetail(id: ID) {
  if (!hasAuthorization()) redirectSignInPage(true);
  const url = new URL(`/api/admin/order/detail/${id}`, API_BASE_URL);
  const res = await fetch(url, {
    headers: getDefaultHeaders(),
  });
  await checkRes(res);
  return await res.json() as OrderDetail;
}

// #endregion Order Detail

// #region Shipping Order

interface OrderShippingParam {
  orderId: ID;
  trackingNo: string;
}

interface OrderShippingRequest {
  orderShippingParams: OrderShippingParam[];
  userId: ID;
}

export async function shippingOrder(body: OrderShippingRequest) {
  if (!hasAuthorization()) redirectSignInPage(true);
  const url = new URL('/api/admin/order/shipping', API_BASE_URL);
  const res = await fetch(url, {
    method: 'POST',
    headers: getDefaultHeaders(),
    body: JSON.stringify(body),
  });
  await checkRes(res);
  return await res.json() as ApiResBody;
}

// #endregion Shipping Order
