import useTranslator from "@/hooks/useTranslator";

import { Group, Paper, Stack, Text } from "@mantine/core";
import { IconCalendarDue } from "@tabler/icons-react";
import { useUserContext } from "@/contexts/UserContext";
import dayjs from "@/utils/dayjs";

interface Props {}
const Header = ({}: Props) => {
  const { t } = useTranslator();
  const { userQuery } = useUserContext();

  const todaysDate = dayjs().format("ddd, MMM Do, YYYY");

  const name = userQuery?.data?.personalInformation?.name;
  return (
    <Paper p="lg" radius="md">
      <Group align="start" justify="space-between">
        <Stack gap={0}>
          <Text fz="xs" lh="xs" c="dimmed">
            {t("homePageWelcome")}
          </Text>
          <Text fz="lg" fw="bold" lh="xs">
            {name?.first + " " + name?.last}
          </Text>
        </Stack>

        <Group gap={4} align="center">
          <IconCalendarDue size={16} color="gray" />
          <Text fz="xs" c="gray.7">
            {todaysDate}
          </Text>
        </Group>
      </Group>
    </Paper>
  );
};

export default Header;
