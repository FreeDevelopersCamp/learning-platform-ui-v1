import { ActionDetails } from "./states";
import { Admin, Employee, Manager } from "./user";
import { Department } from "./department";
import { Address } from "./address";

export interface Company extends ActionDetails {
  id: number | string;
  name: string;
  address: Address;
  phoneNumber?: string;
  email?: string;
  website?: string;
  establishedYear?: number;
  employees?: Employee[];
  industry?: string;
  revenue?: number;
  description?: string;
  admin: Admin;
  manager: Manager;
  departments: Department[];
}
