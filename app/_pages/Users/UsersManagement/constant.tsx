import { Column } from "@/components/Grid/context/types";
import { Badge, Group, Stack, Text } from "@mantine/core";
import { useLookupContext } from "@/contexts/LookupContext";
import { ResourceUserDto } from "@/apis/core/User/types";
import Avatar from "@/components/Avatar";
import OptionsCell from "./components/TabelCells/OptionsCell";
import ContactCell from "@/components/ContactCell";

export const rolesColors = [
  "dark",
  "blue",
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "cyan",
  "green",
  "lime",
  "yellow",
  "orange",
  "teal",
];

export const columns: Column<ResourceUserDto>[] = [
  {
    key: "personalInformation.name.first",
    header: "Name",
    sortable: true,
    render: (item) => (
      <Group gap="sm">
        <Avatar size="md" src={item.image} radius="md" />
        <Stack gap={0}>
          <Group gap={3}>
            <Text fz="sm" fw="bold">
              {item?.personalInformation?.name?.first}
            </Text>
            <Text fz="sm" fw={400}>
              {item?.personalInformation?.name?.last}
            </Text>
          </Group>
          <Text fz="xs" c="dimmed">
            {item?.userName}
          </Text>
        </Stack>
      </Group>
    ),
  },
  {
    key: "roles",
    header: "Role",
    sortable: true,
    render: (item) => {
      const { lookups } = useLookupContext();

      return (
        <Group gap="xs">
          <Badge
            color={rolesColors[Number(item?.roles?.[0]) || 1]}
            variant="light"
            size="md"
          >
            {
              lookups.roles.find(
                (r) => r.id.toString() === item?.roles[0].toString()
              )?.label
            }
          </Badge>
          {!!(item.roles.length - 1) && (
            <Badge variant="default">+{item.roles.length - 1} more</Badge>
          )}
        </Group>
      );
    },
  },
  {
    key: "address",
    header: "Address",
    sortable: true,
    render: (item) => {
      const { lookups } = useLookupContext();

      return (
        <Stack gap={2}>
          <Text fz="sm">
            {
              lookups.countries.find(
                (c) => c.id.toString() === item?.address?.country?.toString()
              )?.label
            }
          </Text>
          <Text fz="xs" c="dimmed">
            {
              lookups.cities.find(
                (c) => c.id.toString() === item?.address?.city?.toString()
              )?.label
            }
          </Text>
        </Stack>
      );
    },
  },
  {
    key: "contacts",
    header: "Contact",
    sortable: true,
    render: (item) => <ContactCell contact={item?.contacts} />,
  },
  {
    key: "id",
    header: "Options",
    sortable: true,
    render: (item) => <OptionsCell item={item} />,
  },
];
