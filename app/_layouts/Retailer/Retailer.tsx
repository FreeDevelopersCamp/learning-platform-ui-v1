import useUserContext from "@/contexts/UserContext/useUserContext";
import Container from "@/components/Container";
import Header from "./components/Header";
import useLocalStorage from "@/hooks/useLocalStorage";
import SearchSpotlight from "./components/SearchSpotlight";
import { LookupProvider } from "@/contexts/LookupContext";
import { AppShell, Divider } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";

const Retailer = () => {
  const {
    navbar: [isNavbarOpened, setIsNavbarOpened],
  } = useLocalStorage();

  const toggleNavbar = () => {
    setIsNavbarOpened(!isNavbarOpened);
  };

  const { user } = useUserContext();

  const headerOptions = { height: 85 };

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (user.roles.includes(1)) {
    return <Navigate to="/" />;
  }

  return (
    <CartProvider>
      <LookupProvider>
        <AppShell
          layout="alt"
          header={headerOptions}
          transitionDuration={300}
          transitionTimingFunction="ease"
        >
          <AppShell.Header zIndex={15} withBorder={false}>
            <Header isOpened={isNavbarOpened} toggle={toggleNavbar} />
            <Divider />
            <SearchSpotlight />
          </AppShell.Header>

          <AppShell.Main>
            <Container p="lg">
              <Outlet />
            </Container>
          </AppShell.Main>
        </AppShell>
      </LookupProvider>
    </CartProvider>
  );
};

export default Retailer;
