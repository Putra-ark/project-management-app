import { useMemo } from "react";
import PriorityBadge from "../components/PriorityBadge";
import { formatDate, getProjectName } from "../utils/helpers";

const columns = [
  { id: "To Do", title: "To Do", color: "border-slate-300" },
  { id: "In Progress", title: "In Progress", color: "border-blue-300" },
  { id: "Done", title: "Done", color: "border-emerald-300" },
];

export default function Board({ projects, tasks, onChangeStatus }) {
  const tasksByStatus = useMemo(() => {
    return {
      "To Do": tasks.filter((task) => task.status === "To Do"),
      "In Progress": tasks.filter((task) => task.status === "In Progress"),
      Done: tasks.filter((task) => task.status === "Done"),
    };
  }, [tasks]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Kanban Board</h2>
        <p className="text-sm text-slate-500">
          Move tasks between columns using the status dropdown
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="text-slate-500">No tasks found</p>
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <section
              key={column.id}
              className={`min-w-[280px] flex-1 rounded-xl border-t-4 ${column.color} border border-slate-200 bg-slate-50 p-4`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{column.title}</h3>
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                  {tasksByStatus[column.id].length}
                </span>
              </div>

              <div className="space-y-3">
                {tasksByStatus[column.id].map((task) => (
                  <article
                    key={task.id}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <h4 className="mb-2 font-medium text-slate-900">{task.title}</h4>
                    <p className="mb-2 text-sm text-slate-500">
                      {getProjectName(projects, task.projectId)}
                    </p>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <PriorityBadge priority={task.priority} />
                      <span className="text-xs text-slate-500">
                        Due {formatDate(task.dueDate)}
                      </span>
                    </div>
                    <select
                      value={task.status}
                      onChange={(event) => onChangeStatus(task.id, event.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-indigo-500"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </article>
                ))}

                {tasksByStatus[column.id].length === 0 && (
                  <p className="rounded-lg border border-dashed border-slate-300 bg-white px-3 py-6 text-center text-sm text-slate-400">
                    No tasks
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
