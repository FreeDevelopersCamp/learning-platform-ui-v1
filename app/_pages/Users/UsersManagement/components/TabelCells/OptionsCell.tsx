import { Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import {
  IS_USER_DRAWER_OPENED_SEARCH_PARAM_KEY,
  SELECTED_USER_SEARCH_PARAM_KEY,
} from "@/pages/Users/UserDrawer/constants";
import { ResourceUserDto } from "@/apis/core/User/types";
import useModals from "@/hooks/useModals";
import toasts from "@/utils/toasts";
import useDeleteUser from "@/apis/core/User/hooks/useDeleteUser";
import OptionsGroup from "@/components/OptionsGroup";
import useSearch from "@/hooks/useSearch";

interface Props {
  item: ResourceUserDto;
}
const OptionsCell = ({ item }: Props) => {
  const queryClient = useQueryClient();
  const { showWarning } = useModals();
  const { setParams } = useSearch();

  const { mutate: deleteUser, isPending: isDeletingUser } = useDeleteUser({
    config: {
      onSuccess: async () => {
        toasts.showSuccessToast({
          id: "updating-user",
          message: `Successfully deleted ${item?.userName} user`,
        });
        queryClient.invalidateQueries({
          queryKey: ["user", "list"],
        });
      },
    },
  });

  const handleConfirmDelete = (id: string) => {
    deleteUser(id);
  };

  const handleDeleteUser = (id: string) => {
    showWarning({
      title: <Text fw="bolder">Deleting {item.userName}</Text>,
      children: (
        <Text fz="sm" c="dimmed" mb="xl">
          Are you sure you want to delete {item.userName} user!
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

  const handleOpenUserDrawer = (id: string) => {
    setParams([
      { key: IS_USER_DRAWER_OPENED_SEARCH_PARAM_KEY, value: "true" },
      { key: SELECTED_USER_SEARCH_PARAM_KEY, value: id },
    ]);
  };

  return (
    <OptionsGroup
      isDeleting={isDeletingUser}
      navigateTo={`/users/view/${String(item?._id)}`}
      onDelete={() => handleDeleteUser(item._id)}
      onEdit={() => handleOpenUserDrawer(item._id)}
    />
  );
};

export default OptionsCell;
