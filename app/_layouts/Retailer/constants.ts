import {
  IconInvoice,
  IconPackage,
  IconShoppingBag,
  IconUsers,
} from "@tabler/icons-react";
import { NavbarLink } from "./types";

export const menuGroupLinks: NavbarLink[] = [
  {
    label: {
      en: "Home",
    },
    href: "/retailer",
    Icon: IconUsers,
    description: {
      en: "Allows administrators to manage user accounts and permissions.",
    },
  },
  {
    label: {
      en: "Catalog",
    },
    href: "/retailer/catalog",
    Icon: IconPackage,
    description: {
      en: "Allows administrators to show catalog and products.",
    },
  },
  {
    label: {
      en: "Account",
    },
    href: "/retailer/account",
    Icon: IconInvoice,
    description: {
      en: "Centralized view of all customer orders and order statuses. Provides real-time insights into order fulfillment, pending orders, and order history.",
    },
  },
  {
    label: {
      en: "Checkout",
    },
    href: "/retailer/checkout",
    Icon: IconShoppingBag,
    description: {
      en: "Centralized view of all customer orders and order statuses. Provides real-time insights into order fulfillment, pending orders, and order history.",
    },
  },
  {
    label: {
      en: "Products",
    },
    href: "/retailer/products",
    Icon: IconShoppingBag,
    description: {
      en: "Centralized view of all customer orders and order statuses. Provides real-time insights into order fulfillment, pending orders, and order history.",
    },
  },
];

export const menuGroup: NavbarLink = {
  ...menuGroupLinks[0],
  label: {
    en: "Home",
  },
  children: menuGroupLinks,
};

export const navbarLinks = [menuGroupLinks];

export const navbarLinksWithChildrens = [menuGroupLinks, ...menuGroupLinks];

export const USER_CHATS_MENU_SEARCH_PARAM_KEY = "isUserChatsMenuOpened";
