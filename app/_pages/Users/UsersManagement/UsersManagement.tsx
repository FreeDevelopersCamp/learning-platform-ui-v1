import {
  Alert,
  Badge,
  Box,
  Chip,
  Divider,
  Group,
  Paper,
  Space,
  Text,
} from "@mantine/core";
import { PropsWithChildren, useState } from "react";
import { columns } from "./constant";
import { usersGroup, usersGroupLinks } from "@/layouts/Authenticated/constants";
import { IS_USER_DRAWER_OPENED_SEARCH_PARAM_KEY } from "../UserDrawer/constants";
import { useNavigate } from "react-router-dom";
import { useLookupContext } from "@/contexts/LookupContext";
import { camelToPascalWithSpaces } from "@/utils/text";
import { exctractErrorBody } from "@/utils/error";
import { IconInfoCircle } from "@tabler/icons-react";
import CreateNewButton from "@/components/CreateNewButton";
import RouteHeader from "@/components/RouteHeader";
import useUsersList from "@/hooks/useUsersList";
import useSearch from "@/hooks/useSearch";
import UserDrawer from "../UserDrawer";
import queryClient from "@/utils/queryClient";
import classes from "./styles.module.css";
import Grid from "@/components/Grid";

interface Props {}
const UsersManagement = ({}: PropsWithChildren<Props>) => {
  const pageIndex = 0;
  const pageReferences = usersGroupLinks[pageIndex];

  const breadcrumbsItems = [
    usersGroup,
    { ...usersGroupLinks[pageIndex], isActive: true },
  ];

  const {
    data: users,
    isFetching: isLoadingUsers,
    error,
    isError,
  } = useUsersList();

  const { setParam } = useSearch();

  const handleOpenUserDrawer = () => {
    setParam(IS_USER_DRAWER_OPENED_SEARCH_PARAM_KEY, "true");
  };

  const navigate = useNavigate();
  const { lookups } = useLookupContext();

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const errorBody = exctractErrorBody(error);

  const filteredUsers = users?.filter((u) =>
    selectedRoles.some((s) => u.roles.includes(Number(s)))
  );

  return (
    <Box>
      <UserDrawer />

      <RouteHeader
        breadcrumbsItems={breadcrumbsItems}
        routePreferences={pageReferences}
        onRefresh={() => {
          queryClient.invalidateQueries({
            queryKey: ["user", "list"],
          });
        }}
      />

      <Space h="md" />

      {isError && (
        <>
          <Alert
            variant="light"
            color="red"
            radius="md"
            title={errorBody?.message}
            icon={<IconInfoCircle />}
          />
          <Space h="md" />
        </>
      )}

      <Paper p="sm" radius="md">
        <Chip.Group multiple value={selectedRoles} onChange={setSelectedRoles}>
          <Group gap="xs">
            {lookups.roles.map((l) => (
              <Chip
                value={l.id.toString()}
                radius="xl"
                variant={
                  selectedRoles.includes(l.id.toString()) ? "filled" : "outline"
                }
                classNames={classes}
              >
                <Group py={3} px={4} align="center">
                  <Text mx={4} size="xs" fw="500">
                    {camelToPascalWithSpaces(l.label)}
                  </Text>

                  <Badge
                    size="md"
                    circle
                    variant={
                      selectedRoles.includes(l.id.toString())
                        ? "white"
                        : "default"
                    }
                  >
                    {users?.filter((u) => u.roles.includes(Number(l.id)))
                      .length || 0}
                  </Badge>
                </Group>
              </Chip>
            ))}
          </Group>
        </Chip.Group>
      </Paper>
      <Space h="md" />

      <Paper p="sm" radius="md">
        <Grid
          columns={columns}
          rows={!!selectedRoles.length ? filteredUsers : users}
          verticalSpacing="sm"
          highlightOnHover
          withColumnBorders
          withRowBorders
          withPagination
          isLoading={isLoadingUsers}
        >
          <Grid.Toolbar>
            <Group align="center" justify="space-between" wrap="wrap-reverse">
              <Group grow>
                <Grid.Toolbar.SearchBox w={320} />
              </Group>

              <Group align="center" gap="xs">
                <Grid.Toolbar.ExportButton disabled />
                <Grid.Toolbar.FilterButton disabled />
                <Divider orientation="vertical" />

                <CreateNewButton
                  loading={isLoadingUsers}
                  onClick={handleOpenUserDrawer}
                />
              </Group>
            </Group>
          </Grid.Toolbar>

          <Grid.Header />
          <Grid.Body
            onRowClick={(item) => navigate(`/users/view/${item?._id}`)}
          />
        </Grid>
      </Paper>
    </Box>
  );
};

export default UsersManagement;
