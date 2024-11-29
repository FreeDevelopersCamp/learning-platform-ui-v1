import { Lookup, LookupContextData, LookupItem } from "./types";
import LookupContext from "./LookupContext";
import useLookupList from "@/hooks/useLookupList";

interface LookupProviderProps {}

const LookupProvider = ({
  children,
}: React.PropsWithChildren<LookupProviderProps>) => {
  const lookupQuery = useLookupList();

  const findLookupByName = (name: Lookup): LookupItem[] => {
    const items = lookupQuery.data?.find((l) => l.name === name)?.items || [];
    return items?.map((l) => ({ ...l, value: l.id.toString() }));
  };

  const days = findLookupByName("days");
  const gender = findLookupByName("gender");
  const roles = findLookupByName("roles");
  const materialType = findLookupByName("materialType");
  const manufacturers = findLookupByName("manufacturers");
  const brands = findLookupByName("brands");
  const paymentType = findLookupByName("paymentType");
  const cartStatus = findLookupByName("cartStatus");
  const deliveryType = findLookupByName("deliveryType");
  const sizeType = findLookupByName("sizeType");
  const sizeName = findLookupByName("sizeName");
  const sessionStatus = findLookupByName("sessionStatus");
  const storageOptions = findLookupByName("storageOptions");
  const warehouseStatus = findLookupByName("warehouseStatus");
  const cities = findLookupByName("cities");
  const countries = findLookupByName("countries");
  const codes = findLookupByName("codes");

  const value: LookupContextData = {
    lookups: {
      cities,
      countries,
      days,
      roles,
      gender,
      materialType,
      brands,
      manufacturers,
      paymentType,
      cartStatus,
      codes,
      deliveryType,
      sizeName,
      sizeType,
      sessionStatus,
      storageOptions,
      warehouseStatus,
    },
    isLoadingLookups: lookupQuery.isPending,
  };

  return (
    <LookupContext.Provider value={value}>{children}</LookupContext.Provider>
  );
};

export default LookupProvider;
