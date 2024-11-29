import React, { ReactNode } from "react";
import {
  Divider,
  ElementProps,
  Group,
  Paper,
  rem,
  Select,
  SelectProps,
  Stack,
  Text,
  TextInput,
  TextInputProps,
} from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";
import { countryCodes } from "../../constants";

interface Props
  extends TextInputProps,
    ElementProps<"input", keyof TextInputProps> {
  onCountryCodeChange?: React.ChangeEventHandler<HTMLSelectElement>;
  label?: ReactNode;
  countryCodeProps?: SelectProps;
}

const MobileInput = ({
  onCountryCodeChange,
  label = "Mobile Number",
  countryCodeProps,
  required,
  ...rest
}: Props) => {
  return (
    <Stack gap={3}>
      <Group gap={3}>
        <Text fz="sm" c="dark" fw={500}>
          {label}
        </Text>
        {required && (
          <Text fz="sm" c="red" fw={500}>
            *
          </Text>
        )}
      </Group>
      <Paper withBorder>
        <Group gap={0}>
          <Select
            data={countryCodes.map((c) => ({
              ...c,
              value: c.value,
              label: c.flag + " " + c.value,
            }))}
            size="md"
            maw={132}
            pl="xs"
            searchable
            placeholder="Code"
            errorProps={{ fz: "xs" }}
            required={required}
            variant="unstyled"
            {...countryCodeProps}
            value={countryCodeProps?.value}
            onChange={countryCodeProps?.onChange}
          />
          <Divider orientation="vertical" />
          <TextInput
            pl="xs"
            type="tel"
            placeholder="1234567890"
            size="md"
            flex={1}
            labelProps={{ fz: "sm", mb: 6, c: "dark" }}
            descriptionProps={{ fz: 12 }}
            errorProps={{ fz: "xs" }}
            rightSection={
              <IconPhone style={{ width: rem(16), height: rem(16) }} />
            }
            variant="unstyled"
            {...rest}
          />
        </Group>
      </Paper>
    </Stack>
  );
};

export default MobileInput;
