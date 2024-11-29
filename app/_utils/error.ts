import { AxiosError } from "axios";

export const exctractErrorBody = (error: Error | null) => {
  if (!error) return undefined;

  const errorResponse = error as AxiosError<{
    message?: string;
    statusCode?: number;
    timestamp?: string;
    path?: string;
  }>;

  return errorResponse.response?.data;
};
