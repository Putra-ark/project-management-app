import { mockProjects, mockTasks } from "../data/mockData";

const PROJECTS_KEY = "pm_projects";
const TASKS_KEY = "pm_tasks";

export function loadProjects() {
  const saved = localStorage.getItem(PROJECTS_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(mockProjects));
  return mockProjects;
}

export function loadTasks() {
  const saved = localStorage.getItem(TASKS_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  localStorage.setItem(TASKS_KEY, JSON.stringify(mockTasks));
  return mockTasks;
}

export function saveProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function saveTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
