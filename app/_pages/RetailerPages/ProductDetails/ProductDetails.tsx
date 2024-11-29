import {
  Accordion,
  ActionIcon,
  Badge,
  Box,
  Divider,
  Grid,
  Group,
  Paper,
  Space,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { PropsWithChildren, useState } from "react";
import { IconHeart, IconPackages, IconTag } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useLookupContext } from "@/contexts/LookupContext";
import { Embla } from "@mantine/carousel";
import { menuGroup, menuGroupLinks } from "@/layouts/Retailer/constants";
import { useCartContext } from "@/contexts/CartContext";
import ProductQuantities from "./components/ProductQuantities";
import RetailerRouteHeader from "@/components/RetailerRouteHeader";
import Title from "@/components/Title";
import useGetProduct from "@/hooks/useGetProduct";
import Gallery from "./components/Gallery";
import { ProductQuantity } from "../Checkout/types";

interface Props {}
const ProductDetails = ({}: PropsWithChildren<Props>) => {
  const pageIndex = 4;

  const queryClient = useQueryClient();

  const { productId } = useParams();

  const { data: product, isFetching } = useGetProduct({
    id: productId!,
    config: {
      enabled: !!productId,
    },
  });

  const breadcrumbsItems = [
    menuGroup,
    { ...menuGroupLinks[pageIndex] },
    {
      label: {
        en: product?.name!,
      },
      href: "/retailer/products/view/" + productId,
      Icon: IconPackages,
      description: {
        en: "",
      },
      isActive: true,
    },
  ];

  const { lookups } = useLookupContext();

  const { cart, handleUpdateCart } = useCartContext();

  const cartProduct = cart?.products?.find((p) => p.product._id === productId);

  const [embla, setEmbla] = useState<Embla | undefined>(undefined);

  const handleScroll = (index: number) => {
    embla?.scrollTo(index);
    setCurrentSlide(index);
  };

  const [currentSlide, setCurrentSlide] = useState(0);

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
      id: productId!,
      product: product!,
      quantities: [...(cartProduct?.quantities || []), productQuantity],
    });

  return (
    <Box>
      <Space h="md" />

      <RetailerRouteHeader
        breadcrumbsItems={breadcrumbsItems}
        onRefresh={() => {
          queryClient.invalidateQueries({
            queryKey: ["products", "get", product?._id],
          });
        }}
      />

      <Space h="md" />
      <Space h="md" />

      <Grid justify="center">
        {/* Images */}
        <Grid.Col span={4}>
          <Gallery
            images={product?.images?.reverse()}
            onScrollTo={handleScroll}
            currentSlide={currentSlide}
            isLoading={isFetching}
            carouselProps={{
              getEmblaApi: (embla) => setEmbla(embla),
            }}
            showSmallImages
          />
          <Space h="md" />
          <Group p={0} align="center" justify="space-between">
            <Group gap="xs">
              <Text size="xs" c="dimmed">
                Product Ref
              </Text>
              <Text c="dark" size="xs">
                #{productId}
              </Text>
            </Group>
            <Group align="center" gap="xs">
              <Badge
                rightSection={<IconTag size={16} />}
                variant="dot"
                component={Link}
                style={{ cursor: "pointer" }}
                to={`/retailer/categories/view/${product?.category._id}`}
              >
                {product?.category.name}
              </Badge>
              <ActionIcon
                variant="light"
                radius="xl"
                loading={isFetching}
                color="gray"
              >
                <IconHeart style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            </Group>
          </Group>
        </Grid.Col>

        {/* Details */}
        <Grid.Col span={5}>
          <Paper radius="md">
            <Group justify="space-between" align="start">
              <Stack p={0}>
                <Group justify="space-between">
                  <Title order={3}>{product?.name}</Title>
                  <Paper>
                    <Text variant="gradient" size="xl" fw="bolder">
                      {product?.attributes.price?.cost}₪
                    </Text>
                  </Paper>
                </Group>
                <Text c="dimmed" size="xs" maw="70%">
                  {product?.description}
                </Text>

                <Text>
                  {
                    lookups.brands.find(
                      (b) =>
                        b.id ===
                        product?.attributes.brandManufacturer?.brand.toString()
                    )?.label
                  }
                  {" | "}
                  {
                    lookups.manufacturers.find(
                      (b) =>
                        b.id ===
                        product?.attributes.brandManufacturer?.manufacturer.toString()
                    )?.label
                  }
                </Text>
              </Stack>
            </Group>
            <Space h="xl" />

            {/* <Divider /> */}
            <Space h="xl" />
            <ProductQuantities
              quantities={cartProduct?.quantities}
              productSizeOptions={sizeOptions || []}
              productColorOptions={colorOptions || []}
              onUpdateProductQuantity={handleUpdateProductQuantities}
            />
            <Space h="md" />

            <Space h="xl" />
            <Text p={0} size="sm">
              More Details
            </Text>
            {/* <Divider /> */}
            <Space h="xl" />
            <Accordion
              p={0}
              variant="separated"
              radius="md"
              defaultValue="colors"
            >
              <Accordion.Item value="colors">
                <Accordion.Control>
                  <Group align="center" justify="space-between">
                    <Title order={6}>Colors</Title>
                    <Badge mx="xs" size="xs">
                      {product?.attributes.color?.length}
                    </Badge>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap="xs">
                    {product?.attributes.color?.map((color) => (
                      <Paper withBorder p="md" key={color.primaryColor}>
                        <Group gap="xs" justify="space-between">
                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Primary Color
                            </Text>
                            <Text size="sm">{color?.primaryColor}</Text>
                          </Stack>

                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Secondary Color
                            </Text>
                            <Text size="sm">{color?.secondaryColor}</Text>
                          </Stack>

                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Pattern
                            </Text>
                            <Text size="sm">{color?.pattern}</Text>
                          </Stack>
                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Finish
                            </Text>
                            <Text size="sm">{color?.finish}</Text>
                          </Stack>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="sizes">
                <Accordion.Control>
                  <Group align="center" justify="space-between">
                    <Title order={6}>Sizes</Title>
                    <Badge mx="xs" size="xs">
                      {product?.attributes.size?.length}
                    </Badge>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap="xs">
                    {product?.attributes.size?.map((size) => (
                      <Paper withBorder p="md" key={size.name}>
                        <Group gap="xs" justify="space-between">
                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Name
                            </Text>
                            <Text size="sm">{size?.name}</Text>
                          </Stack>
                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Height
                            </Text>
                            <Text size="sm">{size?.height}</Text>
                          </Stack>
                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Length
                            </Text>
                            <Text size="sm">{size?.length}</Text>
                          </Stack>
                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Width
                            </Text>
                            <Text size="sm">{size?.width}</Text>
                          </Stack>

                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Weight
                            </Text>
                            <Text size="sm">{size?.weight}</Text>
                          </Stack>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="features">
                <Accordion.Control>
                  <Group align="center" justify="space-between">
                    <Title order={6}>Features</Title>
                    <Badge mx="xs" size="xs">
                      {product?.attributes.features?.length}
                    </Badge>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap="xs">
                    {product?.attributes.features?.map((feature) => (
                      <Paper withBorder p="md" key={feature.compatibility}>
                        <Group gap="xs" justify="space-between">
                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Compatibility
                            </Text>
                            <Text size="sm">{feature?.compatibility}</Text>
                          </Stack>

                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Included Accessories
                            </Text>
                            <Text size="sm">
                              {feature?.includedAccessories}
                            </Text>
                          </Stack>

                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Special Features
                            </Text>
                            <Text size="sm">{feature?.specialFeatures}</Text>
                          </Stack>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="materials">
                <Accordion.Control>
                  <Group align="center" justify="space-between">
                    <Title order={6}>Materials</Title>
                    <Badge mx="xs" size="xs">
                      {product?.attributes.material?.length}
                    </Badge>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap="xs">
                    {product?.attributes.material?.map((material) => (
                      <Paper withBorder p="md" key={material.grade}>
                        <Group gap="xs" justify="space-between">
                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Type
                            </Text>
                            <Text size="sm">
                              {
                                lookups.materialType.find(
                                  (m) => m.id === material?.type.toString()
                                )?.label
                              }
                            </Text>
                          </Stack>

                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Grade
                            </Text>
                            <Text size="sm">{material?.grade}</Text>
                          </Stack>

                          <Stack gap={2}>
                            <Text size="xs" c="dimmed">
                              Texture
                            </Text>
                            <Text size="sm">{material?.texture}</Text>
                          </Stack>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
