import Avatar from "@/components/Avatar";
import {
  Group,
  MantineColor,
  Paper,
  PaperProps,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { ReactNode } from "react";

interface Props extends PaperProps {
  icon: ReactNode;
  stat: ReactNode;
  label: ReactNode;
  color: MantineColor;
  isLoading: boolean;
}
const Stat = ({ icon, stat, label, color, isLoading, ...rest }: Props) => {
  return (
    <Paper p="md" radius="md" {...rest}>
      <Skeleton visible={isLoading}>
        <Group>
          <Avatar variant="light" color={color} size="lg">
            {icon}
          </Avatar>
          <Stack gap={1}>
            <Text size="lg" fw="bold">
              {stat}
            </Text>
            <Text size="sm" c="dimmed">
              {label}
            </Text>
          </Stack>
        </Group>
      </Skeleton>
    </Paper>
  );
};

export default Stat;
