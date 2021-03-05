import InputError from "./input-error";

export default function Input({
  name,
  label,
  error,
  value,
  onChange,
  style,
  ...props
}) {
  return (
    <label className="w-full block mb-4">
      <input
        className={`w-full p-2 focus:outline-none rounded border text-black focus:border-flw ${style}`}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && error[name] && <InputError message={error[name]} />}
    </label>
  );
}
