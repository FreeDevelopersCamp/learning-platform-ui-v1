import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { exctractErrorBody } from "@/utils/error";
import { Token } from "@/apis/auth/Auth/types";
import toasts from "@/utils/toasts";
import AuthClient from "@/apis/auth/Auth";
import { ChangePasswordForm } from "../types";

interface Props {
  config?: UseMutationOptions<Token, Error, ChangePasswordForm>;
}

const useChangePassword = ({ config }: Props) => {
  return useMutation({
    mutationKey: ["users", "changePassword"],
    mutationFn: AuthClient.changePassword,
    onMutate: () => {
      toasts.showLoadingToast(
        {
          id: "changing-password",
          message: `Changing Password`,
        },
        true
      );
    },
    onError: (error) => {
      toasts.showErrorToast({
        id: "changing-password",
        title: exctractErrorBody(error)?.message,
        message: `Failed to change password`,
      });
    },
    ...config,
  });
};

export default useChangePassword;
