import StatusBadge from "../StatusBadge";
import PriorityBadge from "../PriorityBadge";
import { formatDate, getProjectName } from "../../utils/helpers";

export default function TaskCard({
  task,
  projects,
  onEdit,
  onDelete,
  onStatusChange,
  showProject = true,
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{task.title}</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>
      </div>

      {task.description && (
        <p className="mb-3 text-sm text-slate-500 line-clamp-2">{task.description}</p>
      )}

      <div className="mb-3 space-y-1 text-sm text-slate-600">
        {showProject && (
          <p>
            <span className="font-medium text-slate-700">Project:</span>{" "}
            {getProjectName(projects, task.projectId)}
          </p>
        )}
        <p>
          <span className="font-medium text-slate-700">Due:</span> {formatDate(task.dueDate)}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
          className="rounded-lg border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-indigo-500"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="rounded-lg border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
