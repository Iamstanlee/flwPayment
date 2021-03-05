export default function Btn({
  label,
  onClick,
  loading,
  disabled = false,
  type = "submit",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-flw p-2 rounded shadow-sm text-white focus:outline-none"
    >
      <span className="text-sm">{loading ? "Please wait..." : label}</span>
    </button>
  );
}
