import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// * Interfaces.
import ProjectDataInterface from "../../interfaces/ProjectData.interface";
import ErrorInterface from "../../interfaces/Error.interface";

// * Components.
import Search from "../../components/Search/Search";
import Loader from "../../components/Loader/Loader";
import Popup from "../../components/Popup/Popup";
import ProjectItemList from "../../components/ProjectItemList/ProjectItemList";

// * Config.
import { ENDPOINTS } from "../../config";

// * Hooks.
import { useAuth } from "../../hooks/useAuth";

const ProjectsLanding: FC = () => {
  const { city } = useParams<{ city: string }>();
  const auth = useAuth();

  const [searchValue, setSearchValue] = useState<string>("");
  const [projects, setProjects] = useState<ProjectDataInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorInterface>({
    error: false,
    message: "",
  });

  /**
   * * Returns an empty object if user haven't used search
   * * input, otherwise returns object with user phrase.
   * */
  const getQueryParams = (): {} => {
    return searchValue !== "" ? { phrase: searchValue } : {};
  };

  const c = auth ? auth?.city.toLowerCase() : city?.toLowerCase();
  useEffect(() => {
    const fetchData = async (): Promise<ProjectDataInterface[]> => {
      const { data } = await axios.get<ProjectDataInterface[]>(
        ENDPOINTS?.GET_PROJECTS.replace(":city", c || "Brak"),
        {
          params: getQueryParams(),
        }
      );
      return data;
    };

    setIsLoading(true);
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
            "Podczas pobierania projektów dla tego miasta wystąpił nieoczekiwany błąd.",
        });
      });
  }, [searchValue]);

  return (
    <section id="projects-landing" className="f-column y-center x-start">
      <div className="section-intro f-column y-center x-center">
        <span className="intro-header">
          Obecnie przeglądasz projekty dla miasta
        </span>

        <span className="intro-city">{c || "Brak"}</span>
      </div>

      {!projects || (error.error && !isLoading) ? (
        <div className="flex y-center x-center">
          <Popup title="Wystąpił błąd" message={error.message} />
          <Loader size="big" />
        </div>
      ) : (
        <>
          <div className="search-wrapper f-column y-center x-center">
            <Search
              placeholder="Wyszukaj nazwę projektu"
              setExtendingValue={setSearchValue}
            />
            <small className="search-small">Wyszukaj projekt</small>
          </div>

          <div className="projects-list-wrapper f-column y-start x-start">
            {searchValue !== "" ? (
              <div className="projects-list f-column y-start x-start">
                <span className="projects-list-header">
                  Projekty wyszukane według frazy: "{searchValue}"
                </span>

                <ProjectItemList isLoading={isLoading} projects={projects} />
              </div>
            ) : (
              <>
                <div className="projects-list f-column y-start x-start">
                  <span className="projects-list-header">
                    Projekty z największą ilością głosów
                  </span>

                  <ProjectItemList
                    isLoading={isLoading}
                    projects={projects}
                    sort={true}
                  />
                </div>
                <div className="projects-list f-column y-start x-start">
                  <span className="projects-list-header">
                    Wszystkie dostępne projekty w tym mieście
                  </span>

                  <ProjectItemList isLoading={isLoading} projects={projects} />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectsLanding;
