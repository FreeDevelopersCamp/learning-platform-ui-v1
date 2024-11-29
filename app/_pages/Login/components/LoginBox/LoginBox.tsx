import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import PasswordInput from "@/components/PasswordInput";
import TextInput from "@/components/TextInput";
import Title from "@/components/Title";
import useTranslator from "@/hooks/useTranslator";
import { useUserContext } from "@/contexts/UserContext";
import {
  Alert,
  Badge,
  Checkbox,
  Dialog,
  Group,
  Select,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import {
  IconClockShield,
  IconInfoCircle,
  IconLock,
  IconLogin2,
  IconMail,
} from "@tabler/icons-react";
import { z as zod } from "zod";
import { UserLoginForm } from "../../types";
import { initialValues, users } from "../../constant";
import { exctractErrorBody } from "@/utils/error";

const LoginBox = () => {
  const { t } = useTranslator();

  const {
    handleLogin,
    isSigninInUsingEmail,
    isSessionExpired,
    logginingError,
  } = useUserContext();

  const schema = zod.object({
    userName: zod
      .string()
      .min(3, { message: t("loginBoxEmailFieldValidation") }),
    password: zod.string().min(2, {
      message: t("loginBoxPasswordFieldValidation"),
    }),
  });

  const form = useForm<UserLoginForm>({
    name: "login",
    initialValues,
    validate: zodResolver(schema),
  });

  const handleSubmit = form.onSubmit((values) => {
    handleLogin({
      userName: values.userName,
      password: values.password,
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={0} p={0}>
        <Group justify="center" align="center">
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
            alt="no image here"
            size="xl"
          />
        </Group>
        <Space h="lg" />
        <Text ta="center">{t("loginBoxTitle")}</Text>
        <Title order={3} ta="center" tt="uppercase" c="blue">
          Trade Flow🚀
        </Title>
        <Space h="lg" />
        <TextInput
          radius="md"
          label={t("loginBoxEmailFieldLabel")}
          placeholder={t("loginBoxEmailFieldPlaceholder")}
          size="md"
          leftSection={<IconMail size={20} />}
          disabled={isSigninInUsingEmail}
          {...form.getInputProps("userName")}
        />
        <Space h="xs" />

        <PasswordInput
          radius="md"
          label={t("loginBoxPasswordFieldLabel")}
          placeholder={t("loginBoxPasswordFieldPlaceholder")}
          size="md"
          leftSection={<IconLock size={20} />}
          disabled={isSigninInUsingEmail}
          {...form.getInputProps("password")}
        />
        <Space h="md" />
        <Space h="md" />
        <Checkbox
          label={t("loginBoxCheckboxLabel")}
          size="sm"
          radius="sm"
          c="dimmed"
          disabled={isSigninInUsingEmail}
          {...form.getInputProps("isKeepLoggedIn")}
        />
        <Space h="md" />

        <Button
          fullWidth
          size="md"
          radius="md"
          variant="gradient"
          fz="md"
          fw="bolder"
          type="submit"
          disabled={!form.isDirty() || !form.isTouched() || !form.isValid()}
          loading={isSigninInUsingEmail}
          leftSection={<IconLogin2 />}
        >
          {t("loginBoxLoginButtonTitle")}
        </Button>
        <Space h="lg" />

        {logginingError && !isSigninInUsingEmail && (
          <Alert
            variant="light"
            color="red"
            radius="md"
            icon={<IconInfoCircle />}
            title={exctractErrorBody(logginingError)?.message}
          />
        )}
        <Space h="lg" />

        {isSessionExpired && (
          <Alert
            variant="light"
            color="blue"
            radius="md"
            icon={<IconClockShield />}
            title={t("yourSessionExpired")}
          />
        )}
        <Space h="lg" />

        <Dialog opened={true} withBorder size="lg" radius="md">
          <Stack>
            <Group justify="space-between">
              <Title c="gray" order={5}>
                Login as
              </Title>
              <Badge variant="light" color="orange">
                For Developers
              </Badge>
            </Group>

            <Group>
              <Select
                data={users.map((user) => ({
                  ...user,
                  value: user.userName,
                  label: user.label,
                }))}
                value={form.values.userName}
                onChange={(username) =>
                  form.setFieldValue("userName", username!)
                }
                variant="filled"
                flex={1}
              />
              <Button
                fullWidth
                size="md"
                radius="md"
                variant="gradient"
                fz="md"
                fw="bolder"
                type="submit"
                disabled={
                  !form.isDirty() || !form.isTouched() || !form.isValid()
                }
                loading={isSigninInUsingEmail}
                leftSection={<IconLogin2 />}
                onClick={() => handleSubmit()}
              >
                {t("loginBoxLoginButtonTitle")}
              </Button>
            </Group>
          </Stack>
        </Dialog>
      </Stack>
    </form>
  );
};
export default LoginBox;
