import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { DrawerProps, Group, Text, rem } from "@mantine/core";
import { PropsWithChildren, useEffect } from "react";
import {
  IS_USER_DRAWER_OPENED_SEARCH_PARAM_KEY,
  SELECTED_USER_SEARCH_PARAM_KEY,
  userFormInitialValues,
} from "./constants";
import { ResourceUserDto, UpdateUserDto } from "@/apis/core/User/types";
import { useQueryClient } from "@tanstack/react-query";
import { DrawerAction, UserForm } from "./types";
import { useForm, zodResolver } from "@mantine/form";
import { createUserDtoSchema, updateUserDtoSchema } from "./schema";
import useGetUser from "@/apis/core/User/hooks/useGetUser";
import useModals from "@/hooks/useModals";
import useCreateUser from "../../../apis/core/User/hooks/useCreateUser";
import toasts from "@/utils/toasts";
import useUpdateUser from "../../../apis/core/User/hooks/useUpdateUser";
import dayjs from "dayjs";
import ChangePasswordDrawer from "@/pages/ChangePasswordDrawer";
import Drawer from "@/components/Drawer";
import useSearch from "@/hooks/useSearch";
import FormTabs from "./components/FormTabs";
import Button from "@/components/Button";
import useDeleteUser from "@/apis/core/User/hooks/useDeleteUser";
import useShowFormErrors from "@/hooks/useShowFormErrors";
import useUploadImage from "@/apis/fileManager/Image/hooks/useUploadImage";

interface Props extends Partial<DrawerProps> {
  selectedUser?: ResourceUserDto;
  onUserChange?: (user?: ResourceUserDto) => void;
}

const UserDrawer = ({ children, ...rest }: PropsWithChildren<Props>) => {
  const queryClient = useQueryClient();

  const { searchParams, removeParams } = useSearch();
  const { showWarning, showConfirm, showExitWarning } = useModals();

  const isUserDrawerOpened = !!searchParams.get(
    IS_USER_DRAWER_OPENED_SEARCH_PARAM_KEY
  );

  const selectedItem = searchParams.get(SELECTED_USER_SEARCH_PARAM_KEY);

  const form = useForm<UserForm>({
    initialValues: userFormInitialValues,
    validate: zodResolver(
      selectedItem ? updateUserDtoSchema : createUserDtoSchema
    ),
    validateInputOnBlur: true,
  });

  useShowFormErrors({ form });

  const {
    data: fetchedSelectedItem,
    isFetching,
    isSuccess,
  } = useGetUser({
    id: selectedItem,
    config: {
      enabled: !!selectedItem,
    },
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
      IS_USER_DRAWER_OPENED_SEARCH_PARAM_KEY,
      SELECTED_USER_SEARCH_PARAM_KEY,
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

  const { mutate: create, isPending: isCreating } = useCreateUser({
    config: {
      onSuccess: async () => {
        toasts.showSuccessToast({
          id: "creating-user",
          message: `Successfully created user`,
        });
        await handleCloseDrawer();
      },
    },
  });

  const { mutate: update, isPending: isUpdating } = useUpdateUser({
    config: {
      onSuccess: async (data) => {
        toasts.showSuccessToast({
          id: "updating-user",
          message: `Successfully updated ${data.userName} user`,
        });
        await handleCloseDrawer();
      },
    },
  });

  const { mutate: remove, isPending: isDeleting } = useDeleteUser({
    config: {
      onSuccess: async () => {
        toasts.showSuccessToast({
          id: "updating-user",
          message: `Successfully deleted ${fetchedSelectedItem?.userName} user`,
        });
        await handleCloseDrawer("delete");
      },
    },
  });

  const { mutate: upload, isPending: isUploadingImage } = useUploadImage({
    config: {
      onSuccess: async (data) => {
        toasts.showSuccessToast({
          id: "uploading-image",
          message: `Successfully uploaded image`,
        });

        const formattedUser = {
          ...fetchedSelectedItem,
          ...form.values,
        } as Partial<UserForm>;
        delete formattedUser.password;
        delete formattedUser.userName;

        selectedItem
          ? update({
              ...formattedUser,
              _id: fetchedSelectedItem?._id,
              roles: formattedUser?.roles?.map((r) => Number(r)) || [],
              personalInformation: {
                ...formattedUser.personalInformation,
                dateOfBirth:
                  formattedUser.personalInformation?.dateOfBirth?.toISOString() ||
                  "",
              },
              image: data.path,
            } as UpdateUserDto)
          : create({
              ...form.values,
              roles: form.values?.roles.map((r) => Number(r)) || [],
              personalInformation: {
                ...form.values.personalInformation,
                dateOfBirth:
                  form.values.personalInformation.dateOfBirth?.toISOString() ||
                  "",
              },
              image: data.path,
            });
      },
    },
  });

  const handleConfirmDelete = (id: string) => {
    remove(id);
  };

  const handleConfirmCreate = (values: UserForm) => {
    if (form.values.image) {
      return upload({
        file: values.image!,
      });
    }

    create({
      ...values,
      roles: values?.roles.map((r) => Number(r)) || [],
      personalInformation: {
        ...values.personalInformation,
        dateOfBirth:
          values.personalInformation.dateOfBirth?.toISOString() || "",
      },
      image: "",
    });
  };

  const handleConfirmUpdate = (values: UserForm) => {
    if (!fetchedSelectedItem) return;

    if (!!form.values.image) {
      return upload({
        file: values.image!,
      });
    }

    const formattedUser = {
      ...fetchedSelectedItem,
      ...values,
    } as Partial<UserForm>;
    delete formattedUser.password;
    delete formattedUser.userName;

    update({
      ...formattedUser,
      _id: fetchedSelectedItem._id,
      roles: formattedUser?.roles?.map((r) => Number(r)) || [],
      personalInformation: {
        ...formattedUser.personalInformation,
        dateOfBirth:
          formattedUser.personalInformation?.dateOfBirth?.toISOString() || "",
      },
      image: fetchedSelectedItem.image,
    } as UpdateUserDto);
  };

  const handleDelete = (id: string) => {
    showWarning({
      title: <Text fw="bolder">Deleting {fetchedSelectedItem?.userName}</Text>,
      children: (
        <Text fz="sm" c="dimmed" mb="xl">
          Are you sure you want to delete {fetchedSelectedItem?.userName}
          user!
        </Text>
      ),
      labels: {
        confirm: "Delete",
      },
      onConfirm: () => {
        handleConfirmDelete(id);
      },
    });
  };

  const handleCreate = form.onSubmit((values) => {
    showConfirm({
      title: <Text fw="bolder">Creating {values?.userName}</Text>,
      children: (
        <Text fz="sm" c="dimmed" mb="xl">
          Continue to create {values?.userName} user!
        </Text>
      ),
      labels: {
        confirm: "Create",
      },
      onConfirm: () => handleConfirmCreate(values),
    });
  });

  const handleUpdate = form.onSubmit((values) => {
    showConfirm({
      title: <Text fw="bolder">Updating {values?.userName}</Text>,
      children: (
        <Text fz="sm" c="dimmed" mb="xl">
          Continue to update {values?.userName} user!
        </Text>
      ),
      labels: {
        confirm: "Update",
      },
      onConfirm: () => handleConfirmUpdate(values),
    });
  });

  const handleAction = selectedItem ? handleUpdate : handleCreate;

  useEffect(() => {
    if (isSuccess && fetchedSelectedItem && selectedItem) {
      form.setValues({
        ...fetchedSelectedItem,
        roles: fetchedSelectedItem.roles.map((r) => Number(r)),
        personalInformation: {
          ...fetchedSelectedItem.personalInformation,
          dateOfBirth: !!fetchedSelectedItem.personalInformation.dateOfBirth
            ? dayjs(
                fetchedSelectedItem.personalInformation.dateOfBirth
              )?.toDate()
            : null,
        },
        image: null,
        companyId: fetchedSelectedItem?.company?._id,
      });
    } else {
      form.reset();
    }
  }, [fetchedSelectedItem]);

  return (
    <Drawer
      opened={isUserDrawerOpened}
      onClose={handleConfrimCloseDrawer}
      title={selectedItem ? "Modify User" : "Add User"}
      isLoading={isCreating || isDeleting || isUpdating || isFetching}
      withFullScreenButton={true}
      keepMounted={false}
      actions={
        <Group justify="space-between">
          {selectedItem && (
            <Button
              variant="subtle"
              color="gray"
              size="compact-md"
              loading={isDeleting}
              onClick={() => handleDelete(selectedItem!)}
              leftSection={
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
              }
            >
              Delete
            </Button>
          )}
          <Button
            variant="gradient"
            size="compact-md"
            loading={isCreating || isUpdating}
            disabled={!form.isDirty() || !form.isTouched()}
            onClick={() => handleAction()}
            leftSection={
              <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} />
            }
          >
            Save
          </Button>
        </Group>
      }
      {...rest}
    >
      <ChangePasswordDrawer />
      <FormTabs
        form={form}
        selectedItem={fetchedSelectedItem}
        isUploadingImage={isUploadingImage}
      />
    </Drawer>
  );
};

export default UserDrawer;
