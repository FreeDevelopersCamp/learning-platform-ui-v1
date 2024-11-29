import { LookupItemDto } from "@/apis/core/Lookup/types";

export type Lookup =
  | "cities"
  | "countries"
  | "days"
  | "roles"
  | "gender"
  | "materialType"
  | "brands"
  | "manufacturers"
  | "paymentType"
  | "cartStatus"
  | "deliveryType"
  | "sizeType"
  | "sizeName"
  | "sessionStatus"
  | "storageOptions"
  | "warehouseStatus"
  | "codes";

export interface LookupContextData {
  lookups: Record<Lookup, LookupItem[]>;
  isLoadingLookups: boolean;
}

export interface LookupItem extends LookupItemDto {
  value: string;
}

export interface LookupProviderProps {}
