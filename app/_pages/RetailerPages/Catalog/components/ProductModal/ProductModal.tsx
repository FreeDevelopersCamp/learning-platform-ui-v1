import { ResourceProductDto } from "@/apis/supplyChain/Product/types";
import Avatar from "@/components/Avatar";
import Image from "@/components/Image";
import {
  ActionIcon,
  AvatarGroup,
  Badge,
  ColorSwatch,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  ModalRootProps,
  Paper,
  ScrollArea,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCheck,
  IconCircleCheckFilled,
  IconMaximize,
  IconShoppingBag,
  IconShoppingBagPlus,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { useLookupContext } from "@/contexts/LookupContext";
import Gallery from "@/pages/Products/ProductDetails/components/Gallery";
import { useState } from "react";
import { Embla } from "@mantine/carousel";
import Title from "@/components/Title";
import ProductQuantities from "@/pages/RetailerPages/ProductDetails/components/ProductQuantities";
import { useCartContext } from "@/contexts/CartContext";
import LinkButton from "@/components/LinkButton";
import useGetProduct from "@/hooks/useGetProduct";
import { ProductQuantity } from "@/pages/RetailerPages/Checkout/types";

interface Props extends ModalRootProps {
  selectedProduct?: ResourceProductDto;
  selectedProductId: string;
}
const ProductModal = ({
  selectedProduct,
  selectedProductId,
  ...rest
}: Props) => {
  const { data: product, isFetching: isLoadingProduct } = useGetProduct({
    id: selectedProductId,
  });

  const { lookups } = useLookupContext();

  const brand = lookups.brands.find(
    (b) => b.id === product?.attributes?.brandManufacturer?.brand.toString()
  )?.label;

  const manufacturer = lookups.manufacturers.find(
    (b) =>
      b.id === product?.attributes?.brandManufacturer?.manufacturer.toString()
  )?.label;

  const [embla, setEmbla] = useState<Embla | undefined>(undefined);

  const handleScroll = (index: number) => {
    embla?.scrollTo(index);
    setCurrentSlide(index);
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  const { cart, handleUpdateCart } = useCartContext();

  const cartProduct = cart?.products?.find(
    (p) => p.product._id === product?._id
  );

  const colorOptions = product?.attributes.color.map((c) => ({
    ...c,
    value: c.primaryColor,
    label: c.primaryColor.toUpperCase(),
  }));
  const sizeOptions = product?.attributes.size.map((c) => ({
    ...c,
    value: c.name,
    label: c.name.toUpperCase(),
  }));

  const handleUpdateProductQuantities = (productQuantity: ProductQuantity) =>
    handleUpdateCart({
      id: product?._id!,
      product: product!,
      quantities: [...(cartProduct?.quantities || []), productQuantity],
    });

  const isLoading = isLoadingProduct;
  return (
    <Modal.Root
      centered
      size="xl"
      removeScrollProps={{ allowPinchZoom: true }}
      scrollAreaComponent={ScrollArea.Autosize}
      {...rest}
    >
      <Modal.Overlay />
      <Modal.Content>
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Modal.Body>
          <Grid>
            <Grid.Col span={6}>
              <Gallery
                images={product?.images?.reverse()}
                onScrollTo={handleScroll}
                currentSlide={currentSlide}
                isLoading={isLoading}
                carouselProps={{
                  getEmblaApi: (embla) => setEmbla(embla),
                }}
                radius="xs"
                pb={undefined}
                withFullScreenButton={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Stack h="100%" justify="space-between">
                <Stack justify="space-between" flex={1}>
                  <Stack>
                    <Group justify="space-between">
                      <Group>
                        <Title order={2} c="blue">
                          {product?.attributes.price?.cost}$
                        </Title>
                        <Text fz="xs" c="dimmed" td="line-through">
                          {product?.attributes?.price?.cost}₪
                        </Text>
                      </Group>
                      <Group>
                        <LinkButton
                          variant="subtle"
                          color="dark"
                          size="compact-sm"
                          fz="xs"
                          to={`/retailer/products/view/${product?._id}`}
                          leftSection={<IconMaximize size={14} />}
                        >
                          View full details
                        </LinkButton>
                        <Modal.CloseButton />
                      </Group>
                    </Group>

                    <Title order={3}>{product?.name}</Title>

                    <Text c="dimmed">
                      {brand} | {manufacturer}
                    </Text>

                    <Text c="dimmed" size="xs">
                      {product?.description}
                    </Text>
                    <Group gap={6}>
                      <IconCircleCheckFilled size={16} color="green" />
                      <Text size="sm" c="green.9">
                        In stock and ready to ship
                      </Text>
                    </Group>
                  </Stack>

                  <ProductQuantities
                    quantities={cartProduct?.quantities}
                    productSizeOptions={sizeOptions || []}
                    productColorOptions={colorOptions || []}
                    onUpdateProductQuantity={handleUpdateProductQuantities}
                  />
                </Stack>
              </Stack>
            </Grid.Col>
          </Grid>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ProductModal;
