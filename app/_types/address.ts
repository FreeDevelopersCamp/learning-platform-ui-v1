import { ActionDetails } from "./states";

export interface Address extends ActionDetails {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
