import { rem } from "@mantine/core";
import { NotificationData, notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const showErrorToast = (config: NotificationData, show: boolean = false) => {
  const action = show ? notifications.show : notifications.update;

  action({
    id: "default-toast",
    withCloseButton: true,
    color: "red",
    icon: <IconX style={{ width: rem(18), height: rem(18) }} />,
    loading: false,
    autoClose: 8000,
    withBorder: true,
    ...config,
  });
};

const showSuccessToast = (config: NotificationData, show: boolean = false) => {
  const action = show ? notifications.show : notifications.update;

  action({
    id: "default-toast",
    withCloseButton: true,
    color: "green",
    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
    loading: false,
    autoClose: 4000,
    ...config,
  });
};

const showLoadingToast = (config: NotificationData, show: boolean = true) => {
  const action = show ? notifications.show : notifications.update;

  action({
    id: "default-toast",
    withCloseButton: true,
    autoClose: false,
    loading: true,
    ...config,
  });
};

const toasts = {
  showErrorToast,
  showSuccessToast,
  showLoadingToast,
};
export default toasts;
