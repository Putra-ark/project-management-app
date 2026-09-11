export default function ProgressBar({ value }) {
  const progress = Math.min(Math.max(value, 0), 100);

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
        <span>Progress</span>
        <span className="font-medium text-slate-700">{progress}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
