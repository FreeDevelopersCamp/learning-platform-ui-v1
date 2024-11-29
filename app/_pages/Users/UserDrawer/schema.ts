import { z } from "zod";

const nameSchema = z.object({
  first: z.string().min(1, "Enter user first name").default(""),
  second: z.string().default(""),
  third: z.string().default(""),
  last: z.string().min(1, "Enter user last name").default(""),
});

const mobileSchema = z.object({
  provider: z.number().optional(),
  countryCode: z.string().optional(),
  mobile: z.string(),
});

const policySchema = z.object({
  name: z.string().max(20),
  permissions: z.array(z.string()),
});

const personSchema = z.object({
  name: nameSchema,
  gender: z.enum(["1", "2"]),
  dateOfBirth: z.date(),
});

const contactSchema = z.object({
  email: z.string().email(),
  mobile: mobileSchema,
  emergencyMobile: mobileSchema.optional(),
});

const addressSchema = z.object({
  country: z.string().default("0"),
  city: z.string().default("0"),
  street: z.string().default(""),
  postalCode: z.string().default(""),
});

export const createUserDtoSchema = z.object({
  roles: z.array(z.number()),
  policies: z.array(policySchema).optional(),
  personalInformation: personSchema,
  contacts: contactSchema,
  address: addressSchema,
  userName: z.string().min(5).max(20),
  password: z.string().min(6).max(16),
});

export const updateUserDtoSchema = z.object({
  roles: z.array(z.number()),
  policies: z.array(policySchema).optional(),
  personalInformation: personSchema,
  contacts: contactSchema,
  address: addressSchema,
  _id: z.string(),
});

// You can now use this schema to validate the CreateUserDto type
