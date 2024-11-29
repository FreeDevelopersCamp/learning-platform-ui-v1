import { UnstyledButton, Group, rem, Menu, MenuProps } from "@mantine/core";
import {
  IconChevronDown,
  IconLock,
  IconPower,
  IconUser,
} from "@tabler/icons-react";
import { useUserContext } from "@/contexts/UserContext";
import classes from "./styles.module.css";
import useTranslator from "@/hooks/useTranslator";
import UserCell from "@/components/UserCell";
import { Link } from "react-router-dom";

interface Props extends MenuProps {}

const UserButton = ({ ...rest }: Props) => {
  const { t } = useTranslator();
  const { userQuery, user, handleLogout } = useUserContext();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "fade-down" }}
      withinPortal
      shadow="xl"
      withArrow
      {...rest}
    >
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group>
            <UserCell user={userQuery?.data!} />

            <IconChevronDown
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Menu.Item
          component={Link}
          to={`/users/view/${user?.userId}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
          leftSection={<IconUser style={{ width: rem(16), height: rem(16) }} />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          component={Link}
          to={`/users/view/${user?.userId}?selectedUserToChangePassword=${user?.userId}&isChangePasswordDrawerOpened=true`}
          onClick={(e) => {
            e.stopPropagation();
          }}
          leftSection={
            <IconLock
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Change Password
        </Menu.Item>
        <Menu.Divider />
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
