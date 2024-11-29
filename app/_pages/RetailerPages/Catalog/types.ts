export type FilterList = Partial<Record<string, boolean>>;
export interface FilterForm {
  categories?: FilterList;
  brands?: FilterList;
  manufacturers?: FilterList;
  q?: string;
  sortBy?: string;
}

export type ListFilter = "categories" | "brands" | "manufacturers";
export type TextFilter = "q" | "sortBy";
