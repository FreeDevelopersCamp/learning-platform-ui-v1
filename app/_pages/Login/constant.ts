import { UserLoginForm } from "./types";

export const initialValues: UserLoginForm = {
  userName: "",
  password: "Admin@1234",
};

export const users = [
  {
    userName: "yazan",
    roles: [1, 2, 3, 4, 5, 6, 7, 0],
    label: "Admin - System Owner",
  },
  {
    userName: "fatima_ali",
    label: "Account Manager",

    roles: [2],
  },
  {
    userName: "rami_ahmad",
    label: "Sales Manager",

    roles: [3],
  },
  {
    userName: "amira_hussein",
    label: "Logistics Manager",

    roles: [4],
  },
  {
    userName: "khalid_omar",
    label: "Manager",

    roles: [5],
  },
  {
    userName: "salma_mustafa",
    label: "Supplier",

    roles: [6],
  },
  {
    userName: "a7mad",
    label: "Retailer ",

    roles: [7],
  },
];
