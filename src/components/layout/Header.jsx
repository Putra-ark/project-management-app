export default function Header({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 lg:hidden"
        >
          Menu
        </button>
        <div>
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">Manage projects and tasks in one place</p>
        </div>
      </div>
    </header>
  );
}
