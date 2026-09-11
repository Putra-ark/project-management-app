import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Toast from "./components/Toast";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Tasks from "./pages/Tasks";
import Board from "./pages/Board";
import NotFound from "./pages/NotFound";
import { loadProjects, loadTasks, saveProjects, saveTasks } from "./utils/storage";
import { getNextId } from "./utils/helpers";

function App() {
  const [projects, setProjects] = useState(() => loadProjects());
  const [tasks, setTasks] = useState(() => loadTasks());
  const [toast, setToast] = useState({ message: "", type: "success", id: 0 });

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  function createProject(formData) {
    const newProject = {
      id: getNextId(projects),
      ...formData,
    };
    setProjects((prev) => [...prev, newProject]);
    showToast("Project created successfully");
  }

  function updateProject(id, formData) {
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, ...formData } : project))
    );
    showToast("Project updated successfully");
  }

  function deleteProject(id) {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    setTasks((prev) => prev.filter((task) => task.projectId !== id));
    showToast("Project deleted successfully");
  }

  function createTask(formData) {
    const newTask = {
      id: getNextId(tasks),
      ...formData,
    };
    setTasks((prev) => [...prev, newTask]);
    showToast("Task created successfully");
  }

  function updateTask(id, formData) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...formData } : task))
    );
    showToast("Task updated successfully");
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    showToast("Task deleted successfully");
  }

  function changeTaskStatus(id, status) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
    showToast("Task updated successfully");
  }

  return (
    <BrowserRouter>
      <Toast
        key={toast.id}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, message: "" }))}
      />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard projects={projects} tasks={tasks} />} />
          <Route
            path="projects"
            element={
              <Projects
                projects={projects}
                tasks={tasks}
                onCreate={createProject}
                onUpdate={updateProject}
                onDelete={deleteProject}
              />
            }
          />
          <Route
            path="projects/:id"
            element={
              <ProjectDetail
                projects={projects}
                tasks={tasks}
                onCreateTask={createTask}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onChangeTaskStatus={changeTaskStatus}
              />
            }
          />
          <Route
            path="tasks"
            element={
              <Tasks
                projects={projects}
                tasks={tasks}
                onCreate={createTask}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onChangeStatus={changeTaskStatus}
              />
            }
          />
          <Route
            path="board"
            element={
              <Board
                projects={projects}
                tasks={tasks}
                onChangeStatus={changeTaskStatus}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
