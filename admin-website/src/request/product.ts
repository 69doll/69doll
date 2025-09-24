import type { Brand } from "./brand";
import type { Category } from "./category";

export interface SPU {
  brandId: Brand["id"],
  categoryId: Category["id"],
  createdAt: string,
  extra: string,
  id: number,
  mainImage: string,
  name: string,
  seoConfig: string,
  sn: string,
  updatedAt: string,
  status: boolean,
}

export interface SKU {
  attributesConfig: string,
  code: string,
  createdAt: string,
  customizationConfig: string,
  extra: string,
  id: number,
  images: string,
  name: string,
  originalPrice: number,
  price: number,
  spuId: SPU["id"],
  updatedAt: string,
}
