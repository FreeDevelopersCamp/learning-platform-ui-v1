import { ResourceProductDto } from "@/apis/supplyChain/Product/types";
import {
  ActionIcon,
  Anchor,
  ComboboxData,
  Group,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconHeart, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import CartProductQuantities from "./CartProductQuantities";
import Image from "@/components/Image";
import { useForm } from "@mantine/form";
import { ResourceCartDto } from "@/apis/supplyChain/Cart/types";
import { Form } from "@/types/mantine";
import { CartProduct as CartProductType } from "@/apis/supplyChain/Cart/types";

interface Props {
  product: CartProductType;
  onRemoveProductFromCart?: (productId: string) => void;
  onFavoriteProductClick?: (productId: string) => void;
}
const CartProduct = ({
  onRemoveProductFromCart,
  onFavoriteProductClick,
  product,
}: Props) => {
  const colorOptions = product.product.attributes.color.map((c) => ({
    ...c,
    value: c.primaryColor,
    label: c.primaryColor,
  }));
  const sizeOptions = product.product.attributes.size.map((c) => ({
    ...c,
    value: c.name,
    label: c.name,
  }));

  return (
    <Paper radius="md">
      <Group justify="space-between">
        <Group align="stretch">
          <Image
            w={128}
            fit="contain"
            bg="gray.0"
            radius="md"
            src={product.product.images.at(0)}
          />
          <Stack gap={2} justify="space-around">
            <Anchor
              fw={500}
              c="gray"
              component={Link}
              to={`/retailer/products/view/${product?.product._id}`}
            >
              {product?.product.name}
            </Anchor>

            <Text fw="bold">{product.product.attributes.price.cost}$</Text>

            <Group>
              <ActionIcon c="gray" size="md" variant="default" radius="xl">
                <IconHeart size={16} />
              </ActionIcon>
              <ActionIcon c="red" size="md" variant="default" radius="xl">
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Stack>
        </Group>
        <CartProductQuantities
          quantities={product?.quantities || []}
          productColorOptions={colorOptions}
          productSizeOptions={sizeOptions}
        />
      </Group>
    </Paper>
  );
};

export default CartProduct;
