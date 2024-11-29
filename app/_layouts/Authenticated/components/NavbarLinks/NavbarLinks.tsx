import { Stack } from "@mantine/core";
import { navbarLinks } from "../../constants";
import NavbarSection from "../NavbarSection";

interface Props {
  toggleNavbar?: VoidFunction;
}
const NavbarLinks = ({ toggleNavbar }: Props) => {
  return (
    <Stack gap="xl">
      {navbarLinks.map((section) => (
        <NavbarSection
          toggleNavbar={toggleNavbar}
          key={section?.href?.toString()}
          section={section}
        />
      ))}
    </Stack>
  );
};

export default NavbarLinks;
