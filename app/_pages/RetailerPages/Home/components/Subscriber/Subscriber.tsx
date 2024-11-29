import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import Title from "@/components/Title";
import { Group, Paper, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";
const Subscriber = () => {
  return (
    <Paper px={56} py={96} radius="md" withBorder>
      <Group>
        <Group flex={1}>
          <Stack gap={2}>
            <Title>Want product news and updates?</Title>
            <Title>Sign up for our newsletter.</Title>
          </Stack>
        </Group>
        <Group flex={1} justify="end">
          <Stack>
            <Group>
              <TextInput
                variant="filled"
                miw={280}
                placeholder="Enter your email"
              />
              <Button size="md">Subscribe</Button>
            </Group>
            <Group gap="xs">
              <Text c="dark.8" size="sm">
                We care about your data. Read our
              </Text>
              <Text size="sm" fw="bold" component={Link} to="/">
                privacy policy.
              </Text>
            </Group>
          </Stack>
        </Group>
      </Group>
    </Paper>
  );
};

export default Subscriber;
