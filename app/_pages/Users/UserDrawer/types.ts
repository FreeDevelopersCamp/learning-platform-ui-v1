import { CreateUserDto, Person } from "@/apis/auth/Auth/types";
import { UpdateUserDto } from "@/apis/core/User/types";
import { DateValue } from "@mantine/dates";

export type DrawerAction = "delete" | "create" | "update" | "default";

export interface UserForm
  extends Omit<CreateUserDto, "personalInformation" | "image"> {
  personalInformation: {
    dateOfBirth: DateValue | null;
  } & Omit<Person, "dateOfBirth">;
  brandManufacturer?: {
    brand: string;
    manufacturer: string;
  }[];

  image: File | null;
}

export interface UpdateUserForm
  extends Omit<UpdateUserDto, "personalInformation"> {
  personalInformation: {
    dateOfBirth: DateValue | null;
  } & Omit<Person, "dateOfBirth">;

  brandManufacturer?: {
    brand: string;
    manufacturer: string;
  }[];
}
