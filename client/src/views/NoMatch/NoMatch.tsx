import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

// * Components.
import Button from "../../components/Button/Button";

// * Resources.
import { ReactComponent as NoMatchIllustration } from "../../assets/svg/no-match-illustration.svg";

const NoMatch: FC = () => {
  const navigate = useNavigate();

  return (
    <section id="no-match" className="flex y-center x-center">
      <div className="content f-column y-center x-center">
        <NoMatchIllustration className="illustration" />
        <span className="header">Wygląda na to, że wyjechałeś z miasta ;/</span>
        <p className="description">
          Ta strona nie istnieje, jest w trakcie budowy lub już nie istnieje.
          Aby powrócić do poprzedniej strony kliknij przycisk poniżej.
        </p>

        <Button text="Powrót" callback={() => navigate(-1)} />
      </div>
    </section>
  );
};

export default NoMatch;
