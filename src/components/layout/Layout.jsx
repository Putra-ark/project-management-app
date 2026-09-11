import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const titles = {
  "/": "Dashboard",
  "/projects": "Projects",
  "/tasks": "Tasks",
  "/board": "Kanban Board",
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const title = location.pathname.startsWith("/projects/")
    ? "Project Detail"
    : titles[location.pathname] || "TaskFlow";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
