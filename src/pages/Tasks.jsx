import { useMemo, useState } from "react";
import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import TaskFilters from "../components/tasks/TaskFilters";
import Modal from "../components/Modal";

export default function Tasks({
  projects,
  tasks,
  onCreate,
  onUpdate,
  onDelete,
  onChangeStatus,
}) {
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    priority: "All",
    projectId: "All",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        filters.search === "" ||
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === "All" || task.status === filters.status;

      const matchesPriority =
        filters.priority === "All" || task.priority === filters.priority;

      const matchesProject =
        filters.projectId === "All" ||
        String(task.projectId) === String(filters.projectId);

      return matchesSearch && matchesStatus && matchesPriority && matchesProject;
    });
  }, [tasks, filters]);

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
      onUpdate(editingTask.id, formData);
    } else {
      onCreate(formData);
    }
    closeModal();
  }

  function handleDelete(task) {
    const confirmed = window.confirm(`Delete task "${task.title}"?`);
    if (confirmed) {
      onDelete(task.id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">All Tasks</h2>
          <p className="text-sm text-slate-500">Search, filter, and manage tasks</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          disabled={projects.length === 0}
        >
          + New Task
        </button>
      </div>

      <TaskFilters filters={filters} projects={projects} onChange={setFilters} />

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <p className="text-slate-500">Create a project first before adding tasks.</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <p className="mb-4 text-slate-500">No tasks found</p>
          <button
            type="button"
            onClick={openCreateModal}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            + New Task
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              projects={projects}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onStatusChange={onChangeStatus}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title={editingTask ? "Edit Task" : "New Task"}
        onClose={closeModal}
      >
        <TaskForm
          key={editingTask ? editingTask.id : "new-task"}
          initialData={editingTask}
          projects={projects}
          onSubmit={handleSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
