import { Direction } from "@mantine/core";
import en from "./resources/en";

export type LanguagesKeys = "en";

export interface LanguagesOptions {
  ENGLISH: LanguagesKeys;
}

export interface DirectionOptions {
  RIGHT_TO_LEFT: Direction;
  LEFT_TO_RIGHT: Direction;
}

export interface AppLanguage {
  label: string;
  value: LanguagesKeys;
  dir: Direction;
}

export type tKeys = keyof typeof en;
