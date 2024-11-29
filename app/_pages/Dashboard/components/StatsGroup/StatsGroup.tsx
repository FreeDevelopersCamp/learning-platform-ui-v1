import { Grid } from "@mantine/core";
import {
  IconUsersGroup,
  IconBuilding,
  IconInvoice,
  IconPackage,
  IconHomePlus,
  IconBuildingStore,
  IconCategory,
  IconAB2,
  IconHomeBolt,
} from "@tabler/icons-react";
import Stat from "../Stat";
import useUsersList from "@/hooks/useUsersList";
import useOrdersList from "@/apis/supplyChain/Order/hooks/useOrdersList";
import useCompaniesList from "@/apis/supplyChain/Company/hooks/useCompaniesList";
import useProductsList from "@/hooks/useProductsList";
import useSuppliersList from "@/apis/supplyChain/Supplier/hooks/useSuppliersList";
import useRetailersList from "@/apis/supplyChain/Retailer/hooks/useRetailersList";
import useCategoriesList from "@/hooks/useCategoriesList";
import useWarehousesList from "@/apis/supplyChain/Warehouse/hooks/useWarehousesList";
import useStocksList from "@/hooks/useStocksList";

const StatsGroup = () => {
  const { data: users, isFetching: isLoadingUsers } = useUsersList();
  const { data: stocks, isFetching: isLoadingStocks } = useStocksList();
  const { data: companies, isFetching: isLoadingCompanies } =
    useCompaniesList();
  const { data: orders, isFetching: isLoadingOrders } = useOrdersList();
  const { data: products, isFetching: isLoadingProducts } = useProductsList();
  const { data: suplliers, isFetching: isLoadingSuppliers } =
    useSuppliersList();
  const { data: retailers, isFetching: isLoadingRetailers } =
    useRetailersList();
  const { data: categories, isFetching: isLoadingCategories } =
    useCategoriesList();
  const { data: warehouses, isFetching: isLoadingWarehouses } =
    useWarehousesList();

  const isLoading = isLoadingUsers;
  isLoadingCompanies ||
    isLoadingOrders ||
    isLoadingProducts ||
    isLoadingSuppliers ||
    isLoadingRetailers ||
    isLoadingCategories ||
    isLoadingWarehouses;

  const stats = [
    {
      span: 3,
      icon: <IconUsersGroup />,
      stat: users?.length || 0,
      label: "Users",
      color: "blue",
      isLoading: isLoadingUsers,
    },
    {
      span: 3,
      icon: <IconBuilding />,
      stat: companies?.length || 0,
      label: "Companies",
      color: "orange",
      isLoading: isLoadingCompanies,
    },
    {
      span: 3,
      icon: <IconInvoice />,
      stat: orders?.length || 0,
      label: "Orders",
      color: "green",
      isLoading: isLoadingOrders,
    },
    {
      span: 3,
      icon: <IconPackage />,
      stat: products?.length || 0,
      label: "Products",
      color: "yellow",
      isLoading: isLoadingProducts,
    },
    {
      span: 2,
      icon: <IconHomePlus />,
      stat: suplliers?.length || 0,
      label: "Suppliers",
      color: "grape",
      isLoading: isLoadingSuppliers,
    },
    {
      span: 2,
      icon: <IconBuildingStore />,
      stat: retailers?.length || 0,
      label: "Retailers",
      color: "indigo",
      isLoading: isLoadingRetailers,
    },
    {
      span: 2,
      icon: <IconCategory />,
      stat: categories?.length || 0,
      label: "Categories",
      color: "dark",
      isLoading: isLoadingCategories,
    },

    {
      span: 2,
      icon: <IconAB2 />,
      stat: stocks?.length || 0,
      label: "Stocks",
      color: "violet",
      isLoading: isLoadingStocks,
    },
    {
      span: 2,
      icon: <IconHomeBolt />,
      stat: warehouses?.length || 0,
      label: "Warehouses",
      color: "teal",
      isLoading: isLoadingWarehouses,
    },
  ];

  return (
    <Grid grow>
      {stats.map((stat, index) => (
        <Grid.Col key={index} span={stat.span}>
          <Stat
            icon={stat.icon}
            stat={stat.stat}
            label={stat.label}
            color={stat.color}
            isLoading={stat.isLoading}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default StatsGroup;
