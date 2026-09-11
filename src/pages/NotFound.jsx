import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-xl border border-slate-200 bg-white px-8 py-12 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">404</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">Page not found</h2>
        <p className="mt-2 text-slate-500">The page you are looking for does not exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
