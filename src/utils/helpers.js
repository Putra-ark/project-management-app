export function getProjectProgress(projectId, tasks) {
  const projectTasks = tasks.filter((task) => task.projectId === projectId);

  if (projectTasks.length === 0) {
    return 0;
  }

  const completed = projectTasks.filter((task) => task.status === "Done").length;
  return Math.round((completed / projectTasks.length) * 100);
}

export function formatDate(dateString) {
  if (!dateString) return "—";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getNextId(items) {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.id)) + 1;
}

export function getProjectName(projects, projectId) {
  const project = projects.find((item) => item.id === projectId);
  return project ? project.name : "Unknown Project";
}
