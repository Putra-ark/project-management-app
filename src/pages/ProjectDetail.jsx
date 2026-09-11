import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import ProgressBar from "../components/ProgressBar";
import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import Modal from "../components/Modal";
import { formatDate, getProjectProgress } from "../utils/helpers";

export default function ProjectDetail({
  projects,
  tasks,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onChangeTaskStatus,
}) {
  const { id } = useParams();
  const projectId = Number(id);

  const project = projects.find((item) => item.id === projectId);
  const projectTasks = useMemo(
    () => tasks.filter((task) => task.projectId === projectId),
    [tasks, projectId]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  if (!project) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="mb-4 text-slate-500">Project not found</p>
        <Link
          to="/projects"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  function openCreateModal() {
    setEditingTask(null);
    setIsModalOpen(true);
  }

  function openEditModal(task) {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  function handleSubmit(formData) {
    if (editingTask) {
      onUpdateTask(editingTask.id, formData);
    } else {
      onCreateTask(formData);
    }
    closeModal();
  }

  function handleDelete(task) {
    const confirmed = window.confirm(`Delete task "${task.title}"?`);
    if (confirmed) {
      onDeleteTask(task.id);
    }
  }

  const progress = getProjectProgress(project.id, tasks);

  return (
    <div className="space-y-6">
      <Link to="/projects" className="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700">
        ← Back to Projects
      </Link>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{project.name}</h2>
            <p className="mt-2 max-w-3xl text-slate-600">{project.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={project.status} />
            <PriorityBadge priority={project.priority} />
          </div>
        </div>

        <div className="mb-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
          <p>
            <span className="font-medium text-slate-700">Start:</span>{" "}
            {formatDate(project.startDate)}
          </p>
          <p>
            <span className="font-medium text-slate-700">Due:</span>{" "}
            {formatDate(project.dueDate)}
          </p>
          <p>
            <span className="font-medium text-slate-700">Tasks:</span> {projectTasks.length}
          </p>
          <p>
            <span className="font-medium text-slate-700">Completed:</span>{" "}
            {projectTasks.filter((task) => task.status === "Done").length}
          </p>
        </div>

        <ProgressBar value={progress} />
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">Project Tasks</h3>
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            + Add Task
          </button>
        </div>

        {projectTasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="mb-4 text-slate-500">No tasks found</p>
            <button
              type="button"
              onClick={openCreateModal}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              + Add Task
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {projectTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                projects={projects}
                showProject={false}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onStatusChange={onChangeTaskStatus}
              />
            ))}
          </div>
        )}
      </section>

      <Modal
        isOpen={isModalOpen}
        title={editingTask ? "Edit Task" : "New Task"}
        onClose={closeModal}
      >
        <TaskForm
          key={editingTask ? editingTask.id : "new-task"}
          initialData={editingTask}
          projects={projects}
          defaultProjectId={project.id}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
