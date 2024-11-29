import {
  Badge,
  Box,
  Divider,
  Grid,
  Group,
  Paper,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { AreaChart, BarChart, RadarChart } from "@mantine/charts";

import { PropsWithChildren } from "react";
import Header from "./components/Header";
import StatsGroup from "./components/StatsGroup";
import {
  fakeAreaChartData,
  fakeBarChartData,
  fakeRadarChartData,
  lastFiveOrders,
} from "./constant";
import dayjs from "dayjs";
import useUsersList from "@/hooks/useUsersList";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import useOrdersList from "@/apis/supplyChain/Order/hooks/useOrdersList";

interface Props {}
const Dashboard = ({}: PropsWithChildren<Props>) => {
  const { data: users } = useUsersList();

  const { data: orders } = useOrdersList();
  return (
    <Box>
      <Header />

      <Space h="md" />

      <StatsGroup />
      <Space h="md" />

      <Grid>
        <Grid.Col span={8}>
          <Paper p="lg" radius="md">
            <AreaChart
              h={310}
              data={fakeAreaChartData}
              dataKey="date"
              withGradient
              withLegend
              connectNulls
              series={[
                { name: "Orders", label: "Orders", color: "orange.6" },
                { name: "Users", label: "Users", color: "blue.6" },
              ]}
            />
          </Paper>
        </Grid.Col>

        <Grid.Col span={4}>
          <Paper radius="md">
            <Group p="md" justify="space-between">
              <Text fw="bold">Last 5 Users</Text>
              <Button size="compact-sm" fz="xs" variant="light" radius="md">
                New
              </Button>
            </Group>
            <Divider />
            <Stack p="md">
              {users?.slice(0, 5)?.map((user) => (
                <Group gap="xs" key={user?._id}>
                  <Avatar src={user?.image} radius="md" />
                  <Stack gap={2}>
                    <Text size="sm" fw="500">
                      {user?.personalInformation?.name?.first}
                    </Text>
                    <Text size="xs" fw="lighter">
                      {user?.contacts?.email}
                    </Text>
                  </Stack>
                </Group>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper p="lg" radius="md">
            <BarChart
              h={300}
              data={fakeBarChartData}
              dataKey="month"
              withLegend
              series={[
                { name: "TShirts", color: "violet.6" },
                { name: "Jeans", color: "blue.6" },
                { name: "Jackets", color: "teal.6" },
              ]}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper radius="md">
            <Group p="md" justify="space-between">
              <Text fw="bold">Last 5 Orders</Text>
              <Button size="compact-sm" fz="xs" variant="light" radius="md">
                More
              </Button>
            </Group>
            <Divider />
            <Stack p="md">
              {orders?.slice(0, 5)?.map((order) => (
                <Group gap="xs" justify="space-between" key={order?._id}>
                  <Stack gap={2}>
                    <Text size="sm" fw="500">
                      {order?.retailer?.user?.personalInformation?.name?.first}
                    </Text>
                    <Text size="xs" fw="lighter">
                      {order?.voucherNumber}
                    </Text>
                  </Stack>
                  <Badge variant="light" size="lg" color="green" radius="xl">
                    {order?.cost?.toFixed(2)}$
                  </Badge>
                </Group>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper p="lg" radius="md">
            <Group align="center" justify="space-between">
              <Text c="dimmed" size="sm">
                Category Sales
              </Text>
              <Badge variant="light" color="orange">
                {dayjs().format("MMMM")}
              </Badge>
            </Group>
            <RadarChart
              h={300}
              withPolarAngleAxis
              withPolarGrid
              withPolarRadiusAxis
              data={fakeRadarChartData}
              dataKey="category"
              series={[
                { name: "sales", color: "orange", strokeColor: "orange" },
              ]}
            />
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Dashboard;
