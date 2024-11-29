import { JwtPayload, UserContextData } from "./types";
import { useState, useEffect } from "react";
import { nprogress } from "@mantine/nprogress";
import { Login, Token } from "@/apis/auth/Auth/types";
import { jwtDecode } from "jwt-decode";
import UserContext from "./UserContext";
import useAuthenticator from "@/hooks/useAuthenticator";
import useLocalStorage from "@/hooks/useLocalStorage";
import toasts from "@/utils/toasts";
import useTranslator from "@/hooks/useTranslator";
import useGetUser from "@/apis/core/User/hooks/useGetUser";

interface UserProviderProps {}

const UserProvider = ({
  children,
}: React.PropsWithChildren<UserProviderProps>) => {
  const { t } = useTranslator();

  const [user, setUser] = useState<JwtPayload | undefined>(undefined);
  const [redirectTo, setRedirectTo] = useState<string | undefined>(undefined);
  const [isSessionExpired, setSessionExpired] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<Token | undefined>();

  const localStorage = useLocalStorage();

  const [parsedUser, setLocalStorageUser, clearLocalStorageUser] =
    localStorage.user;

  const [
    parsedAuthToken,
    setLocalStorageAuthToken,
    clearLocalStorageAuthToken,
  ] = localStorage.authToken;

  const userQuery = useGetUser({
    id: user?.userId!,
    config: {
      enabled: !!user?.userId,
    },
  });

  const clearUserData = () => {
    clearLocalStorageUser();
    clearLocalStorageAuthToken();
    setRedirectTo(location.pathname);
    setUser(undefined);
    setAuthToken(undefined);
  };

  const storeUserData = (user: JwtPayload, loggedInResponse: Token) => {
    setLocalStorageUser(user);
    setLocalStorageAuthToken(loggedInResponse);
    setUser(user);
    setAuthToken(loggedInResponse);
    setRedirectTo(undefined);
  };

  const handleLoginSuccess = (loggedInResponse: Token) => {
    const decodedToken = jwtDecode(loggedInResponse.token) as JwtPayload;
    storeUserData(decodedToken, loggedInResponse);
    toasts.showSuccessToast(
      {
        id: "loggedInSuccessfully",
        title: t("loggedInSuccessfullyTitle"),
        message: t("loggedInSuccessfullyDescription"),
      },
      true
    );
    nprogress.complete();
    setSessionExpired(false);
    window.location.reload();
  };

  const handleLogoutSucess = () => {
    clearUserData();
    setSessionExpired(false);
  };
  const handleError = () => {
    nprogress.complete();
    clearUserData();
  };

  const { loginCall, logoutCall } = useAuthenticator({
    apiConfig: {
      login: {
        onError: handleError,
        onSuccess: handleLoginSuccess,
      },
      logout: {
        onError: handleError,
        onSuccess: handleLogoutSucess,
      },
    },
  });

  const {
    mutate: login,
    error: logginingError,
    isPending: isSigninInUsingEmail,
  } = loginCall;

  const handleLogin = (params: Login) => {
    nprogress.start();
    login(params);
  };

  const { mutate: logout, isPending: isSigninOut } = logoutCall;

  const handleLogout = () => {
    logout();
    handleLogoutSucess();
  };

  useEffect(() => {
    if (userQuery?.isFetching) return;
    if (!parsedUser) {
      clearUserData();
      setSessionExpired(false);
      return;
    }

    const expirationTime = parsedUser?.exp!;
    const currentTime = (new Date().getTime() + 1) / 1000;
    const isSessionExpired = expirationTime < currentTime;

    if (isSessionExpired) {
      clearUserData();
      setSessionExpired(true);
      return;
    }

    storeUserData(parsedUser, parsedAuthToken);
    setSessionExpired(false);
  }, []);

  const value: UserContextData = {
    user,
    userQuery,
    authToken,
    setUser,

    logginingError,
    redirectTo,
    setRedirectTo,

    isSessionExpired,
    setSessionExpired,

    handleLogin,
    handleLogout,

    isSigninInUsingEmail,
    isSigninOut,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
