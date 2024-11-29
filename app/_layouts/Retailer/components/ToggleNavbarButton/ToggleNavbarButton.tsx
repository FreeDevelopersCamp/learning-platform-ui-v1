import { ActionIcon, ActionIconProps } from "@mantine/core";
import {
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarRightExpand,
} from "@tabler/icons-react";

interface Props extends ActionIconProps {
  isOpened: boolean;
  toggle: VoidFunction;
}

const ToggleNavbarButton = ({ isOpened, toggle, ...rest }: Props) => {
  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      aria-label="Burger"
      onClick={toggle}
      {...rest}
    >
      {isOpened ? (
        <IconLayoutSidebarRightExpand size={20} />
      ) : (
        <IconLayoutSidebarLeftExpand size={20} />
      )}
    </ActionIcon>
  );
};

export default ToggleNavbarButton;
