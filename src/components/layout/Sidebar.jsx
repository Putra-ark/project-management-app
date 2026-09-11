import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/tasks", label: "Tasks" },
  { to: "/board", label: "Board" },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-slate-200 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Portfolio
          </p>
          <h1 className="mt-1 text-xl font-bold text-slate-900">TaskFlow</h1>
          <p className="mt-1 text-sm text-slate-500">Project Management</p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
