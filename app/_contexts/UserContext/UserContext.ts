import { createContext } from "react";
import { UserContextData } from "./types";
import { defaultUserContextData } from "./constants";

const UserContext = createContext<UserContextData | undefined>(
  defaultUserContextData
);

export default UserContext;
