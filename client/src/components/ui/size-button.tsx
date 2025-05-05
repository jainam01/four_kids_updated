import { cn } from "@/lib/utils";

interface SizeButtonProps {
  size: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function SizeButton({ size, selected, onClick, disabled = false }: SizeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-10 h-10 rounded-lg border font-semibold flex items-center justify-center transition",
        selected 
          ? "border-primary text-primary" 
          : "border-muted hover:border-primary hover:text-primary",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      aria-pressed={selected}
    >
      {size}
    </button>
  );
}
