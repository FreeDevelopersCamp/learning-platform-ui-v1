import {
  IconAB2,
  IconBuilding,
  IconBuildingStore,
  IconBuildingWarehouse,
  IconCategory,
  IconHome,
  IconHomePlus,
  IconInvoice,
  IconPackages,
  IconUsers,
} from "@tabler/icons-react";
import { NavbarLink } from "./types";

export const overviewGroupLinks: NavbarLink[] = [
  {
    label: {
      en: "Dashboard",
    },
    href: "/",
    Icon: IconHome,
    description: {
      en: "Provides an overview of key metrics and performance indicators",
    },
  },
];

export const overviewGroup: NavbarLink = {
  ...overviewGroupLinks[0],
  label: {
    en: "Overview",
  },
  children: overviewGroupLinks,
};

export const teamGroupLinks: NavbarLink[] = [
  {
    label: {
      en: "Companies",
    },
    href: "/companies",
    Icon: IconBuilding,
    description: {
      en: "Complete this",
    },
  },
  {
    label: {
      en: "Retailers",
    },
    href: "/retailers",
    Icon: IconBuildingStore,
    description: {
      en: "Complete this",
    },
  },
  {
    label: {
      en: "Suppliers",
    },
    href: "/suppliers",
    Icon: IconHomePlus,
    description: {
      en: "Complete this",
    },
  },
  {
    label: {
      en: "Warehouses",
    },
    href: "/warehouses",
    Icon: IconBuildingWarehouse,
    description: {
      en: "Complete this",
    },
  },
];

export const teamGroup: NavbarLink = {
  ...teamGroupLinks[0],
  label: {
    en: "Team",
  },
  children: teamGroupLinks,
};

export const usersGroupLinks: NavbarLink[] = [
  {
    label: {
      en: "Users",
    },
    href: "/users",
    Icon: IconUsers,
    description: {
      en: "Allows administrators to manage user accounts and permissions.",
    },
  },
  {
    label: {
      en: "Orders",
    },
    href: "/orders",
    Icon: IconInvoice,
    description: {
      en: "Centralized view of all customer orders and order statuses. Provides real-time insights into order fulfillment, pending orders, and order history.",
    },
  },
];

export const usersGroup: NavbarLink = {
  ...usersGroupLinks[0],
  label: {
    en: "Management",
  },
  children: usersGroupLinks,
};

export const stockGroupLinks: NavbarLink[] = [
  {
    label: {
      en: "Stocks",
    },
    href: "/stocks",
    Icon: IconAB2,
    description: {
      en: "Allows admin to easily manage stocks.",
    },
  },
  {
    label: {
      en: "Products",
    },
    href: "/products",
    Icon: IconPackages,
    description: {
      en: "Allows admin to easily manage stock.",
    },
  },
  {
    label: {
      en: "Categories",
    },
    href: "/categories",
    Icon: IconCategory,
    description: {
      en: "Allows admin to easily manage products categories.",
    },
  },
];

export const stockGroup: NavbarLink = {
  ...stockGroupLinks[0],
  label: {
    en: "Stock",
  },
  children: stockGroupLinks,
};

export const navbarLinks = [overviewGroup, usersGroup, teamGroup, stockGroup];

export const navbarLinksWithChildrens = [
  overviewGroup,
  ...overviewGroupLinks,

  stockGroup,
  ...stockGroupLinks,
  teamGroup,
  ...teamGroupLinks,
  usersGroup,
  ...usersGroupLinks,
];

export const USER_CHATS_MENU_SEARCH_PARAM_KEY = "isUserChatsMenuOpened";
