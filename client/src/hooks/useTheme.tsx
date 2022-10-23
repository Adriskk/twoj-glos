import React, { useState } from "react";
import Cookie from "js-cookie";
import { COOKIES } from "../config";

export const useTheme = () => {
  const [theme, setTheme] = useState<string>(
    Cookie.get(COOKIES?.THEME_COOKIE) || "light"
  );

  if (!theme) {
    Cookie.set(COOKIES?.THEME_COOKIE, "light");
    setTheme("light");
  }

  const setNewTheme = (theme: string): void => {
    Cookie.set(COOKIES?.THEME_COOKIE, theme);
    setTheme(theme);
  };

  return [theme, setNewTheme] as const;
};
