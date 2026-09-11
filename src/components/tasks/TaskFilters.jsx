export default function TaskFilters({
  filters,
  projects,
  onChange,
}) {
  function handleChange(event) {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  }

  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
          Search
        </label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Search tasks..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
          Status
        </label>
        <select
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
          Priority
        </label>
        <select
          name="priority"
          value={filters.priority}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
          Project
        </label>
        <select
          name="projectId"
          value={filters.projectId}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="All">All</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
