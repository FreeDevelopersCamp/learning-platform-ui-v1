import { ResourceProductDto } from "@/apis/supplyChain/Product/types";
import Avatar from "@/components/Avatar";
import Image from "@/components/Image";
import {
  ActionIcon,
  AvatarGroup,
  Badge,
  ColorSwatch,
  Group,
  Paper,
  PaperProps,
  Stack,
  Text,
} from "@mantine/core";
import { IconShoppingBag, IconShoppingBagPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./styles.module.css";
import Button from "@/components/Button";
import { useLookupContext } from "@/contexts/LookupContext";
interface Props extends PaperProps {
  product: ResourceProductDto;
  isLoading: boolean;
  onOpenProductModal: VoidFunction;
}
const ProductCard = ({
  product,
  isLoading,
  onOpenProductModal,
  ...rest
}: Props) => {
  const { lookups } = useLookupContext();

  const brand = lookups.brands.find(
    (b) => b.id === product?.attributes?.brandManufacturer?.brand.toString()
  )?.label;

  const manufacturer = lookups.manufacturers.find(
    (b) =>
      b.id === product?.attributes?.brandManufacturer?.manufacturer.toString()
  )?.label;
  return (
    <Paper
      withBorder
      radius="md"
      component={Link}
      to={`/retailer/products/view/${product?._id}`}
      className={classes.container}
      {...rest}
    >
      <Stack
        h={220}
        pos="relative"
        align="center"
        style={{ overflow: "hidden" }}
      >
        <Image
          pos="absolute"
          src={product.images.at(0)}
          className={classes.image}
        />
        <Image
          pos="absolute"
          src={product.images.at(1)}
          className={classes.image}
        />
      </Stack>
      <Stack p="sm" justify="space-between" flex={1}>
        <Stack gap="xs" pos="relative">
          <Group justify="space-between">
            <Badge variant="light" color="orange" size="xs" radius="sm">
              {product.category.name}
            </Badge>
            <Group gap={4} align="center">
              <Text fz={10} c="dimmed" td="line-through">
                {product.attributes.price.cost}₪
              </Text>
              <Text size="sm" c="blue" fw="bolder">
                {product.attributes.price.cost}₪
              </Text>
            </Group>
          </Group>
        </Stack>
        <Stack gap={4}>
          <Text size="sm" c="dark" fw="bold" maw="100%" truncate="end">
            {product.name}
          </Text>
          <Text c="dimmed" size="xs" maw="100%" truncate="end">
            {brand} | {manufacturer}
          </Text>
        </Stack>

        <Group justify="space-between">
          <AvatarGroup>
            {product.attributes.color.map((c) => (
              <Avatar size="sm">
                <ColorSwatch withShadow color={c.primaryHexColor} />
              </Avatar>
            ))}
          </AvatarGroup>

          <Group gap={2}>
            {product.attributes.size.slice(0, 3).map((c) => (
              <Badge variant="default" size="sm" tt="uppercase" fz={10}>
                {c.name}
              </Badge>
            ))}
          </Group>

          <ActionIcon
            variant="outline"
            color="blue"
            size="md"
            radius="xl"
            onClick={(e) => {
              e.preventDefault();
              onOpenProductModal();
            }}
          >
            <IconShoppingBagPlus size={20} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Stack>
    </Paper>
  );
};

export default ProductCard;
