import {
  Group,
  Kbd,
  Paper,
  PaperProps,
  Text,
  TextInputProps,
  rem,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { spotlight } from "@mantine/spotlight";
import useTranslator from "@/hooks/useTranslator";
import TextInput from "@/components/TextInput";

interface Props extends TextInputProps {}
const SearchBox = ({ ...rest }: Props) => {
  const { t } = useTranslator();

  return (
    <TextInput
      radius="md"
      leftSection={<IconSearch stroke={1.5} color="gray" />}
      placeholder="Search about anything"
      {...rest}
    />
  );
};

export default SearchBox;
