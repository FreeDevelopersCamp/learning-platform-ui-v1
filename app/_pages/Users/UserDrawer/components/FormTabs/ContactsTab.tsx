import { Grid, Stack, Text } from "@mantine/core";
import { Form } from "@/types/mantine";
import { UserForm } from "../../types";
import { ResourceUserDto } from "@/apis/core/User/types";
import EmailAutocomplete from "./EmailAutocomplete";
import MobileInput from "./MobileInput";
import AddressSection from "./AddressSection";
import Title from "@/components/Title";

interface Props {
  form: Form<UserForm>;
  selectedItem?: ResourceUserDto;
}

const ContactsTab = ({ form }: Props) => {
  return (
    <Grid p="lg">
      <Grid.Col span={12}>
        <Stack>
          <Title order={5}>Contact</Title>
          <Text c="dimmed">
            The contact information helps organizations reach out to users for
            follow-ups, support, and other communication needs.
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={12}></Grid.Col>

      <Grid.Col span={6}>
        <EmailAutocomplete
          label="Email"
          placeholder="User email"
          required
          {...form.getInputProps("contacts.email")}
        />
      </Grid.Col>

      <Grid.Col span={12}></Grid.Col>

      <Grid.Col span={6}>
        <MobileInput
          label="Primary"
          required
          countryCodeProps={{
            value: form.values.contacts?.mobile.countryCode,
            onChange: (value) =>
              form.setFieldValue("contacts.mobile.countryCode", value!),
          }}
          {...form.getInputProps("contacts.mobile.mobile")}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <MobileInput
          label="Emergency"
          required
          countryCodeProps={{
            value: form.values.contacts?.emergencyMobile.countryCode,
            onChange: (value) =>
              form.setFieldValue(
                "contacts.emergencyMobile.countryCode",
                value!
              ),
          }}
          {...form.getInputProps("contacts.emergencyMobile.mobile")}
        />
      </Grid.Col>

      <Grid.Col span={12}></Grid.Col>

      <AddressSection form={form} />
    </Grid>
  );
};

export default ContactsTab;
