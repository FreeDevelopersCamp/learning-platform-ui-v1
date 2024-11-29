import { ActionIcon, Group, GroupProps } from "@mantine/core";
import UserButton from "../UserButton";
import { IconBell } from "@tabler/icons-react";
import SearchBox from "../SearchBox";
import ToggleNavbarButton from "../ToggleNavbarButton";

interface Props extends GroupProps {
  isOpened: boolean;
  toggle: VoidFunction;
}
const Header = ({ isOpened, toggle, ...rest }: Props) => {
  return (
    <Group h="100%" px="md" justify="space-between" align="center" {...rest}>
      <ToggleNavbarButton toggle={toggle} isOpened={isOpened} />
      <SearchBox visibleFrom="md" />

      <Group gap="xs" justify="center">
        <ActionIcon variant="subtle" color="gray">
          <IconBell size={20} />
        </ActionIcon>
        <UserButton />
      </Group>
    </Group>
  );
};

export default Header;
