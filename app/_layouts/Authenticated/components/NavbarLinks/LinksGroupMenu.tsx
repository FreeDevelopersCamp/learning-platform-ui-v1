import { NavbarLink } from "../../types";
import { Link, useLocation } from "react-router-dom";
import { Collapse, Text } from "@mantine/core";
import useTranslator from "@/hooks/useTranslator";
import classes from "./styles.module.css";
import useBreakpoints from "@/hooks/useBreakpoints";

interface Props {
  links?: NavbarLink[];
  isOpened: boolean;
  toggleNavbar?: VoidFunction;
}
const LinksGroupMenu = ({ links = [], isOpened, toggleNavbar }: Props) => {
  const { language } = useTranslator();

  const { pathname } = useLocation();

  const isMatch = useBreakpoints();

  const handleLinkClick = () => {
    if (isMatch.sm) {
      toggleNavbar?.();
    }
  };

  return (
    <Collapse in={isOpened}>
      {links.map((link) => (
        <Text
          component={Link}
          className={classes.link}
          to={link.href}
          key={link.href.toString()}
          c={pathname === link.href ? "blue" : undefined}
          style={
            pathname === link.href
              ? {
                  borderWidth: 3,
                  borderColor: "blue",
                }
              : undefined
          }
          onClick={handleLinkClick}
        >
          {link.label?.[language]}
        </Text>
      ))}
    </Collapse>
  );
};

export default LinksGroupMenu;
