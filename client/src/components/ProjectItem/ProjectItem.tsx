import React, { FC } from "react";

// * Components.
import Tag from "../Tag/Tag";
import GoogleMap from "../GoogleMap/GoogleMap";

// * Interfaces.
import ProjectDataInterface from "../../interfaces/ProjectData.interface";

// * Config.
import { CONSTANTS } from "../../config";

// * Resources.
import { ReactComponent as SideArrow } from "../../assets/svg/arrow-big.svg";

// * Utils.
import { splitNumber } from "../../utils/split-number";

interface ProjectItemProps {
  data: ProjectDataInterface;
}

const ProjectItem: FC<ProjectItemProps> = ({ data }) => {
  const {
    id,
    title,
    description,
    cost,
    project_size,
    position,
    localization,
    votes,
    coords,
    city,
  } = data;

  return (
    <div className="project-item f-column y-start x-start">
      <div className="project-tile-position">
        <span className="project-pos header">Pozycja</span>{" "}
        <span className="project-pos">{position}</span>
      </div>

      <div className="project-item-tile">
        <div className="project-item-map">
          <GoogleMap
            zoom={CONSTANTS?.PROJECT_ITEM_GOOGLE_MAPS_ZOOM}
            coords={coords}
            marker={coords}
          />
        </div>

        <div className="project-item-content">
          <div className="project-item-text-content f-column y-start x-start">
            <span className="project-item-title">{title}</span>
            <span className="project-item-description">{description}</span>
            {project_size && <Tag text={project_size} />}
            <span className="project-item-localization">{localization}</span>

            <span className="project-item-budget">
              Budżet: <span className="color">{splitNumber(cost)} PLN</span>
            </span>
          </div>
          <div className="project-item-bottom-bar flex y-center x-between">
            <span className="project-item-votes-wrapper">
              <span className="votes">{votes}</span> głosów
            </span>

            <a
              href={`/projekt/${city?.toLowerCase()}/${id}`}
              className="project-item-details-wrapper flex y-center x-center"
            >
              <SideArrow className="icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
