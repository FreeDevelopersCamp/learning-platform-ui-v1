import {
  Alert,
  ComboboxData,
  ComboboxItem,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";
import ProductQunatity from "./ProductQuantity";
import Button from "@/components/Button";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { ColorDto } from "@/apis/supplyChain/Product/types";
import { IconInfoCircleFilled, IconShoppingBagPlus } from "@tabler/icons-react";
import classes from "./styles.module.css";
import { ButtonProps } from "@/components/Button/Button";
import { ProductQuantity } from "@/pages/RetailerPages/Checkout/types";
interface Props {
  productSizeOptions: ComboboxData;
  productColorOptions: Array<ColorDto & ComboboxItem>;
  quantities?: ProductQuantity[];
  onUpdateProductQuantity: (productQuantity: ProductQuantity) => void;
  buttonProps?: ButtonProps;
}
const ProductQuantities = ({
  productSizeOptions,
  productColorOptions,
  quantities = [],
  onUpdateProductQuantity,
  buttonProps,
}: Props) => {
  const schema = z.object({
    color: z
      .string()
      .min(productColorOptions.length > 0 ? 1 : 0, "You must select a color"),
    size: z
      .string()
      .min(productSizeOptions.length > 0 ? 1 : 0, "You must select a size"),
    quantity: z.number().min(1, "You must select 1 or more items"),
  });
  const form = useForm<ProductQuantity>({
    initialValues: {
      color: "",
      size: "",
      quantity: 1,
    },
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  });

  const handleUpdateProductQuantities = form.onSubmit((values) => {
    onUpdateProductQuantity(values);
  });

  return (
    <Stack gap={4}>
      {quantities.map((quantity) => (
        <ProductQunatity
          quantityProps={{
            size: {
              value: quantity.size,
            },

            color: {
              value: quantity.color,
            },
            quantity: {
              value: quantity.quantity,
            },
          }}
          productSizeOptions={productSizeOptions}
          productColorOptions={productColorOptions}
        />
      ))}

      {!!quantities.length && <Divider />}
      {!!(form.errors.size || form.errors.color || form.errors.quantity) && (
        <Group gap={6} py="xs">
          <IconInfoCircleFilled color="red" size={16} />
          <Text fw="bold" c="red" size="xs">
            {form.errors.size || form.errors.color || form.errors.quantity}
          </Text>
        </Group>
      )}
      <ProductQunatity
        inNewMode
        quantityProps={{
          size: {
            ...form.getInputProps("size"),
            error: undefined,
          },

          color: {
            ...form.getInputProps("color"),
            error: undefined,
          },
          quantity: {
            ...form.getInputProps("quantity"),
            error: undefined,
          },
        }}
        productSizeOptions={productSizeOptions}
        productColorOptions={productColorOptions}
      />

      <Group grow>
        <Button
          variant="gradient"
          size="md"
          radius="md"
          onClick={() => handleUpdateProductQuantities()}
          className={classes.addQuantityButton}
          rightSection={<IconShoppingBagPlus size={16} />}
          disabled={!form.isValid() || !form.isDirty() || !form.isTouched()}
          {...buttonProps}
        >
          Add Quantity
        </Button>
      </Group>
    </Stack>
  );
};

export default ProductQuantities;
