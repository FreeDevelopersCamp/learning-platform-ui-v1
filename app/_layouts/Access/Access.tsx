import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserContext from "@/contexts/UserContext/useUserContext";
import Container from "@/components/Container";

const Access = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();

  if (user) {
    switch (user.roles.at(0)) {
      case 7:
        return <Navigate to="/retailer" />;
      default:
        return <Navigate to="/" />;
        break;
    }
  }

  if (pathname === "/auth") {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Container fluid p={0}>
      <Outlet />
    </Container>
  );
};

export default Access;
