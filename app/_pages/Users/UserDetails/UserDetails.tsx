import { usersGroup, usersGroupLinks } from "@/layouts/Authenticated/constants";
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
  rem,
} from "@mantine/core";
import { Fragment, PropsWithChildren } from "react";
import {
  IconGenderFemale,
  IconGenderMale,
  IconLock,
  IconPackages,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  IS_USER_DRAWER_OPENED_SEARCH_PARAM_KEY,
  SELECTED_USER_SEARCH_PARAM_KEY,
} from "../UserDrawer/constants";
import { useLookupContext } from "@/contexts/LookupContext";
import { rolesColors } from "../UsersManagement/constant";
import {
  IS_DRAWER_OPENED_SEARCH_PARAM_KEY,
  SELECTED_ITEM_SEARCH_PARAM_KEY,
} from "@/pages/ChangePasswordDrawer/constants";
import { ResourceUserDto } from "@/apis/core/User/types";
import useSearch from "@/hooks/useSearch";
import useModals from "@/hooks/useModals";
import Button from "@/components/Button";
import useGetUser from "@/apis/core/User/hooks/useGetUser";
import toasts from "@/utils/toasts";
import UserDrawer from "../UserDrawer";
import UserInfo from "./components/UserInfo";
import Avatar from "@/components/Avatar";
import ChangePasswordDrawer from "@/pages/ChangePasswordDrawer";
import useDeleteUser from "@/apis/core/User/hooks/useDeleteUser";
import RouteHeader from "@/components/RouteHeader";
import Title from "@/components/Title";

interface Props {
  selectedItem?: ResourceUserDto;
  withBreadcrumbs?: boolean;
  withHeader?: boolean;
}
const UserDetails = ({
  selectedItem,
  withBreadcrumbs = true,
  withHeader = true,
}: PropsWithChildren<Props>) => {
  const pageIndex = 0;

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { lookups } = useLookupContext();
  const { userId } = useParams();

  const { setParams } = useSearch();
  const { showWarning } = useModals();

  const { data, isFetching } = useGetUser({
    id: userId!,
    config: {
      enabled: !!userId,
    },
  });

  const user = data || selectedItem;

  const breadcrumbsItems = [
    usersGroup,
    { ...usersGroupLinks[pageIndex] },
    {
      label: {
        en: user?.userName!,
      },
      href: "/users/view/" + userId,
      Icon: IconPackages,
      description: {
        en: "",
      },
      isActive: true,
    },
  ];

  const { mutate: deleteUser, isPending: isDeletingUser } = useDeleteUser({
    config: {
      onSuccess: async () => {
        toasts.showSuccessToast({
          id: "updating-user",
          message: `Successfully deleted ${user?.userName} user`,
        });
        await queryClient.invalidateQueries({
          queryKey: ["user", "list"],
        });
        navigate("/users");
      },
    },
  });

  const handleConfirmDelete = (id: string) => {
    deleteUser(id);
  };

  const handleDeleteUser = (id?: string) => {
    if (!id) return;

    showWarning({
      title: <Text fw="bolder">Deleting {user?.userName}</Text>,
      children: (
        <Text fz="sm" c="dimmed" mb="xl">
          Are you sure you want to delete {user?.userName} user!
        </Text>
      ),
      labels: {
        confirm: "Delete",
      },
      onConfirm: () => {
        handleConfirmDelete(id);
      },
    });
  };

  const handleOpenUserDrawer = (id?: string) => {
    if (!id) return;
    setParams([
      { key: IS_USER_DRAWER_OPENED_SEARCH_PARAM_KEY, value: "true" },
      { key: SELECTED_USER_SEARCH_PARAM_KEY, value: id },
    ]);
  };

  const handleChangeUserPassword = (id?: string) => {
    setParams([
      { key: SELECTED_ITEM_SEARCH_PARAM_KEY, value: String(id) },
      { key: IS_DRAWER_OPENED_SEARCH_PARAM_KEY, value: "true" },
    ]);
  };

  return (
    <Box>
      <UserDrawer />
      <ChangePasswordDrawer />
      {withBreadcrumbs && (
        <RouteHeader
          breadcrumbsItems={breadcrumbsItems}
          onRefresh={() => {
            queryClient.invalidateQueries({
              queryKey: ["user", "get", user?._id],
            });
          }}
        />
      )}

      <Space h="md" />

      <Grid>
        {/* Details */}
        <Grid.Col span={12}>
          <Paper radius="md">
            {withHeader && (
              <Fragment>
                <Group p="md" align="center" justify="space-between">
                  <Stack gap={0}>
                    <Text size="xs" c="dimmed">
                      User Ref
                    </Text>
                    <Text c="dimmed" size="xs">
                      {userId}
                    </Text>
                  </Stack>
                  <Group align="center">
                    <Button
                      variant="subtle"
                      color="gray"
                      size="compact-md"
                      loading={isDeletingUser}
                      onClick={() => handleDeleteUser(userId)}
                      leftSection={
                        <IconTrash
                          style={{ width: rem(16), height: rem(16) }}
                        />
                      }
                    >
                      Delete
                    </Button>

                    <Button
                      variant="light"
                      size="compact-md"
                      loading={isFetching}
                      leftSection={
                        <IconPencil
                          style={{ width: rem(16), height: rem(16) }}
                        />
                      }
                      onClick={() => handleOpenUserDrawer(userId)}
                    >
                      Edit
                    </Button>
                  </Group>
                </Group>
                <Divider />
              </Fragment>
            )}

            <Group p="md" justify="space-between" align="start">
              <UserInfo user={user} />
              <Button
                variant="subtle"
                color="gray"
                size="compact-md"
                loading={isDeletingUser}
                leftSection={
                  <IconLock style={{ width: rem(16), height: rem(16) }} />
                }
                onClick={() => handleChangeUserPassword(userId)}
              >
                Change Password?
              </Button>
            </Group>

            <Divider />

            <Stack p="md">
              <Title order={5}>Address</Title>

              <Grid>
                <Grid.Col span={3}>
                  <Stack gap={2}>
                    <Text size="sm" c="dimmed" fw="bold">
                      Country
                    </Text>
                    <Text>
                      {lookups.countries.find(
                        (country) =>
                          country?.id.toString() ===
                          user?.address?.country.toString()
                      )?.label || "Empty"}
                    </Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Stack gap={2}>
                    <Text size="sm" c="dimmed" fw="bold">
                      City
                    </Text>
                    <Text>
                      {lookups.cities.find(
                        (city) =>
                          city?.id.toString() === user?.address?.city.toString()
                      )?.label || "Empty"}
                    </Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Stack gap={2}>
                    <Text size="sm" c="dimmed" fw="bold">
                      Street
                    </Text>
                    <Text>{user?.address?.street || "Empty"}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Stack gap={2}>
                    <Text size="sm" c="dimmed" fw="bold">
                      Postal Code
                    </Text>
                    <Text>{user?.address?.postalCode || "Empty"}</Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
            <Divider />

            <Stack p="md">
              <Title order={5}>Roles</Title>

              <Group>
                {user?.roles.map((role) => (
                  <Badge variant="dot" color={rolesColors[Number(role) || 0]}>
                    {
                      lookups.roles.find(
                        (r) => r.id.toString() === role.toString()
                      )?.label
                    }
                  </Badge>
                ))}
              </Group>
            </Stack>

            <Divider />
            <Stack p="md">
              <Title order={5}>Contact</Title>

              <Grid>
                <Grid.Col span={4}>
                  <Stack gap={2}>
                    <Text size="sm" c="dimmed" fw="bold">
                      Email
                    </Text>
                    <Text>{user?.contacts.email}</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Stack gap={2}>
                    <Text size="sm" c="dimmed" fw="bold">
                      Primary Mobile
                    </Text>
                    <Text>
                      ({user?.contacts.mobile.countryCode}){" "}
                      {user?.contacts.mobile.mobile}
                    </Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Stack gap={2}>
                    <Text size="sm" c="dimmed" fw="bold">
                      Mobile
                    </Text>
                    <Text>
                      ({user?.contacts.emergencyMobile.countryCode}){" "}
                      {user?.contacts.emergencyMobile.mobile}
                    </Text>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
            <Divider />

            <Stack p="md">
              <Title order={5}>General</Title>

              <Grid>
                <Grid.Col span={6}>
                  <Stack gap={2}>
                    <Text size="sm" c="dimmed" fw="bold">
                      Date of Birth
                    </Text>
                    <Text>
                      {user?.personalInformation.dateOfBirth || "None"}
                    </Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Stack gap={2}>
                    <Text size="sm" c="dimmed" fw="bold">
                      Gender
                    </Text>
                    <Group gap="xs">
                      <Text tt="capitalize">
                        {
                          lookups.gender.find(
                            (gender) =>
                              gender.id === user?.personalInformation.gender
                          )?.label
                        }
                      </Text>
                      <Avatar
                        size="xs"
                        color={
                          user?.personalInformation.gender === "1"
                            ? "blue"
                            : "pink"
                        }
                      >
                        {user?.personalInformation.gender === "1" ? (
                          <IconGenderMale />
                        ) : (
                          <IconGenderFemale />
                        )}
                      </Avatar>
                    </Group>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default UserDetails;
