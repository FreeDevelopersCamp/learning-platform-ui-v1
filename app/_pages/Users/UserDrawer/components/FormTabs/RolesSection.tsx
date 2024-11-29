import Title from "@/components/Title";
import { useLookupContext } from "@/contexts/LookupContext";
import { camelToPascalWithSpaces } from "@/utils/text";
import { Chip, Grid, Group, Menu, Button, rem } from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Form } from "@/types/mantine";
import { UserForm } from "../../types";
import { ResourceUserDto } from "@/apis/core/User/types";
import { LookupItem } from "@/contexts/LookupContext/types";

interface Props {
  form: Form<UserForm>;
  selectedItem?: ResourceUserDto;
}

const RolesSection = ({ form }: Props) => {
  const { lookups } = useLookupContext();

  const setSelectedItemsIds = (newIds: string[]) => {
    form.setFieldValue(
      "roles",
      newIds.map((r) => Number(r))
    );
  };

  const selectedItemsIds = form.values.roles.map((r) => Number(r)) || [];

  const selectedRoles = selectedItemsIds?.map((item) =>
    lookups.roles.find((role) => Number(role.id) === item)
  );

  const handleSelectRole = (role: LookupItem) => {
    form.setFieldValue("roles", [...selectedItemsIds, Number(role.id)]);
  };

  const filteredRoles = lookups.roles.filter(
    (role) => !selectedItemsIds?.find((s) => s === Number(role.id))
  );

  return (
    <>
      <Grid.Col span={12}>
        <Group justify="space-between">
          <Title order={5}>User Roles</Title>
          {!!selectedItemsIds?.length && (
            <Button
              rightSection={
                <IconX style={{ width: rem(16), height: rem(16) }} />
              }
              radius="xl"
              size="compact-xs"
              color="red"
              variant="subtle"
              defaultChecked
              onClick={() => setSelectedItemsIds([])}
            >
              CLEAR
            </Button>
          )}
        </Group>
      </Grid.Col>

      <Grid.Col span={12}>
        <Chip.Group
          multiple
          value={selectedItemsIds.map((r) => String(r))}
          onChange={setSelectedItemsIds}
        >
          <Group>
            {selectedRoles?.map((role) => (
              <Chip key={role?.id} value={role?.id}>
                {camelToPascalWithSpaces(role?.label)}
              </Chip>
            ))}

            <Menu
              width={260}
              position="bottom-start"
              transitionProps={{ transition: "fade-down" }}
              withinPortal
              shadow="sm"
              withArrow
            >
              <Menu.Target>
                <Button
                  radius="xl"
                  size="xs"
                  variant="default"
                  disabled={!filteredRoles.length}
                  rightSection={
                    <IconPlus style={{ width: rem(16), height: rem(16) }} />
                  }
                >
                  Add New Role
                </Button>
              </Menu.Target>

              {!!filteredRoles.length && (
                <Menu.Dropdown>
                  {filteredRoles.map((role) => (
                    <Menu.Item
                      key={role.id}
                      value={role.id}
                      onClick={() => handleSelectRole(role)}
                    >
                      {camelToPascalWithSpaces(role?.label)}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              )}
            </Menu>
          </Group>
        </Chip.Group>
      </Grid.Col>
    </>
  );
};

export default RolesSection;
