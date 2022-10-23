import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// * Interfaces.
import DetailedProjectDataInterface from "../../interfaces/DetailedProjectData.interface";
import ErrorInterface from "../../interfaces/Error.interface";
import RequestResponseInterface from "../../interfaces/RequestResponse.interface";

// * Components.
import Tag from "../../components/Tag/Tag";
import Modal from "../../components/Modal/Modal";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import Loader from "../../components/Loader/Loader";
import Popup from "../../components/Popup/Popup";
import Button from "../../components/Button/Button";

// * Config.
import { CONSTANTS, ENDPOINTS } from "../../config";

// * Utils.
import { splitNumber } from "../../utils/split-number";

// * Hooks.
import { useAuth } from "../../hooks/useAuth";

const Project: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { id } = useParams<{ id: string }>();

  const [project, setProject] = useState<DetailedProjectDataInterface | null>(
    null
  );

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isVoteModalOpened, setIsVoteModalOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorInterface>({
    error: false,
    message: "",
  });

  useEffect(() => {
    const fetchData = async (): Promise<DetailedProjectDataInterface> => {
      const { data } = await axios.post<DetailedProjectDataInterface>(
        ENDPOINTS?.GET_PROJECT.replace(":id", id || "-1"),
        { userId: auth?.id || null },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      return data;
    };

    fetchData()
      .then((data: DetailedProjectDataInterface) => {
        setProject(data);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setError({
          error: true,
          message:
            "Podczas pobierania danych tego projektu wystąpił nieoczekiwany błąd.",
        });
      });
  }, []);

  // * User vote on project action.
  const vote = () => {
    if (!id) return;

    const voteAction = async (): Promise<RequestResponseInterface> => {
      const { data } = await axios.post<RequestResponseInterface>(
        ENDPOINTS?.VOTE.replace(":id", id || "-1"),
        { userId: auth?.id || -1 },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      return data;
    };

    voteAction()
      .then((data: RequestResponseInterface) => {
        if (data?.status === "Success") {
          setProject((prev) => prev && { ...prev, voted: true });
        }
      })
      .catch(({ response }) => {
        setError({
          error: true,
          message:
            "Podczas głosowania na ten projekt wystąpił nieoczekiwany błąd.",
        });
      });
  };

  // * User delete project action.
  const deleteProject = (): void => {
    const deleteProjectAction = async (): Promise<RequestResponseInterface> => {
      const { data } = await axios.post<RequestResponseInterface>(
        ENDPOINTS?.DELETE_PROJECT.replace(":id", id || "-1"),
        { userId: auth?.id || -1 },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      return data;
    };

    setIsLoading(true);
    deleteProjectAction()
      .then((data: RequestResponseInterface) => {
        setIsLoading(false);
        setIsModalOpened(false);
        if (data?.status === "Success") {
          navigate(`/projekty/${auth?.city ? auth?.city : "warszawa"}`, {
            replace: true,
          });
        }
      })
      .catch(({ response }) => {
        setIsLoading(false);
        setError({
          error: true,
          message:
            "Podczas usuwania tego projektu wystąpił nieoczekiwany błąd.",
        });
      });
  };

  if (!project || error.error) {
    return (
      <section className="flex y-center x-center">
        <Popup title="Wystąpił błąd" message={error.message} />
        <Loader size="big" />
      </section>
    );
  }

  const {
    title,
    position,
    project_size,
    description,
    localization,
    cost,
    votes,
    coords,
    additional_information,
    voted,
    isAuthor,
  } = project;

  console.log(isAuthor);

  return (
    <section id="project" className="flex y-center x-center">
      {!isLoading && !error.error ? (
        <div className="content f-column y-start x-start">
          <div className="project-topbar f-column y-start x-start">
            <span className="project-title flex y-start x-start">
              <span className="project-position">#{position}</span>
              {title}
            </span>

            <div className="project-votes-wrapper">
              <span className="project-votes-label">Liczba głosów: </span>
              <span className="project-votes">{splitNumber(votes)}</span>
            </div>

            {!isAuthor ? (
              <>
                {auth?.id ? (
                  <>
                    {!voted ? (
                      <>
                        <Button
                          text="Zagłosuj"
                          type="button"
                          callback={() => setIsVoteModalOpened(true)}
                        />

                        <Modal
                          title="Głosowanie na projekt"
                          message={`Czy napewno chcesz zagłosować na ten projekt? (${title})`}
                          isOpened={isVoteModalOpened}
                          setIsOpened={setIsVoteModalOpened}
                        >
                          <div className="modal-bottom-bar flex y-center x-center">
                            <Button
                              text="Anuluj"
                              type="button"
                              callback={() => setIsVoteModalOpened(false)}
                            />
                            <div className="modal-button-wrapper success">
                              <Button
                                text="Zagłosuj"
                                type="button"
                                callback={vote}
                              />
                            </div>
                          </div>
                        </Modal>
                      </>
                    ) : (
                      <Button text="Zagłosowałeś" type="button" />
                    )}
                  </>
                ) : (
                  <Button text="Zaloguj się i zagłosuj" path="/logowanie" />
                )}
              </>
            ) : (
              <span className="author">
                Projekt zaproponowany przez ciebie.
              </span>
            )}
          </div>

          <div className="project-info f-column y-start x-start">
            {project_size ? <Tag text={project_size} /> : <Tag text="Brak" />}

            <span className="project-cost">
              Przewidywany budżet projektu: <span>{splitNumber(cost)} PLN</span>
            </span>

            <span className="project-localization">
              Przewidywana lokalizacja:{" "}
              <span>{localization ? localization : "Brak"}</span>
            </span>
          </div>

          <p className="project-description">
            {description ? description : "Brak"}
          </p>

          <span className="project-additional-information">
            Dodatkowe informacje:{" "}
            <span>
              {additional_information ? additional_information : "Brak"}
            </span>
          </span>

          <div className="project-map-wrapper flex y-center x-center">
            <GoogleMap
              zoom={CONSTANTS?.DETAILED_PROJECT_VIEW_GOOGLE_MAPS_ZOOM}
              coords={coords}
              marker={coords}
            />
          </div>

          {isAuthor && (
            <>
              <div className="button-wrapper flex y-center x-start">
                <Button
                  text="Usuń projekt"
                  type="button"
                  callback={() => setIsModalOpened(true)}
                />
              </div>

              <Modal
                title="Usuwanie projektu"
                message="Czy napewno chcesz usunąć ten projekt dodany przez ciebie? Tego procesu nie można cofnąć."
                isOpened={isModalOpened}
                setIsOpened={setIsModalOpened}
              >
                <div className="modal-bottom-bar flex y-center x-center">
                  <Button
                    text="Anuluj"
                    type="button"
                    callback={() => setIsModalOpened(false)}
                  />
                  <Button text="Usuń" type="button" callback={deleteProject} />
                </div>
              </Modal>
            </>
          )}
        </div>
      ) : (
        <Loader size="big" />
      )}
    </section>
  );
};

export default Project;
