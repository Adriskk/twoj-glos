import React, { FC, useEffect, useState } from "react";
import AOS from "aos";

// * Components.
import Select from "../../components/Select/Select";
import ViewSlider from "../../components/ViewSlider/ViewSlider";
import Button from "../../components/Button/Button";

// * Data.
import { CITIES } from "../../data";

// * Hooks.
import useIsMobile from "../../hooks/useIsMobile";
import { useAuth } from "../../hooks/useAuth";

// * Resources.
import LandingVideo from "../../assets/videos/landing-video.mp4";
import { ReactComponent as VotingIllustration } from "../../assets/svg/vote-illustration.svg";
import { ReactComponent as IdeaIllustration } from "../../assets/svg/idea-illustration.svg";

const Landing: FC = () => {
  const auth = useAuth();
  const isMobile = useIsMobile();
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
      offset: 100,
    });

    AOS.refresh();
  }, []);

  return (
    <>
      <section id="hero" className="f-column y-center x-start">
        <span className="hero-header" data-aos="fade-right">
          <span>Głosuj</span> z innymi <span className="light">lub</span>{" "}
          <span>zbieraj</span> głosy.
        </span>

        <div className="hero-content">
          <div className="content content-left f-column y-start x-start">
            <p
              className="hero-description"
              data-aos="fade-right"
              data-aos-delay={150}
            >
              Platforma <span>Twój głos</span> umożliwia Ci głosowanie na
              projekty wykorzystujące budżet obywatelski w twoim mieście.
            </p>

            <p
              className="hero-description"
              data-aos="fade-right"
              data-aos-delay={200}
            >
              Weź sprawy w swoje ręce - zaproponuj projekt wykorzystujący budżet
              obywatelski i zbieraj głosy.
            </p>

            <div data-aos="zoom-in" data-aos-delay={550}>
              <Button text="Jak to działa?" path="/#jak-to-dziala" />
            </div>
          </div>

          <div className="content content-right f-column y-start x-start">
            <div
              className="content-row f-column y-start x-start"
              data-aos="fade-up"
              data-aos-delay={350}
            >
              <span className="row-header">Aktywne projekty</span>
              <span className="row-value">100+</span>
            </div>

            <div
              className="content-row f-column y-start x-start"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <span className="row-header">
                Miasta korzystające z Twój głos
              </span>
              <span className="row-value">{CITIES.length}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="showcase-video">
        <span className="header">
          Zobacz jak to <span>działa</span>
        </span>
        <video autoPlay loop muted className="video" controls={isMobile}>
          <source src={LandingVideo} type="video/mp4" />
          Niestety, ale twoja przeglądarka nie wspiera filmów.
        </video>
      </section>

      <section id="jak-to-dziala" className="f-column y-start x-start">
        <div className="header-content f-column y-start x-start">
          <span className="header" data-aos="fade-right">
            Zagłosuj na projekt
          </span>
          <p className="description" data-aos="fade-right" data-aos-delay={150}>
            Wprowadzimy cię w działanie strony, pokazując ci jak możesz
            zagłosować na według ciebie najciekawszy i warty poparcia projekt
            finansowany z budżetu obywatelskiego.
          </p>
        </div>

        <div className="content">
          <ViewSlider>
            <>
              <p
                className="view-description"
                data-aos="zoom-in"
                data-aos-delay={250}
              >
                Utwórz konto podając m.in. swoje miasto i pesel w celu
                weryfikacji twojego miejsca zamieszkania.
              </p>

              <div data-aos="zoom-in" data-aos-delay={350}>
                <Button text="Zarejestruj się" path="/rejestracja" />
              </div>
            </>

            <>
              <p className="view-description">
                Zaloguj się na swoje nowo utworzone konto poprzez formularz
                logowania, który jest dostępny poniżej.
              </p>

              <Button text="Zaloguj się" path="/logowanie" />
            </>

            <>
              <p className="view-description">
                Wybierz interesujący Cię projekt w twoim mieście. Wszystkie
                dostępne projekty zobaczyć możesz w zakładce{" "}
                <span>Projekty</span>. Kliknij na projekt, aby podejrzeć
                szczegóły.
              </p>

              <Button
                text="Zobacz projekty"
                path={`/projekty/${auth?.city || "warszawa"}`}
              />
            </>

            <>
              <p className="view-description">
                Zagłosuj na ulubiony projekt używając widocznego na stronie
                przycisku <span>Zagłosuj</span>
              </p>
            </>
          </ViewSlider>
          <VotingIllustration
            width="100%"
            className="illustration"
            data-aos="zoom-in"
            data-aos-delay={450}
          />
        </div>
      </section>

      <section
        id="suggest-project-tutorial"
        className="f-column y-start x-start"
      >
        <div className="header-content f-column y-start x-start">
          <span className="header" data-aos="fade-right">
            Zaproponuj własny projekt
          </span>

          <p className="description" data-aos="fade-right" data-aos-delay={150}>
            Masz ciekawy pomysł na wykorzystanie budżetu obywatelskiego?
            Chciałbyś zaproponować coś innego? Wyślij zgłoszenie takiej
            inicjatywy do Rządu twojego miasta. Oto kilka kroków pokazujących Ci
            sposób jak to zrobić.
          </p>
        </div>

        <div className="content">
          <ViewSlider>
            <>
              <p
                className="view-description"
                data-aos="zoom-in"
                data-aos-delay={250}
              >
                Jeżeli jeszcze nie masz konta na platformie, utwórz konto
                podając m.in. swoje miasto i pesel w celu weryfikacji twojego
                miejsca zamieszkania. Zaloguj się na utworzone konto.
              </p>

              <div data-aos="zoom-in" data-aos-delay={350}>
                <Button text="Zaloguj się" path="/logowanie" />
              </div>
            </>

            <>
              <p className="view-description">
                Przejdź do zakładki <span>Konto</span>, która jest dostępna w
                menu strony lub użyj przycisku poniżej.
              </p>

              <Button text="Konto" path="/konto" />
            </>

            <>
              <p className="view-description">
                Przejdź do strony z formularzem wysyłającym propozycję projektu,
                dostępnej pod przyciskiem <span>Zaproponuj projekt</span>,
                wypełnij formularz podając m.in. koszt projektu oraz opis i
                wyślij.
              </p>
            </>

            <>
              <p className="view-description">
                Gdy Rząd twojego miasta zatwierdzi twoją propozycję projektu
                wykorzystującego budżet obywatelski powiadomimy Cię o tym pocztą
                e-mail.
              </p>
            </>
          </ViewSlider>
          <IdeaIllustration
            width="100%"
            className="illustration big"
            data-aos="zoom-in"
            data-aos-delay={450}
          />
        </div>
      </section>

      <section id="see-projects" className="flex y-center x-center">
        <div className="content f-column y-center x-center">
          <div className="header-content different f-column y-start x-start">
            <span className="header" data-aos="fade-up">
              Przejrzyj obecne projekty w twoim mieście
            </span>

            <p className="description" data-aos="fade-up" data-aos-delay={150}>
              Nie będziesz w stanie głosować ani wysyłać zgłoszeń własnych
              propozycji na wydanie budżetu obywatelskiego dopóki nie utworzysz
              konta.
            </p>
          </div>

          <div className="content-input-wrapper f-column y-center x-center">
            <div data-aos="fade-up" data-aos-delay={250}>
              <Select
                label=""
                placeholder="Wybierz twoje miasto"
                values={CITIES}
                setNewValue={setCity}
              />
            </div>

            <div style={{ width: "100%" }}>
              <Button
                text="Zobacz projekty"
                path={city ? `/projekty/${city}` : ""}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="register-now" className="f-column y-start x-center">
        <div className="content f-column y-start x-start">
          <span className="header" data-aos="fade-right">
            Zarejestruj się i miej swój głos w twoim mieście już dziś.
          </span>

          <p className="description" data-aos="fade-right" data-aos-delay={150}>
            Stań się częścią przyszłego projektu finansowanego z budżetu
            obywatelskiego twojego miasta. Zarejestruj swoje konto na platformie
            i głosuj
          </p>
        </div>

        <div
          className="button-wrapper flex y-center x-center"
          data-aos="zoom-in"
          data-aos-delay={250}
        >
          <Button text="Dołącz do tysięcy użytkowników" path="/rejestracja" />
        </div>
      </section>
    </>
  );
};

export default Landing;
