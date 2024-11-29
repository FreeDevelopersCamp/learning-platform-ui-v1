import { UseFormReturnType } from "@mantine/form";

export type Form<T> = UseFormReturnType<T, (values: T) => T>;

export type FormValues<T extends boolean, U, C> = T extends true ? U : C;
