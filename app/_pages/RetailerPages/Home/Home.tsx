import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Paper,
  Skeleton,
  Space,
  Text,
} from "@mantine/core";
import { PropsWithChildren } from "react";
import { IconCategoryFilled, IconDots } from "@tabler/icons-react";
import Title from "@/components/Title";
import useCategoriesList from "@/hooks/useCategoriesList";
import classes from "./styles.module.css";

interface Props {}

const RetailerHome = ({}: PropsWithChildren<Props>) => {
  const { data: categories, isPending: isLoadingCategories } =
    useCategoriesList();

  return (
    <Box>
      <Space h="md" />
      <Space h="md" />
      <Space h="md" />

      <Grid>
        <Grid.Col span={12}>
          <Group>
            <Title order={4}>Our Categories</Title>
          </Group>
        </Grid.Col>
        {!isLoadingCategories && (
          <Grid.Col span={12}>
            <Group grow>
              <Paper bg="blue" radius="xl" className={classes.category}>
                <Group justify="" p="xs" px="sm" gap="xs">
                  <IconCategoryFilled size={18} color="white" />
                  <Text c="white" size="md" fw="bolder">
                    All
                  </Text>
                </Group>
              </Paper>

              {categories?.map((category) => (
                <Paper withBorder radius="xl" className={classes.category}>
                  <Group justify="center" p="xs">
                    <Group>
                      <Text size="md" fw="bold">
                        {category.name}
                      </Text>
                    </Group>
                  </Group>
                </Paper>
              ))}

              <Paper withBorder radius="xl" className={classes.category}>
                <Group justify="center" p="xs">
                  <Text size="md" fw="bold" c="dimmed">
                    More
                  </Text>
                  <ActionIcon variant="transparent" size="sm" c="dimmed">
                    <IconDots />
                  </ActionIcon>
                </Group>
              </Paper>
            </Group>
          </Grid.Col>
        )}
        {isLoadingCategories && (
          <Grid.Col span={12}>
            <Group grow>
              {new Array(7).fill(0).map((i, index) => (
                <Skeleton height={42} radius="xl" circle />
              ))}
            </Group>
          </Grid.Col>
        )}
      </Grid>
    </Box>
  );
};

export default RetailerHome;
