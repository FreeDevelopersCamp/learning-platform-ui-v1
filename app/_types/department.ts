import { ActionDetails } from "./states";
import { Employee, Manager } from "./user";

export interface Department extends ActionDetails {
  id: number;
  name: string;
  manager: Manager;
  employees: Employee[];
  location?: string;
  budget?: number;
}
