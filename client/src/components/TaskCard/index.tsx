import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  task: Task;
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "urgent":
      return "bg-red-500";
    case "high":
      return "bg-orange-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    case "backlog":
      return "bg-gray-500";
    default:
      return "bg-gray-300";
  }
};

const TaskCard = ({ task }: Props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="group mb-4 rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-white/5 dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <p className="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Attachments:
          </p>
          <div className="flex flex-wrap gap-2">
            <Image
              src={`https://s3-projectflow.s3.us-east-1.amazonaws.com/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="rounded-md border border-gray-300 object-cover shadow dark:border-gray-600"
            />
          </div>
        </div>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            {task.title}
          </h3>
          <span
            className={`ml-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium text-white ${getPriorityColor(
              task.priority ?? "",
            )}`}
          >
            {task.priority}
          </span>
        </div>

        {/* Collapsible Description */}
        <p className="text-gray-600 dark:text-gray-300">
          <span className="font-medium">Description: </span>
          {showFullDescription || (task.description?.length ?? 0) < 100
            ? (task.description ?? "")
            : (task.description?.slice(0, 100) ?? "") + "... "}
          {(task.description?.length ?? 0) > 100 && (
            <button
              className="ml-1 text-blue-600 hover:underline dark:text-blue-400"
              onClick={() => setShowFullDescription((prev) => !prev)}
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          )}
        </p>

        {/* Tags */}
        {task.tags && (
          <div className="flex flex-wrap gap-2">
            {task.tags.split(",").map((tag, i) => (
              <span
                key={i}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        <p>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Status:
          </span>{" "}
          {task.status}
        </p>
        <p>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Start Date:
          </span>{" "}
          {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
        </p>
        <p>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Due Date:
          </span>{" "}
          {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
        </p>
        <p>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Author:
          </span>{" "}
          {task.author ? task.author.username : "Unknown"}
        </p>
        <p>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Assignee:
          </span>{" "}
          {task.assignee ? task.assignee.username : "Unassigned"}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
