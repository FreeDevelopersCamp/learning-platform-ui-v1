import {
  UnstyledButton,
  Group,
  rem,
  Menu,
  MenuProps,
  ActionIcon,
} from "@mantine/core";
import { IconChevronDown, IconPower } from "@tabler/icons-react";
import { useUserContext } from "@/contexts/UserContext";
import classes from "./styles.module.css";
import useTranslator from "@/hooks/useTranslator";
import Avatar from "@/components/Avatar";

interface Props extends MenuProps {}

const UserButton = ({ ...rest }: Props) => {
  const { t } = useTranslator();
  const { handleLogout, userQuery } = useUserContext();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "fade-down" }}
      withinPortal
      shadow="sm"
      withArrow
      {...rest}
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group gap={2}>
            <ActionIcon size="xl" variant="default" radius="xl">
              <Avatar src={userQuery?.data?.image} size="md" radius="xl" />
            </ActionIcon>
            <IconChevronDown
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={
            <IconPower
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={handleLogout}
          variant="subtle"
        >
          {t("logoutButtonTitle")}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserButton;
