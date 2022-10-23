import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// * Interfaces.
import ProjectDataInterface from "../../interfaces/ProjectData.interface";
import ErrorInterface from "../../interfaces/Error.interface";

// * Components.
import Button from "../../components/Button/Button";
import ProjectItemList from "../../components/ProjectItemList/ProjectItemList";
import Popup from "../../components/Popup/Popup";
import Loader from "../../components/Loader/Loader";

// * Config.
import { ENDPOINTS } from "../../config";

// * Utils.
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";

// * Hooks.
import { logout, useAuth } from "../../hooks/useAuth";

const Account: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [projects, setProjects] = useState<ProjectDataInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorInterface>({
    error: false,
    message: "",
  });

  useEffect(() => {
    if (!auth) {
      navigate("/logowanie");
    }

    const fetchData = async (): Promise<ProjectDataInterface[]> => {
      const { data } = await axios.get<ProjectDataInterface[]>(
        ENDPOINTS?.GET_USER_PROJECTS.replace(":user-id", "" + (auth?.id || -1))
      );

      return data;
    };

    fetchData()
      .then((data: ProjectDataInterface[]) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setError({
          error: true,
          message:
            "Podczas pobierania projektów tego konta wystąpił nie oczekiwany błąd.",
        });
      });
  }, []);

  const logoutAction = (): void => {
    logout();
    navigate("/logowanie");
  };

  return (
    <section id="account">
      <div className="content f-column y-center x-start">
        <div className="settings-topbar flex y-center x-between">
          <span className="user-name-surname">
            {capitalizeFirstLetter(auth?.name || "imię")}{" "}
            {capitalizeFirstLetter(auth?.surname || "nazwisko")}
          </span>
          <Button text="Wyloguj" type="button" callback={logoutAction} />
        </div>

        <div className="action-buttons flex y-center x-start">
          <a href="/konto/zaproponuj-projekt">Zaproponuj projekt</a>
          <a href="/konto/ustawienia">Ustawienia konta</a>
        </div>

        <div className="user-projects-list-wrapper f-column y-start x-start">
          <span className="user-projects-header">
            Twoje propozycje projektów
          </span>

          {!projects || (error.error && !isLoading) ? (
            <div className="flex y-center x-center" style={{ width: "100%" }}>
              <Popup title="Wystąpił błąd" message={error.message} />
              <Loader size="big" />
            </div>
          ) : (
            <ProjectItemList
              isLoading={isLoading}
              projects={projects}
              sort={true}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Account;
