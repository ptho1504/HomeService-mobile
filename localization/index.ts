import { I18n } from "i18n-js";
import { en, vn } from "./languages";

export enum Language {
  "ENGLISH" = "en",
  "VIETNAMESE" = "vi",
}

// Set the key-value pairs for the different languages you want to support.
export const i18n = new I18n({
  [Language.VIETNAMESE]: vn,
  [Language.ENGLISH]: en,
});

export * from "./keys";
