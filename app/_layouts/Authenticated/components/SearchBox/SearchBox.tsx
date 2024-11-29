import { Group, Kbd, Paper, PaperProps, Text, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { spotlight } from "@mantine/spotlight";
import useTranslator from "@/hooks/useTranslator";

interface Props extends PaperProps {}
const SearchBox = ({ ...rest }: Props) => {
  const { t } = useTranslator();

  return (
    <Paper
      withBorder
      py={6}
      px="xs"
      radius="md"
      onClick={spotlight.open}
      {...rest}
    >
      <Group justify="space-between" align="center">
        <Group justify="start" align="center" gap={6}>
          <IconSearch style={{ width: rem(16) }} stroke={1} color="gray" />
          <Text fz="sm" c="gray">
            {t("searchBoxPlaceholder")}
          </Text>
        </Group>

        <Kbd size="xs">/</Kbd>
      </Group>
    </Paper>
  );
};

export default SearchBox;
