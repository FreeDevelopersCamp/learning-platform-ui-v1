import { useContext } from "react";
import { LookupContextData } from "./types";
import LookupContext from "./LookupContext";

function useLookupContext(): LookupContextData {
  const context = useContext(LookupContext);

  if (!context) {
    throw new Error(
      "useLookupContext must be used within a LookupContextProvider"
    );
  }

  return context;
}

export default useLookupContext;
