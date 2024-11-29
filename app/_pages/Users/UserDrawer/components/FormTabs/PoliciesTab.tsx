import Title from "@/components/Title";
import { Alert, Grid } from "@mantine/core";
import { Form } from "@/types/mantine";
import { UserForm } from "../../types";
import { ResourceUserDto } from "@/apis/core/User/types";
import { IconInfoCircle } from "@tabler/icons-react";

interface Props {
  form: Form<UserForm>;
  selectedItem?: ResourceUserDto;
}

const PoliciesTab = ({}: Props) => {
  return (
    <Grid px="lg">
      <Grid.Col span={12}></Grid.Col>
      <Grid.Col span={12}>
        <Title order={5}>Policies</Title>
      </Grid.Col>

      <Grid.Col span={12}>
        <Alert
          variant="light"
          color="blue"
          title="Alert title"
          icon={<IconInfoCircle />}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis,
          quae tempore necessitatibus placeat saepe.
        </Alert>
      </Grid.Col>
      <Grid.Col span={12}></Grid.Col>
    </Grid>
  );
};

export default PoliciesTab;
