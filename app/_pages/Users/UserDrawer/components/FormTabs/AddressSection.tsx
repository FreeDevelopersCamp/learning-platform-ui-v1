import { Grid, Select } from "@mantine/core";
import { Form } from "@/types/mantine";
import { UserForm } from "../../types";
import { ResourceUserDto } from "@/apis/core/User/types";
import { useLookupContext } from "@/contexts/LookupContext";
import TextInput from "@/components/TextInput";

interface Props {
  form: Form<UserForm>;
  selectedItem?: ResourceUserDto;
}
const AddressSection = ({ form }: Props) => {
  const { lookups } = useLookupContext();

  const filteredCities = lookups.cities.filter(
    (c) =>
      c.parent?.value?.toString() === form.values.address?.country?.toString()
  );

  return (
    <>
      <Grid.Col span={6}>
        <Select
          size="md"
          labelProps={{ fz: "sm", mb: 6, c: "dark" }}
          descriptionProps={{ fz: 12 }}
          errorProps={{ fz: "xs" }}
          data={lookups.countries}
          required
          label="Country"
          clearable
          searchable
          placeholder="Select country"
          {...form.getInputProps("address.country")}
          onChange={(value) => {
            form.setFieldValue("address.country", value!);
            form.setFieldValue("address.city", "");
          }}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Select
          size="md"
          labelProps={{ fz: "sm", mb: 6, c: "dark" }}
          descriptionProps={{ fz: 12 }}
          errorProps={{ fz: "xs" }}
          clearable
          searchable
          data={filteredCities}
          required
          label="City"
          placeholder="Select city"
          {...form.getInputProps("address.city")}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label="Street"
          placeholder="Enter street details"
          {...form.getInputProps("address.street")}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          label="Postal Code"
          placeholder="Enter postal code"
          {...form.getInputProps("address.postalCode")}
        />
      </Grid.Col>
    </>
  );
};

export default AddressSection;
