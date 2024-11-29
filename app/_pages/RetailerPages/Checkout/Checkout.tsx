import { menuGroup, menuGroupLinks } from "@/layouts/Retailer/constants";
import {
  Box,
  Divider,
  Grid,
  Group,
  Paper,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { PropsWithChildren } from "react";
import CartProducts from "./components/CartProducts";
import RetailerRouteHeader from "@/components/RetailerRouteHeader";
import Button from "@/components/Button";
import { IconClearAll } from "@tabler/icons-react";
import { useCartContext } from "@/contexts/CartContext";

interface Props {}

const Checkout = ({ children, ...rest }: PropsWithChildren<Props>) => {
  const pageIndex = 3;
  const pageReferences = menuGroupLinks[pageIndex];

  const breadcrumbsItems = [
    menuGroup,
    { ...menuGroupLinks[pageIndex], isActive: true },
  ];

  const { cart, handleClearCart } = useCartContext();

  return (
    <Box>
      <Space h="md" />
      <RetailerRouteHeader
        breadcrumbsItems={breadcrumbsItems}
        routePreferences={pageReferences}
      />

      <Space h="md" />

      <Space h="md" />

      <Grid>
        <Grid.Col span={8}>
          <Paper withBorder radius="md" p="md">
            <Stack>
              <Group justify="space-between">
                <Text fw="bold">Products</Text>
                <Button
                  rightSection={<IconClearAll size={16} />}
                  variant="subtle"
                  color="red"
                  size="compact-xs"
                  fz="xs"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </Button>
              </Group>

              <Divider />

              <CartProducts products={cart?.products} />

              <Group justify="space-between">
                <Text fz="xl">Total</Text>
                <Text fz={24} fw="bold" c="blue">
                  {cart?.cost}$
                </Text>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper withBorder radius="md" p="md"></Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Checkout;
