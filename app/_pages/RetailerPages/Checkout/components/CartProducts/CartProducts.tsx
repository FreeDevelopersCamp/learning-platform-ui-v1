import { Divider, Stack } from "@mantine/core";
import { CartProduct as CartProductType } from "@/apis/supplyChain/Cart/types";
import CartProduct from "./CartProduct";
interface Props {
  products: CartProductType[] | undefined;
}
const CartProducts = ({ products }: Props) => {
  return (
    <Stack>
      {products?.map((item, index) => (
        <>
          <CartProduct product={item} />
          <Divider />
        </>
      ))}
    </Stack>
  );
};

export default CartProducts;
