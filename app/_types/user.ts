import { ActionDetails } from "./states";
import { Department } from "./department";

export interface User extends ActionDetails {
  id?: string | number;
  email?: string;
  username?: string;
  fullName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  birthDate?: string;
  photoURL?: string;
  avatar?: string;
  expirationTime?: number;
  job?: string;
  phoneNumber?: string;
}

export interface Employee extends User {
  firstName: string;
  lastName: string;
  position: string;
  email?: string;
  phoneNumber?: string;
}

export interface Admin extends User {
  username: string;
  password: string;
  email: string;
  role: string;
}

export interface Manager extends User {
  username: string;
  password: string;
  email: string;
  department?: Department;
  departmentName?: string;
}

export interface LoggedInResponse {
  token: string;
}
