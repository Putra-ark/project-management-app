import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  projectId: "",
  status: "To Do",
  priority: "Medium",
  dueDate: "",
};

function getInitialForm(initialData, defaultProjectId) {
  if (initialData) {
    return {
      title: initialData.title || "",
      description: initialData.description || "",
      projectId: String(initialData.projectId || ""),
      status: initialData.status || "To Do",
      priority: initialData.priority || "Medium",
      dueDate: initialData.dueDate || "",
    };
  }

  return {
    ...emptyForm,
    projectId: defaultProjectId ? String(defaultProjectId) : "",
  };
}

export default function TaskForm({
  initialData,
  projects,
  defaultProjectId,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(() => getInitialForm(initialData, defaultProjectId));
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = "Title is required";
    if (!form.description.trim()) nextErrors.description = "Description is required";
    if (!form.projectId) nextErrors.projectId = "Project is required";
    if (!form.dueDate) nextErrors.dueDate = "Due date is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...form,
      projectId: Number(form.projectId),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-rose-600">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Project</label>
        <select
          name="projectId"
          value={form.projectId}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        {errors.projectId && (
          <p className="mt-1 text-xs text-rose-600">{errors.projectId}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Priority</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        {errors.dueDate && <p className="mt-1 text-xs text-rose-600">{errors.dueDate}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
