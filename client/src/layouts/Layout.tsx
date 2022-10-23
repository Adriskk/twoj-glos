import React, { FC } from "react";
import { Outlet } from "react-router-dom";

// * Layouts.
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useTheme } from "../hooks/useTheme";

const Layout: FC = () => {
  const [theme] = useTheme();
  document.body.setAttribute("data-theme", theme);
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
