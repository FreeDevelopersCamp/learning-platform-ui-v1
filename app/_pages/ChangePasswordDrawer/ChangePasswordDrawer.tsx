import { IconDeviceFloppy } from "@tabler/icons-react";
import { DrawerProps, Group, Text, rem } from "@mantine/core";
import { PropsWithChildren } from "react";
import {
  IS_DRAWER_OPENED_SEARCH_PARAM_KEY,
  SELECTED_ITEM_SEARCH_PARAM_KEY,
  initialValues,
} from "./constants";
import { useQueryClient } from "@tanstack/react-query";
import { z as zod } from "zod";
import { DrawerAction, ChangePasswordForm } from "./types";
import { useForm, zodResolver } from "@mantine/form";
import { voidFunction } from "@/utils/functions";
import { ResourceUserDto } from "@/apis/core/User/types";
import Form from "./components/Form";
import useModals from "@/hooks/useModals";
import toasts from "@/utils/toasts";
import Drawer from "@/components/Drawer";
import useSearch from "@/hooks/useSearch";
import Button from "@/components/Button";
import useChangePassword from "./hooks/useChangePassword";
import useGetUser from "@/apis/core/User/hooks/useGetUser";

interface Props extends Partial<DrawerProps> {
  selectedUser?: ResourceUserDto;
  onUserChange?: (user?: ResourceUserDto) => void;
}

const StockDrawer = ({ children, ...rest }: PropsWithChildren<Props>) => {
  const queryClient = useQueryClient();

  const { searchParams, removeParams } = useSearch();
  const { showConfirm, showExitWarning } = useModals();

  const isDrawerOpened = !!searchParams.get(IS_DRAWER_OPENED_SEARCH_PARAM_KEY);

  const selectedItem = searchParams.get(SELECTED_ITEM_SEARCH_PARAM_KEY);

  const schema = zod.object({});

  const { data: selectedUser, isFetching: isFetchingSelectedUser } = useGetUser(
    {
      id: selectedItem!,
      config: {
        enabled: !!selectedItem,
      },
    }
  );

  const form = useForm<ChangePasswordForm>({
    initialValues,
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  });

  const handleCloseDrawer = async (action: DrawerAction = "default") => {
    form.reset();

    await queryClient.invalidateQueries({
      queryKey: ["user", "list"],
    });

    if (action === "default") {
      await queryClient.invalidateQueries({
        queryKey: ["user", "get", selectedItem],
      });
    }

    rest.onClose?.();
    removeParams([
      IS_DRAWER_OPENED_SEARCH_PARAM_KEY,
      SELECTED_ITEM_SEARCH_PARAM_KEY,
      "activeTab",
    ]);
  };

  const handleConfrimCloseDrawer = () => {
    if (form.isDirty() && form.isTouched()) {
      showExitWarning(handleCloseDrawer);
      return;
    }
    handleCloseDrawer();
  };

  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword({
      config: {
        onSuccess: async () => {
          toasts.showSuccessToast({
            id: "changing-password",
            message: `Successfully changed password`,
          });
          await handleCloseDrawer();
        },
      },
    });

  const handleConfirmChangePassword = (values: ChangePasswordForm) =>
    changePassword({
      ...values,
      userName: selectedUser?.userName || "",
    });

  const handleChangePassword = form.onSubmit((values) => {
    showConfirm({
      title: <Text fw="bolder">Alert</Text>,
      children: (
        <Text fz="sm" c="dimmed" mb="xl">
          Continue to change {selectedUser?.userName} password!
        </Text>
      ),
      labels: {
        confirm: "Change",
      },
      onConfirm: () => handleConfirmChangePassword(values),
    });
  });

  const handleAction = selectedItem ? handleChangePassword : voidFunction;

  return (
    <Drawer
      openInModal
      opened={isDrawerOpened}
      onClose={handleConfrimCloseDrawer}
      title={
        selectedItem
          ? `Modify ${selectedUser?.personalInformation.name.first} Password`
          : "Select user"
      }
      size="md"
      isLoading={isChangingPassword || isFetchingSelectedUser}
      keepMounted={false}
      withOpenInDialogButton={false}
      withFullScreenButton={false}
      actions={
        <Group justify="space-between">
          <Button
            variant="gradient"
            size="compact-md"
            loading={isChangingPassword || isFetchingSelectedUser}
            disabled={
              !form.isDirty() ||
              !form.isTouched() ||
              !form.isValid() ||
              !selectedItem ||
              !selectedUser
            }
            onClick={() => handleAction()}
            leftSection={
              <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} />
            }
          >
            {selectedUser ? "Change" : "Select User"}
          </Button>
        </Group>
      }
      {...rest}
    >
      <Form form={form} />
    </Drawer>
  );
};

export default StockDrawer;
