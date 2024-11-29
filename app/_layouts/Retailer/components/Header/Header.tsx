import { ActionIcon, Badge, Group, GroupProps } from "@mantine/core";
import {
  IconFileInvoice,
  IconPackages,
  IconShoppingBag,
} from "@tabler/icons-react";
import { IconHome, IconBell, IconUser } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import SearchBox from "../SearchBox";
import UserButton from "../UserButton";
import Container from "@/components/Container";
import LinkButton from "@/components/LinkButton";
interface Props extends GroupProps {
  isOpened: boolean;
  toggle: VoidFunction;
}
const Header = ({ isOpened, toggle, ...rest }: Props) => {
  const tabs = [
    {
      value: "Home",
      label: {
        en: "Home",
      },
      href: "/retailer",
      icon: <IconHome size={16} />,
    },
    {
      value: "Catalog",
      label: {
        en: "Catalog",
      },
      href: "/retailer/catalog",
      icon: <IconPackages size={16} />,
    },
    {
      value: "Account",
      label: {
        en: "Account",
      },
      href: "/retailer/account",
      icon: <IconUser size={16} />,
    },
  ];

  const { pathname } = useLocation();

  return (
    <Container p="xs">
      <Group justify="space-between" align="center" {...rest}>
        <Group gap="xs">
          {tabs?.map((tab) => (
            <LinkButton
              key={tab.href}
              leftSection={tab.icon}
              variant={pathname === tab.href ? "light" : "default"}
              fw={pathname === tab.href ? "bolder" : "500"}
              radius="xl"
              color={pathname === tab.href ? "dark" : "grey"}
              to={tab.href}
              size="md"
            >
              {tab.label.en}
            </LinkButton>
          ))}
        </Group>

        <Group justify="center">
          <ActionIcon size="xl" c="dark" variant="default" radius="xl">
            <IconBell stroke={1.5} size={24} />
          </ActionIcon>
          <ActionIcon
            size="xl"
            c={pathname === "/retailer/checkout" ? "white" : "dark"}
            variant={pathname === "/retailer/checkout" ? "gradient" : "default"}
            radius="xl"
            component={Link}
            to="/retailer/checkout"
          >
            <IconShoppingBag stroke={1.5} size={24} />
          </ActionIcon>
          <ActionIcon size="xl" c="dark" variant="default" radius="xl">
            <IconFileInvoice stroke={1.5} size={24} />
          </ActionIcon>
          <UserButton />
        </Group>
      </Group>
    </Container>
  );
};

export default Header;
