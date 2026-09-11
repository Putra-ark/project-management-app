const priorityStyles = {
  Low: "bg-sky-100 text-sky-700",
  Medium: "bg-amber-100 text-amber-700",
  High: "bg-rose-100 text-rose-700",
};

export default function PriorityBadge({ priority }) {
  const style = priorityStyles[priority] || "bg-slate-100 text-slate-700";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      {priority}
    </span>
  );
}
