import RetailerBreadcrumbs from "@/components/RetailerBreadcrumbs";
import useProductsList from "@/hooks/useProductsList";
import { menuGroup, menuGroupLinks } from "@/layouts/Retailer/constants";
import {
  Badge,
  Box,
  Divider,
  Grid,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Space,
} from "@mantine/core";
import { PropsWithChildren, useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import useSearch from "@/hooks/useSearch";
import { ResourceProductDto } from "@/apis/supplyChain/Product/types";
import SearchBox from "@/layouts/Retailer/components/SearchBox";
import Filters from "./components/Filters";
import { useForm } from "@mantine/form";
import { FilterForm, FilterList, ListFilter, TextFilter } from "./types";
import { filters } from "./constants";
import { getSelectedItems } from "./utils";
import useFilteredData from "@/components/Grid/hooks/useFilteredData";
import { IconSortAscending } from "@tabler/icons-react";

interface Props {}
const Catalog = ({}: PropsWithChildren<Props>) => {
  const breadcrumbsItems = [menuGroup, { ...menuGroupLinks[1] }];

  const { data: products, isFetching: isLoadingProducts } = useProductsList();

  const { searchParams, removeParams, setParams } = useSearch();

  const isProductModalOpened = searchParams.get("isProductModalOpened");
  const selectedProductId = searchParams.get("selectedProductId");

  const handleCloseModal = () => {
    removeParams(["isProductModalOpened", "selectedProductId"]);
  };

  const handleOpenProductModal = (product: ResourceProductDto) => {
    setSelectedProduct(product);
    setParams([
      { key: "isProductModalOpened", value: "true" },
      { key: "selectedProductId", value: product._id },
    ]);
  };

  const [selectedProduct, setSelectedProduct] = useState<
    ResourceProductDto | undefined
  >(undefined);

  const getFormattedFilterList = (key: ListFilter) =>
    JSON.parse(decodeURIComponent(searchParams.get(key) || "[]")) as string[];

  const getFormattedFilterText = (key: TextFilter) =>
    decodeURIComponent(searchParams.get(key) || "");

  const convertToMap = (items: string[]) =>
    items.reduce(
      (acc, curr) => {
        acc[curr] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );

  const getInitialValues = (filters: ListFilter[]) =>
    filters.reduce(
      (acc, curr) => {
        acc[curr] = convertToMap(getFormattedFilterList(curr));
        return acc;
      },
      {} as Record<ListFilter, Record<string, boolean>>
    );

  const form = useForm<FilterForm>({
    initialValues: {
      ...getInitialValues(filters),
      q: getFormattedFilterText("q"),
      sortBy: getFormattedFilterText("sortBy"),
    },
  });

  const isThereAnyFilter = filters.some(
    (key) => !!getSelectedItems(form.values?.[key] || {}).length
  );

  const createListFilterQueryParam = (key: ListFilter) => ({
    key,
    value: encodeURIComponent(
      JSON.stringify(getSelectedItems(form.values?.[key] || {}))
    ),
  });

  const createTextFilterQueryParam = (key: TextFilter) => ({
    key,
    value: encodeURIComponent(form.values?.[key] || ""),
  });

  const getFilteredProducts = (products: ResourceProductDto[]) => {
    return products.filter(
      (product) =>
        !!form.values.categories?.[product.category._id] ||
        !!form.values.brands?.[product.attributes.brandManufacturer.brand] ||
        !!form.values.manufacturers?.[
          product.attributes.brandManufacturer.manufacturer
        ]
    );
  };

  const filteredProducts = isThereAnyFilter
    ? getFilteredProducts(products || [])
    : products || [];

  const filteredData = useFilteredData(filteredProducts, form.values?.q || "");

  useEffect(() => {
    setParams([
      ...filters.map(createListFilterQueryParam),
      createTextFilterQueryParam("q"),
      createTextFilterQueryParam("sortBy"),
    ]);
  }, [form.values]);
  return (
    <Box>
      <ProductModal
        opened={!!isProductModalOpened}
        selectedProduct={selectedProduct}
        selectedProductId={selectedProductId!}
        onClose={handleCloseModal}
      />

      <RetailerBreadcrumbs items={breadcrumbsItems} />

      <Space h="sm" />
      <Divider />
      <Space h="sm" />

      <Grid>
        {/* Filters */}
        <Grid.Col span={3}>
          <Filters form={form} />
        </Grid.Col>

        {/* Products */}
        <Grid.Col span={9}>
          <Paper>
            <Paper withBorder radius="md">
              <Group gap="xs">
                <SearchBox
                  flex={1}
                  radius="md"
                  variant="unstyled"
                  visibleFrom="md"
                  rightSectionWidth={140}
                  {...form.getInputProps("q")}
                />
                <Divider orientation="vertical" />
                <Select
                  radius="md"
                  size="md"
                  maw={164}
                  variant="unstyled"
                  defaultValue="default"
                  leftSection={<IconSortAscending color="gray" />}
                  data={[
                    { value: "default", label: "Sort By" },
                    { value: "asc", label: "Price Asc" },
                    { value: "desc", label: "Price Desc" },
                  ]}
                  {...form.getInputProps("sortBy")}
                />
              </Group>
            </Paper>
            <Space h="md" />
            <SimpleGrid cols={4}>
              {filteredData?.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isLoading={isLoadingProducts}
                  onOpenProductModal={() => handleOpenProductModal(product)}
                />
              ))}
            </SimpleGrid>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Catalog;
