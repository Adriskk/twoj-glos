import React from "react";
import Cookie from "js-cookie";
import { COOKIES } from "../config";
import LoggedUserInterface from "../interfaces/LoggedUser.interface";

export const useAuth = (): LoggedUserInterface | null => {
  /**
   * * I know I should've used AuthContext based validation for
   * * views and check once in a file for a logged user
   * * and then redirect if not logged,
   * * but there is no time for that I guess,
   * * cuz I've always had problems with that :(
   * */

  const cookie = Cookie.get(COOKIES?.USER_COOKIE) || null;
  if (!cookie) return null;
  return JSON.parse(cookie);
};

export const logout = () => {
  Cookie.remove(COOKIES?.USER_COOKIE);
  Cookie.remove(COOKIES?.THEME_COOKIE);
};
