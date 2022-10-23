import NavLinkInterface from "../interfaces/NavLink.interface";

export const NAV_LINKS: NavLinkInterface[] = [
  {
    text: "Projekty",
    path: "/projekty/:city",
  },

  {
    text: "O platformie",
    path: "/o-twoj-glos",
  },
];

export const FIELDS_LENGTH = {
  login: { min: 6, max: 320 },
  password: { min: 8, max: 40 },
  email: { min: 6, max: 320 },
  title: { min: 10, max: 85 },
  description: { min: 30, max: 4000 },
  additional_information: { min: 10, max: 250 },
  cost: { min: 1 },
};

export const REGEX = {
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  phone: /\+48 \d{3}[\-\)\.\s]?\d{3}[\-\.\s]?\d{3}/g,
  login:
    /\+48 \d{3}[\-\)\.\s]?\d{3}[\-\.\s]?\d{3}|[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  name: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/,
  surname: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*$/,
  pesel: /^\d{11}$/,
};

export const ENDPOINTS = {
  LOGIN: "/api/login",
  REGISTER: "/api/register",
  LOGOUT: "/api/logout",

  DELETE_USER: "/api/delete-user/:user-id",

  CREATE_PROJECT: "/api/create-project",
  GET_PROJECTS: "/api/fetch-projects/:city",
  GET_USER_PROJECTS: "/api/fetch-user-projects/:user-id",
  GET_PROJECT: "/api/fetch-project/:id",
  DELETE_PROJECT: "/api/delete-project/:id",
  APPROVE_PROJECT: "/api/approve-project/:id",
  VOTE: "/api/vote/:id",

  GET_SETTINGS: "/api/settings/:user-id",
  SAVE_SETTINGS: "/api/settings/:user-id",

  GET_LAT_LNG_GM:
    "https://maps.googleapis.com/maps/api/geocode/json?address=:address&key=:key",
};

export const CONSTANTS = {
  PROJECT_ITEM_GOOGLE_MAPS_ZOOM: 16,
  DETAILED_PROJECT_VIEW_GOOGLE_MAPS_ZOOM: 18,
  MODAL_GOOGLE_MAPS_ZOOM: 18,
};

export const COOKIES = {
  USER_COOKIE: "userData",
  THEME_COOKIE: "theme",
};

export const PROJECT_SIZES = [
  {
    size: "Inwestycyjny mały",
    max: 500_000,
    min: 1,
  },
  {
    size: "Inwestycyjny średni",
    max: 1_500_000,
    min: 500_001,
  },
  {
    size: "Inwestycyjny duży",
    max: null,
    min: 1_500_001,
  },
];
