import {
  Box,
  Progress,
  PasswordInput,
  Group,
  Text,
  Center,
  PasswordInputProps,
  ElementProps,
  rem,
} from "@mantine/core";
import { IconCheck, IconPassword, IconX } from "@tabler/icons-react";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text component="div" c={meets ? "teal" : "red"} mt={5} size="sm">
      <Center inline>
        {meets ? (
          <IconCheck size="0.9rem" stroke={1.5} />
        ) : (
          <IconX size="0.9rem" stroke={1.5} />
        )}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password?.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

interface Props
  extends PasswordInputProps,
    ElementProps<"input", keyof PasswordInputProps> {
  showHints?: boolean;
  showBars?: boolean;
  value: string;
}

const PasswordStrengthInput = ({
  showHints = false,
  showBars = false,
  value,
  ...rest
}: Props) => {
  const strength = getStrength(value);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: "0ms" } }}
        value={
          value?.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
              ? 100
              : 0
        }
        color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
        key={index}
        size={4}
      />
    ));

  return (
    <div>
      <PasswordInput
        placeholder="Your password"
        label="Password"
        required
        size="md"
        labelProps={{ fz: "sm", mb: 3, c: "dark" }}
        descriptionProps={{ fz: 12 }}
        errorProps={{ fz: "xs" }}
        leftSection={
          <IconPassword style={{ width: rem(16), height: rem(16) }} />
        }
        value={value}
        {...rest}
      />

      {showBars && (
        <Group gap={5} grow mt="xs" mb="md">
          {bars}
        </Group>
      )}

      {showHints && (
        <>
          <PasswordRequirement
            label="Has at least 6 characters"
            meets={value?.length > 5}
          />
          {checks}
        </>
      )}
    </div>
  );
};
export default PasswordStrengthInput;
