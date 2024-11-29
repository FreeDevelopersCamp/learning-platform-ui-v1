import { Stack, Text } from "@mantine/core";
import { NavbarLink } from "../../types";
import useTranslator from "@/hooks/useTranslator";
import LinksGroup from "../NavbarLinks/LinksGroup";
import { useLocation, useMatch } from "react-router-dom";

interface Props {
  section: NavbarLink;
  toggleNavbar?: VoidFunction;
}

const NavbarSection = ({ section, toggleNavbar }: Props) => {
  const { language } = useTranslator();
  const { pathname } = useLocation();

  return (
    <Stack gap="xs">
      <Text fz="sm" fw="bold" c="gray.5">
        {section?.label?.[language]}
      </Text>
      {section?.children?.map((link) => (
        <LinksGroup
          key={link?.href?.toString()}
          link={link}
          isActive={
            link?.href?.toString() === pathname ||
            pathname.startsWith(`${link?.href?.toString()}/`)
          }
          initiallyOpened={link.children?.some((l) => l.href === pathname)}
          toggleNavbar={toggleNavbar}
        />
      ))}
    </Stack>
  );
};

export default NavbarSection;
