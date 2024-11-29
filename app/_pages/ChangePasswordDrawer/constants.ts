import { ChangePasswordForm } from "./types";

export const IS_DRAWER_OPENED_SEARCH_PARAM_KEY = "isChangePasswordDrawerOpened";

export const SELECTED_ITEM_SEARCH_PARAM_KEY = "selectedUserToChangePassword";

export const initialValues: Required<ChangePasswordForm> = {
  userName: "",
  oldPassword: "",
  newPassword: "",
};
