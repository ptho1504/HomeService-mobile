import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { i18n, Language } from "@/localization";

i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;

interface LanguageState {
  locale: Language | null;
}

const initialState: LanguageState = {
  locale: null,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.locale = action.payload;
    },
  },
});

export const getLang = (state: { language: LanguageState }) =>
  state.language.locale;

export const { setLanguage } = languageSlice.actions;

const languageReducer = languageSlice.reducer;
export default languageReducer;
