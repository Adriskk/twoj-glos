import React, { FC } from "react";

// * Components.
import ProjectItem from "../ProjectItem/ProjectItem";
import EmptyResults from "../EmptyResults/EmptyResults";
import Loader from "../Loader/Loader";

// * Interfaces.
import ProjectDataInterface from "../../interfaces/ProjectData.interface";

interface ProjectItemsListProps {
  isLoading: boolean;
  projects: ProjectDataInterface[];
  sort?: boolean;
}

const ProjectItemList: FC<ProjectItemsListProps> = ({
  isLoading,
  projects,
  sort,
}) => {
  if (!projects || projects.length === 0)
    return (
      <EmptyResults text="To miasto nie posiada obecnie żadnych projektów" />
    );

  let displayProjects = projects;

  if (sort) {
    displayProjects = displayProjects
      ?.sort((a, b) => {
        return b?.votes - a?.votes;
      })
      .filter((project, i) => i <= 4);
  }

  return (
    <div className="projects f-column y-center x-start">
      {!isLoading ? (
        <>
          {projects && projects.length > 0 ? (
            displayProjects?.map((project, i) => (
              <ProjectItem
                key={project.id}
                data={{ ...project, position: i + 1 }}
              />
            ))
          ) : (
            <EmptyResults text="To miasto nie posiada obecnie żadnych projektów" />
          )}
        </>
      ) : (
        <div style={{ width: "100%" }}>
          <Loader size="big" />
        </div>
      )}
    </div>
  );
};

export default ProjectItemList;
