import { useContext } from "react";
import { UserContextData } from "./types";
import UserContext from "./UserContext";

function useUserContext(): UserContextData {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
}

export default useUserContext;
