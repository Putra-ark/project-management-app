import { useMemo } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import ProgressBar from "../components/ProgressBar";
import { formatDate, getProjectProgress } from "../utils/helpers";

export default function Dashboard({ projects, tasks }) {
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(
      (project) => project.status === "In Progress" || project.status === "Planning"
    ).length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "Done").length;

    return { totalProjects, activeProjects, totalTasks, completedTasks };
  }, [projects, tasks]);

  const recentProjects = useMemo(() => {
    return [...projects].slice(-3).reverse();
  }, [projects]);

  const taskStatusOverview = useMemo(() => {
    return {
      todo: tasks.filter((task) => task.status === "To Do").length,
      inProgress: tasks.filter((task) => task.status === "In Progress").length,
      done: tasks.filter((task) => task.status === "Done").length,
    };
  }, [tasks]);

  const cards = [
    { label: "Total Projects", value: stats.totalProjects },
    { label: "Active Projects", value: stats.activeProjects },
    { label: "Total Tasks", value: stats.totalTasks },
    { label: "Completed Tasks", value: stats.completedTasks },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Projects</h2>
            <Link to="/projects" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              View all
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <p className="text-sm text-slate-500">No projects yet</p>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="block rounded-lg border border-slate-100 p-3 hover:bg-slate-50"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-medium text-slate-900">{project.name}</h3>
                    <div className="flex gap-2">
                      <StatusBadge status={project.status} />
                      <PriorityBadge priority={project.priority} />
                    </div>
                  </div>
                  <ProgressBar value={getProjectProgress(project.id, tasks)} />
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Task Status Overview</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">To Do</span>
              <span className="text-lg font-semibold text-slate-900">
                {taskStatusOverview.todo}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
              <span className="text-sm font-medium text-blue-700">In Progress</span>
              <span className="text-lg font-semibold text-blue-900">
                {taskStatusOverview.inProgress}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-3">
              <span className="text-sm font-medium text-emerald-700">Done</span>
              <span className="text-lg font-semibold text-emerald-900">
                {taskStatusOverview.done}
              </span>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Project Progress</h2>
        {projects.length === 0 ? (
          <p className="text-sm text-slate-500">No projects yet</p>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="rounded-lg border border-slate-100 p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-slate-900">{project.name}</h3>
                    <p className="text-sm text-slate-500">Due {formatDate(project.dueDate)}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <ProgressBar value={getProjectProgress(project.id, tasks)} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
