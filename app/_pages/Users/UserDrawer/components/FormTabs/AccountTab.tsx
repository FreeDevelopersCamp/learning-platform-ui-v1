import {
  ActionIcon,
  Alert,
  FileButton,
  Grid,
  Group,
  Indicator,
  Radio,
  Select,
  Text,
  rem,
} from "@mantine/core";
import { t } from "i18next";
import { DatePickerInput } from "@mantine/dates";
import { useLookupContext } from "@/contexts/LookupContext";
import { camelToPascalWithSpaces } from "@/utils/text";
import { Form } from "@/types/mantine";
import { UserForm } from "../../types";
import { ResourceUserDto } from "@/apis/core/User/types";
import {
  IconAlertTriangle,
  IconAt,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import Button from "@/components/Button";
import useSearch from "@/hooks/useSearch";
import {
  IS_DRAWER_OPENED_SEARCH_PARAM_KEY,
  SELECTED_ITEM_SEARCH_PARAM_KEY,
} from "@/pages/ChangePasswordDrawer/constants";
import useCompaniesList from "@/apis/supplyChain/Company/hooks/useCompaniesList";
import MultiSelect from "@/components/MultiSelect";
import TextInput from "@/components/TextInput";
import Title from "@/components/Title";
import PasswordStrengthInput from "./PasswordStrengthInput";
import RolesSection from "./RolesSection";
import Image from "@/components/Image";

interface Props {
  form: Form<UserForm>;
  selectedItem?: ResourceUserDto;
  isUploadingImage: boolean;
}

const AccountTab = ({ form, selectedItem, isUploadingImage }: Props) => {
  const { lookups, isLoadingLookups } = useLookupContext();
  const { setParams } = useSearch();

  const { data: comapnies, isFetching: isLoadingCompanies } =
    useCompaniesList();

  const handleChangeUserPassword = (id?: string) => {
    setParams([
      { key: SELECTED_ITEM_SEARCH_PARAM_KEY, value: String(id) },
      { key: IS_DRAWER_OPENED_SEARCH_PARAM_KEY, value: "true" },
    ]);
  };

  return (
    <Grid p="lg">
      <Grid.Col span={12}>
        <Title order={5}>Photo</Title>
      </Grid.Col>
      <Grid.Col span={12}>
        <Indicator
          inline
          size={32}
          offset={16}
          position="bottom-end"
          color="blue.5"
          withBorder
          disabled={!selectedItem?.image && !form.values.image}
          label={<IconPencil size={16} />}
        >
          <FileButton
            {...form.getInputProps("image")}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <ActionIcon
                {...props}
                variant="default"
                size={128}
                radius={64}
                loading={isUploadingImage}
              >
                {form.values.image || selectedItem?.image ? (
                  <Image
                    src={
                      form.values.image
                        ? URL.createObjectURL(form.values?.image || null)
                        : selectedItem?.image
                    }
                  />
                ) : (
                  <IconPlus />
                )}
              </ActionIcon>
            )}
          </FileButton>
        </Indicator>
      </Grid.Col>
      <Grid.Col span={12}></Grid.Col>
      <Grid.Col span={12}>
        <Title order={5}>User Info</Title>
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          label={t("First Name")}
          required
          placeholder="Write user first name"
          {...form.getInputProps("personalInformation.name.first")}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          label={t("Second")}
          required
          placeholder="Write user second name"
          {...form.getInputProps("personalInformation.name.second")}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <TextInput
          label={t("Third")}
          required
          placeholder="Write user third name"
          {...form.getInputProps("personalInformation.name.third")}
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <TextInput
          label={t("Last")}
          required
          placeholder="Write user last name"
          {...form.getInputProps("personalInformation.name.last")}
        />
      </Grid.Col>
      <Grid.Col span={12}></Grid.Col>
      <Grid.Col span={12}>
        <Radio.Group
          size="md"
          required
          labelProps={{ fz: "sm", mb: 3, c: "dark" }}
          descriptionProps={{ fz: 12 }}
          errorProps={{ fz: "xs" }}
          label="Gender"
          {...form.getInputProps("personalInformation.gender")}
        >
          <Group>
            {lookups.gender.map((l) => (
              <Radio
                key={l?.id}
                value={l.id}
                label={camelToPascalWithSpaces(l.label)}
              />
            ))}
          </Group>
        </Radio.Group>
      </Grid.Col>
      <Grid.Col span={12}></Grid.Col>

      <Grid.Col span={12}>
        <DatePickerInput
          size="md"
          required
          labelProps={{ fz: "sm", mb: 3, c: "dark" }}
          descriptionProps={{ fz: 12 }}
          errorProps={{ fz: "xs" }}
          valueFormat="DD/MM/YYYY"
          placeholder="15-06-1994"
          label="Date of birth"
          {...form.getInputProps("personalInformation.dateOfBirth")}
        />
      </Grid.Col>

      <Grid.Col span={12}></Grid.Col>
      <Grid.Col span={12}></Grid.Col>

      <RolesSection form={form} />

      {(form.values.roles.includes(6) || form.values.roles.includes(7)) && (
        <Grid.Col span={6}>
          <Select
            size="md"
            labelProps={{ fz: "sm", mb: 6, c: "dark" }}
            descriptionProps={{ fz: 12 }}
            errorProps={{ fz: "xs" }}
            data={
              comapnies?.map((c) => ({ ...c, value: c._id, label: c.name })) ||
              []
            }
            disabled={isLoadingCompanies}
            required
            label="Company"
            clearable
            searchable
            placeholder="Select company"
            {...form.getInputProps("companyId")}
          />
        </Grid.Col>
      )}
      {form.values.roles.includes(6) && (
        <Grid.Col span={6}>
          <MultiSelect
            hidePickedOptions
            valueKey="value"
            labelKey="label"
            options={lookups.brands}
            required
            disabled={isLoadingLookups}
            label="Brand Manufacturer"
            showMaxSelectedHint={false}
            selectedItemsIds={
              form.values?.brandManufacturer?.map((b) => b.brand) || []
            }
            onValuesChange={(values) => {
              const formattedValues = values?.map((v) => {
                const brand = lookups.brands.find((b) => b.id === v);
                return {
                  brand: brand?.id,
                  manufacturer: brand?.parent.value,
                };
              });
              form.getInputProps("brandManufacturer").onChange(formattedValues);
            }}
          />
        </Grid.Col>
      )}
      <Grid.Col span={12}></Grid.Col>
      <Grid.Col span={12}>
        <Title order={5}>Account</Title>
      </Grid.Col>
      {!!selectedItem && (
        <Grid.Col span={12}>
          <Alert
            variant="outline"
            color="orange"
            title="You can't update account information"
            icon={<IconAlertTriangle />}
          >
            <Group gap={2}>
              <Text fz="xs">To update user password</Text>
              <Button
                variant="subtle"
                size="compact-xs"
                fz="xs"
                color="orange.4"
                onClick={() => handleChangeUserPassword(selectedItem?._id)}
              >
                Change Password
              </Button>
              <Text fz="xs">here or password call 1700 100 100</Text>
            </Group>
          </Alert>
        </Grid.Col>
      )}
      <Grid.Col span={6}>
        <TextInput
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          placeholder="Write username"
          label="Username"
          disabled={!!selectedItem}
          {...form.getInputProps("userName")}
        />
      </Grid.Col>

      {/* You must add request validation on ppassword field */}
      <Grid.Col span={6}>
        <PasswordStrengthInput
          placeholder="Write strong password"
          showHints={!!form.values.password?.length && !selectedItem}
          showBars={!selectedItem}
          value={form.values.password || ""}
          disabled={!!selectedItem}
          {...form.getInputProps("password")}
        />
      </Grid.Col>
    </Grid>
  );
};

export default AccountTab;
