import {
  AppLanguage,
  DirectionOptions,
  LanguagesKeys,
  LanguagesOptions,
} from "./types";

export const languages: LanguagesOptions = {
  ENGLISH: "en",
};

export const directions: DirectionOptions = {
  RIGHT_TO_LEFT: "rtl",
  LEFT_TO_RIGHT: "ltr",
};
export const appLanguages: Record<LanguagesKeys, AppLanguage> = {
  en: {
    label: "English",
    value: languages.ENGLISH,
    dir: directions.LEFT_TO_RIGHT,
  },
};
