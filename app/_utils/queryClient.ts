import { localStorageKeys } from "@/hooks/constants";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import toasts from "./toasts";
import { exctractErrorBody } from "./error";
import { Token } from "@/apis/auth/Auth/types";

export function getToken() {
  const tokenString = localStorage.getItem(localStorageKeys.AUTH_TOKEN);
  const reponse = JSON.parse(tokenString || "{}") as Token;
  return reponse?.token;
}

export default new QueryClient({
  queryCache: new QueryCache({
    onError: (response) => {
      toasts.showErrorToast(
        {
          message: exctractErrorBody(response)?.message,
        },
        true
      );
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      enabled: !!getToken(),
      retry: 0,
    },
  },
});

localStorage.getItem(localStorageKeys.AUTH_TOKEN);
