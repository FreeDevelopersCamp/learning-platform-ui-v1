import Title from "@/components/Title";
import { useLookupContext } from "@/contexts/LookupContext";
import useCategoriesList from "@/hooks/useCategoriesList";
import { Accordion, Checkbox, Divider, Group, Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import { useForm } from "@mantine/form";
import { FilterForm, ListFilter, TextFilter } from "../../types";
import { Form } from "@/types/mantine";
import useSearch from "@/hooks/useSearch";
import { filters } from "../../constants";
import { getSelectedItems } from "../../utils";

interface Props {
  form: Form<FilterForm>;
}
const Filters = ({ form }: Props) => {
  const { lookups } = useLookupContext();
  const [openedFilters, setOpenedFilters] = useState<string[]>([
    "category",
    "brand",
    "manufacturer",
  ]);

  const { data: categories, isFetching: isLoadingCategories } =
    useCategoriesList();

  return (
    <Accordion
      radius="md"
      variant="separated"
      multiple={true}
      value={openedFilters}
      onChange={setOpenedFilters}
    >
      <FilterSection
        isOpened={openedFilters.includes("category")}
        title="Category"
        value="category"
      >
        <Stack gap="xs">
          {categories?.map((category, index) => (
            <Checkbox
              checked={form.values?.categories?.[`${category._id}`]}
              label={category.name}
              radius="xl"
              {...form.getInputProps(`categories.${category._id}`)}
            />
          ))}
        </Stack>
      </FilterSection>

      <FilterSection
        isOpened={openedFilters.includes("brand")}
        title="Brand"
        value="brand"
      >
        <Stack gap="xs">
          {lookups?.brands?.map((brand, index) => (
            <Checkbox
              checked={form.values?.brands?.[`${brand.id}`]}
              label={brand.label}
              radius="xl"
              {...form.getInputProps(`brands.${brand.id}`)}
            />
          ))}
        </Stack>
      </FilterSection>

      <FilterSection
        isOpened={openedFilters.includes("manufacturer")}
        title="Manufacturers"
        value="manufacturer"
      >
        <Stack gap="xs">
          {lookups?.manufacturers?.map((manufacturer, index) => (
            <Checkbox
              checked={form.values?.manufacturers?.[`${manufacturer.id}`]}
              label={manufacturer.label}
              radius="xl"
              {...form.getInputProps(`manufacturers.${manufacturer.id}`)}
            />
          ))}
        </Stack>
      </FilterSection>
    </Accordion>
  );
};

export default Filters;
