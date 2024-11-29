import { Login, Token } from "@/apis/auth/Auth/types";
import { ResourceUserDto } from "@/apis/core/User/types";
import { SetState } from "@/types/states";
import { UseQueryResult } from "@tanstack/react-query";
import { JwtPayload as JwtPayloadBase } from "jwt-decode";

export interface JwtPayload extends JwtPayloadBase {
  username: string;
  roles: number[];
  menu: [];
  userId: string;
  tenancyId: string;
}
export interface UserContextData {
  user?: JwtPayload;
  userQuery?: UseQueryResult<ResourceUserDto, Error>;
  authToken?: Token;
  setUser: SetState<JwtPayload | undefined>;

  logginingError?: Error | null;

  redirectTo?: string;
  setRedirectTo: SetState<string | undefined>;

  isSessionExpired: boolean;
  setSessionExpired: SetState<boolean>;

  handleLogin: (params: Login) => void;
  handleLogout?: VoidFunction;

  isSigninInUsingEmail?: boolean;
  isSigninOut?: boolean;
}

export interface UserProviderProps {}
