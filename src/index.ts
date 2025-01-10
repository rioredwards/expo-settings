import { EventSubscription } from "expo-modules-core";

import ExpoSettingsModule from "./ExpoSettingsModule";

export type Theme = "light" | "dark" | "system";

export type ThemeChangeEvent = {
  theme: Theme;
};

export function addThemeListener(listener: (event: ThemeChangeEvent) => void): EventSubscription {
  return ExpoSettingsModule.addListener("onChangeTheme", listener);
}

export function getTheme(): Theme {
  return ExpoSettingsModule.getTheme();
}

export function setTheme(theme: Theme): void {
  return ExpoSettingsModule.setTheme(theme);
}
