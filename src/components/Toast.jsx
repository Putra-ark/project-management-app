import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const bgColor = type === "error" ? "bg-rose-600" : "bg-emerald-600";

  return (
    <div className="fixed right-4 top-4 z-50 max-w-sm">
      <div className={`${bgColor} rounded-lg px-4 py-3 text-sm text-white shadow-lg`}>
        {message}
      </div>
    </div>
  );
}
