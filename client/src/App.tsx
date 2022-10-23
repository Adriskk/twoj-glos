import React from "react";
import { Route, Routes } from "react-router-dom";

// * Layouts.
import Layout from "./layouts/Layout";

// * Views.
import Landing from "./views/Landing/Landing";
import About from "./views/About/About";
import Project from "./views/Project/Project";
import ProjectsLanding from "./views/ProjectsLanding/ProjectsLanding";

import Account from "./views/Account/Account";
import Settings from "./views/Settings/Settings";
import AddProject from "./views/AddProject/AddProject";

import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

import NoMatch from "./views/NoMatch/NoMatch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="logowanie" element={<Login />} />
        <Route path="rejestracja" element={<Register />} />
        <Route path="o-twoj-glos" element={<About />} />
        <Route path="projekty/:city" element={<ProjectsLanding />} />
        <Route path="projekt/:city/:id" element={<Project />} />
        <Route path="konto">
          <Route index element={<Account />} />
          <Route path="ustawienia" element={<Settings />} />
          <Route path="zaproponuj-projekt" element={<AddProject />} />
        </Route>
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
