import React, { FC } from "react";
import Logo from "../components/Logo/Logo";
import { NAV_LINKS } from "../config";
import { useAuth } from "../hooks/useAuth";

const Footer: FC = () => {
  const auth = useAuth();

  return (
    <footer className="f-column y-start x-between">
      <div className="content f-column y-center x-start">
        <div className="logo-wrapper">
          <Logo />
        </div>

        <div className="columns">
          <div className="column f-column y-start x-start">
            <span className="column-title">Menu</span>

            <div className="column-links f-column y-start x-start">
              {NAV_LINKS?.map((link, i) => (
                <a
                  href={
                    link.path.endsWith(":city")
                      ? link?.path.replace(
                          ":city",
                          auth?.city.toLowerCase() || "warszawa"
                        )
                      : link?.path
                  }
                  className="column-link"
                  key={"footer-link-" + i}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          <div className="column f-column y-start x-start">
            <span className="column-title">Konto</span>

            <div className="column-links f-column y-start x-start">
              {auth?.id ? (
                <>
                  <a href="/konto" className="column-link">
                    Konto
                  </a>

                  <a href="/konto/ustawienia" className="column-link">
                    Ustawienia
                  </a>

                  <a href="/konto/zaproponuj-projekt" className="column-link">
                    Zaproponuj projekt
                  </a>
                </>
              ) : (
                <>
                  <a href="/logowanie" className="column-link">
                    Zaloguj się
                  </a>

                  <a href="/rejestracja" className="column-link">
                    Zarejestruj się
                  </a>
                </>
              )}
            </div>
          </div>

          <div className="column f-column y-start x-start">
            <span className="column-title">Inne</span>

            <div className="column-links f-column y-start x-start">
              <a href="#" className="column-link">
                Regulamin
              </a>

              <a href="#" className="column-link">
                Warunki użytkowania
              </a>

              <a href="#" className="column-link">
                RODO
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright f-column y-start x-start">
        <span className="copyright-row">&copy; Twoj głos 2022</span>
        <span className="copyright-row">Wszelkie prawa zastrzeżone.</span>
      </div>
    </footer>
  );
};

export default Footer;
