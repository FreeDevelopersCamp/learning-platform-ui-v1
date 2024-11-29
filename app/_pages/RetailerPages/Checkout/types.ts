import { ResourceProductDto } from "@/apis/supplyChain/Product/types";

export interface ProductQuantity {
  size: string;
  color: string;
  quantity: number;
  volume?: number;
}

export interface ProductCart {
  id: string;
  product: ResourceProductDto;
  quantities: ProductQuantity[];
}
