import { useState } from "react";
import { NavbarLink } from "../../types";
import { Badge, Button, Group, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import useTranslator from "@/hooks/useTranslator";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./styles.module.css";
import LinksGroupMenu from "./LinksGroupMenu";
import useBreakpoints from "@/hooks/useBreakpoints";

interface Props {
  link: NavbarLink;
  isActive: boolean;
  initiallyOpened?: boolean;
  toggleNavbar?: VoidFunction;
}
const LinksGroup = ({
  link,
  isActive,
  initiallyOpened = false,
  toggleNavbar,
}: Props) => {
  const { language } = useTranslator();
  const { href, label, children, Icon } = link;

  const [opened, setOpened] = useState(initiallyOpened || false);

  const hasLinks = Array.isArray(children);

  const isMatch = useBreakpoints();

  const linksRightSecions = {};

  const handleLinkGroupClick = () => {
    if (!!children?.length) {
      setOpened((o) => !o);
      return;
    }

    if (isMatch.sm) {
      toggleNavbar?.();
    }
  };

  return (
    <>
      <Button
        component={!hasLinks ? Link : undefined}
        to={href}
        variant={opened ? "light" : isActive ? "gradient" : "subtle"}
        color={isActive || opened ? "blue" : "gray.6"}
        rightSection={
          <Group>
            {hasLinks && (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? "rotate(-90deg)" : "none",
                }}
              />
            )}
            {linksRightSecions[link?.href?.toString()]}
          </Group>
        }
        fz="sm"
        justify="space-between"
        h={42}
        onClick={handleLinkGroupClick}
        px="sm"
      >
        <Group gap="xs" p={0} align="center">
          {Icon && <Icon style={{ width: rem(20), height: rem(20) }} />}
          {label?.[language]}
        </Group>
      </Button>
      {hasLinks && <LinksGroupMenu links={children} isOpened={opened} />}
    </>
  );
};

export default LinksGroup;
