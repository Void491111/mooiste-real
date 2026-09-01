"use client";

type ToggleSwitchProps = {
  checked: boolean;
  label: string;
  disabled?: boolean;
  onChange: () => void;
};

export function ToggleSwitch({
  checked,
  label,
  disabled,
  onChange,
}: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-40 ${
        checked ? "bg-stock-ok" : "bg-muted-foreground/30"
      }`}
    >
      <span
        className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}