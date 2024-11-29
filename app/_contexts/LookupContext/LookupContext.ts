import { createContext } from "react";
import { LookupContextData } from "./types";
import { defaultLookupContextData } from "./constants";

const LookupContext = createContext<LookupContextData | undefined>(
  defaultLookupContextData
);

export default LookupContext;
