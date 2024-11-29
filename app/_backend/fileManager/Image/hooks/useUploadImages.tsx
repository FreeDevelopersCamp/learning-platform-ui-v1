import React from "react";
import imageClient from "..";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import toasts from "@/utils/toasts";
import { exctractErrorBody } from "@/utils/error";
import { ResourceImageDto } from "../types";

const uploadFiles = ({ files }: { files: File[] }): Promise<string[]> => {
  const uploadingPromises = files.map((file) => {
    return new Promise<string>((resolve) => {
      imageClient
        .uploadFile({
          file,
        })
        .then((data: ResourceImageDto) => resolve(data.path));
    });
  });

  return Promise.all(uploadingPromises);
};

interface Props {
  config?: UseMutationOptions<
    string[],
    Error,
    {
      files: File[];
    }
  >;
}

const useUploadImages = ({ config }: Props) => {
  return useMutation({
    mutationKey: ["images", "list", "upload"],
    mutationFn: uploadFiles,
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

export default useUploadImages;
