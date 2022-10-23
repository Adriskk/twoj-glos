import React, { FC, useState } from "react";
import Hamburger from "../components/Hamburger/Hamburger";
import { NAV_LINKS } from "../config";
import Button from "../components/Button/Button";
import { useAuth } from "../hooks/useAuth";
import Logo from "../components/Logo/Logo";

const Navigation: FC = () => {
  const auth = useAuth();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <nav className="flex y-center x-between" data-opened={isOpened}>
      <div className="nav-topbar flex y-center x-between">
        <div className="logo-wrapper">
          <Logo />
        </div>

        <div className="content intro-content"></div>
        <div className="content hidden-content f-column x-center y-start">
          <div className="nav-links f-column y-start x-start">
            <div className="links f-column y-start x-start">
              {NAV_LINKS?.map((link, i) => (
                <a
                  href={
                    link?.path.endsWith(":city")
                      ? link?.path.replace(
                          ":city",
                          auth?.city.toLowerCase() || "warszawa"
                        )
                      : link?.path
                  }
                  className="nav-link"
                  key={"nav-link" + i}
                >
                  {link?.text}
                </a>
              ))}

              {auth?.id && (
                <a href="/konto" className="nav-link">
                  Konto
                </a>
              )}
            </div>

            {auth === null && <Button text="Zaloguj się" path="/logowanie" />}
          </div>
        </div>

        <Hamburger opened={isOpened} setOpened={setIsOpened} />
      </div>
    </nav>
  );
};

export default Navigation;
