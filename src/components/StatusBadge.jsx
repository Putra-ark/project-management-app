const statusStyles = {
  Planning: "bg-slate-100 text-slate-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
  "To Do": "bg-slate-100 text-slate-700",
  Done: "bg-emerald-100 text-emerald-700",
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || "bg-slate-100 text-slate-700";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      {status}
    </span>
  );
}
