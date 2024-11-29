import useUserContext from "@/contexts/UserContext/useUserContext";
import Container from "@/components/Container";
import Header from "./components/Header";
import NavbarLinks from "./components/NavbarLinks";
import useLocalStorage from "@/hooks/useLocalStorage";
import SearchSpotlight from "./components/SearchSpotlight";
import SearchBox from "./components/SearchBox";
import ToggleNavbarButton from "./components/ToggleNavbarButton";
import { LookupProvider } from "@/contexts/LookupContext";
import {
  AppShell,
  Divider,
  Flex,
  Group,
  ScrollArea,
  Text,
} from "@mantine/core";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Image from "@/components/Image";
import Images from "@/assets/Images";
import { useDocumentTitle } from "@mantine/hooks";
import { navbarLinks } from "./constants";
import { NavbarLink } from "./types";

const Authenticated = () => {
  const {
    navbar: [isNavbarOpened, setIsNavbarOpened],
  } = useLocalStorage();

  const { pathname } = useLocation();
  const base = pathname?.split("/")?.at(1) || "";
  const hasPathnameViewWord = pathname.includes("view");

  const filteredLink = navbarLinks.find((link) =>
    link.href?.toString().split("/")?.at(1)?.startsWith(base)
  ) as NavbarLink;

  const title = filteredLink?.children?.find((link) => link?.href);

  useDocumentTitle(title?.label?.en || "");

  const toggleNavbar = () => {
    setIsNavbarOpened(!isNavbarOpened);
  };

  const { user } = useUserContext();

  const headerOptions = { height: 72 };
  const navbarOptions = {
    width: 300,
    breakpoint: "sm",
    collapsed: { mobile: !isNavbarOpened, desktop: !isNavbarOpened },
  };

  // this will be implemented after dicuss how we'll arrange the navbar items and subitems
  // const navbarMenu = useMenuList({});

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (!user.roles.includes(1)) {
    return <Navigate to="/retailer" />;
  }

  return (
    <LookupProvider>
      <AppShell
        layout="alt"
        header={headerOptions}
        navbar={navbarOptions}
        transitionDuration={300}
        transitionTimingFunction="ease"
      >
        <AppShell.Header zIndex={15}>
          <Header isOpened={isNavbarOpened} toggle={toggleNavbar} />
          <SearchSpotlight />
        </AppShell.Header>

        <AppShell.Navbar zIndex={15}>
          <AppShell.Section px="sm" mih={71}>
            <Group align="center" justify="center" gap="xs" h="100%">
              <Image src={Images.logo} w={32} h={32} p={2} radius="sm" />

              <Group align="center" justify="center" gap={4}>
                <Text variant="gradient" fz={32} fw="900" tt="uppercase">
                  Trade
                </Text>
                <Text variant="gradient" fz={32} fw="500" tt="uppercase">
                  Flow
                </Text>
              </Group>
            </Group>
          </AppShell.Section>
          <Divider />

          <AppShell.Section px="sm" mih={71}>
            <Flex align="center" justify="space-between" gap={2} h="100%">
              <SearchBox flex={1} />
              <ToggleNavbarButton
                toggle={toggleNavbar}
                isOpened={isNavbarOpened}
                hiddenFrom="sm"
              />
            </Flex>
          </AppShell.Section>
          <Divider />

          <AppShell.Section p="sm" component={ScrollArea}>
            <NavbarLinks toggleNavbar={toggleNavbar} />
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main bg="gray.0">
          <Container p="xs">
            <Outlet />
          </Container>
        </AppShell.Main>
      </AppShell>
    </LookupProvider>
  );
};

export default Authenticated;
