import { Grid } from "@mantine/core";
import { Form as BaseForm } from "@/types/mantine";
import { ChangePasswordForm } from "../../types";
import { ResourceStockDto } from "@/apis/supplyChain/Stock/types";
import { IconLock } from "@tabler/icons-react";
import PasswordInput from "@/components/PasswordInput";
import PasswordStrengthInput from "@/pages/Users/UserDrawer/components/FormTabs/PasswordStrengthInput";

interface Props {
  form: BaseForm<ChangePasswordForm>;
  selectedItem?: ResourceStockDto;
}

const Form = ({ form, selectedItem }: Props) => {
  return (
    <Grid p="lg">
      <Grid.Col span={12}>
        <PasswordInput
          radius="md"
          label="Old Password"
          placeholder="Write the old password here"
          size="md"
          required
          leftSection={<IconLock size={20} />}
          {...form.getInputProps("oldPassword")}
        />
      </Grid.Col>
      <Grid.Col span={12}>
        <PasswordStrengthInput
          radius="md"
          label="New Password"
          placeholder="Write the old password here"
          size="md"
          leftSection={<IconLock size={20} />}
          value={form.values.newPassword}
          showBars
          showHints={!!form.values.newPassword}
          {...form.getInputProps("newPassword")}
        />
      </Grid.Col>
    </Grid>
  );
};

export default Form;
