import { LanguagesKeys } from "@/translations/types";
import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { To } from "react-router-dom";

export interface NavbarLink {
  label?: Record<LanguagesKeys, string>;
  description?: Record<LanguagesKeys, string>;
  href?: To;
  Icon?: ForwardRefExoticComponent<
    Omit<IconProps, "ref"> & RefAttributes<Icon>
  >;
  children?: NavbarLink[];
}
