import { useState } from "react";

const emptyForm = {
  name: "",
  description: "",
  status: "Planning",
  priority: "Medium",
  startDate: "",
  dueDate: "",
};

function getInitialForm(initialData) {
  if (!initialData) return emptyForm;

  return {
    name: initialData.name || "",
    description: initialData.description || "",
    status: initialData.status || "Planning",
    priority: initialData.priority || "Medium",
    startDate: initialData.startDate || "",
    dueDate: initialData.dueDate || "",
  };
}

export default function ProjectForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => getInitialForm(initialData));
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.description.trim()) nextErrors.description = "Description is required";
    if (!form.startDate) nextErrors.startDate = "Start date is required";
    if (!form.dueDate) nextErrors.dueDate = "Due date is required";

    if (form.startDate && form.dueDate && form.dueDate < form.startDate) {
      nextErrors.dueDate = "Due date cannot be before start date";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          {errors.startDate && (
            <p className="mt-1 text-xs text-rose-600">{errors.startDate}</p>
          )}
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
          {initialData ? "Update Project" : "Create Project"}
        </button>
      </div>
    </form>
  );
}
