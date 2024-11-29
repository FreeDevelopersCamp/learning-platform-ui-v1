import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { exctractErrorBody } from "@/utils/error";
import toasts from "@/utils/toasts";
import { ResourceImageDto } from "../types";
import imageClient from "..";

interface Props {
  config?: UseMutationOptions<
    ResourceImageDto,
    Error,
    {
      file: File;
    }
  >;
}

const useUploadImage = ({ config }: Props) => {
  return useMutation({
    mutationKey: ["image", "upload"],
    mutationFn: imageClient.uploadFile,
    onMutate: () => {
      toasts.showLoadingToast(
        {
          id: "uploading-image",
          message: `Uploading image`,
        },
        true
      );
    },
    onError: (error) => {
      toasts.showErrorToast({
        id: "uploading-image",
        title: exctractErrorBody(error)?.message,
        message: `Failed to upload image`,
      });
    },
    ...config,
  });
};

export default useUploadImage;
