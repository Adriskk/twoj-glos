import React, { FC } from "react";

// * Data.
import { CITIES } from "../../data";

// * Components.
import Tag from "../../components/Tag/Tag";

const About: FC = () => {
  return (
    <section id="about">
      <div className="content f-column y-start x-start">
        <div className="header-content f-column y-start x-start">
          <span className="header">
            Co to <span>Twój</span> głos?
          </span>

          <p className="description">
            Platforma <span>Twój głos</span> jest serwisem umożliwiającym jej
            użytkownikom głosowanie na ich ulubione projekty, które wykorzystują
            budżet obywatelski dostępny w wybranym przez danego użytkownika
            mieście w procesie rejestracji.
          </p>

          <p className="description">
            Użytkownik jest w stanie m.in. zaproponować projekt obywatelski
            Rządowi (co w późniejszym procesie jest zatwierdzane przez owy Rząd
            miasta lub anulowany z różnych powodów), zagłosować na wybrany
            projekt (maksymalnie 3 głosy).
          </p>

          <div className="supported-cities f-column y-start x-start">
            <span className="header small">Lista wspieranych miast</span>
            <div className="cities-wrapper flex y-center">
              {CITIES?.map((city, i) => (
                <Tag text={city} key={"city-" + i} />
              ))}
            </div>
          </div>

          <p className="description">
            Witryna stworzona na potrzeby konkursu{" "}
            <a href="https://www.hackheroes.pl/" target="_blank">
              CodeWeek (Europejski Tydzień Kodowania)
            </a>
            , czyli{" "}
            <a href="https://www.hackheroes.pl/" target="_blank">
              Ogólnopolski Konkurs Programistyczny Hack Heroes
            </a>
            , który jest organizowany przez{" "}
            <span>Fundację Media 3.0 i SAP SE</span>. Dlatego prosimy o nie
            podawanie swoich prawdziwych danych w formularzu rejestracji. Strona
            nie jest oficjalną stroną Rządu Polskiego, ani żadnych tego typu
            instytucji.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
