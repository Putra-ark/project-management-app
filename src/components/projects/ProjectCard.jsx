import { Link } from "react-router-dom";
import StatusBadge from "../StatusBadge";
import PriorityBadge from "../PriorityBadge";
import ProgressBar from "../ProgressBar";
import { formatDate, getProjectProgress } from "../../utils/helpers";

export default function ProjectCard({ project, tasks, onEdit, onDelete }) {
  const projectTasks = tasks.filter((task) => task.projectId === project.id);
  const progress = getProjectProgress(project.id, tasks);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={project.status} />
          <PriorityBadge priority={project.priority} />
        </div>
      </div>

      <div className="mb-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
        <p>
          <span className="font-medium text-slate-700">Due:</span>{" "}
          {formatDate(project.dueDate)}
        </p>
        <p>
          <span className="font-medium text-slate-700">Tasks:</span> {projectTasks.length}
        </p>
      </div>

      <ProgressBar value={progress} />

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          to={`/projects/${project.id}`}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          View
        </Link>
        <button
          type="button"
          onClick={() => onEdit(project)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(project)}
          className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
