import { ComboboxData, Divider, Stack } from "@mantine/core";
import CartProductQuantity from "./CartProductQuantity";
import { ProductQuantity } from "@/apis/supplyChain/Cart/types";

interface Props {
  productSizeOptions: ComboboxData;
  productColorOptions: ComboboxData;
  quantities?: ProductQuantity[] | undefined;
}

const CartProductQuantities = ({
  productSizeOptions,
  productColorOptions,
  quantities,
}: Props) => {
  return (
    <Stack gap={4}>
      {quantities?.map((qty) => (
        <CartProductQuantity
          quantityProps={{
            size: { value: qty.size },

            color: { value: qty.size },

            quantity: { value: qty.quantity },
          }}
          productSizeOptions={productSizeOptions}
          productColorOptions={productColorOptions}
        />
      ))}
      <Divider />
    </Stack>
  );
};

export default CartProductQuantities;
