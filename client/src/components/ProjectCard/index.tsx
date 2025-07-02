import { Project } from "@/state/api";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="group rounded-xl border border-gray-200 bg-white/80 p-5 shadow-md backdrop-blur transition hover:scale-[1.01] hover:shadow-lg dark:border-gray-700 dark:bg-white/5">
      <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-blue-600 dark:text-white">
        {project.name}
      </h3>
      <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
        {project.description}
      </p>
      <div className="mt-4 flex flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
        <p>
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Start:
          </span>{" "}
          {project.startDate}
        </p>
        <p>
          <span className="font-medium text-gray-700 dark:text-gray-200">
            End:
          </span>{" "}
          {project.endDate || "Ongoing"}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
