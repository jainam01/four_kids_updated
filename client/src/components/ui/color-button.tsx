import { cn } from "@/lib/utils";

interface ColorButtonProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

export function ColorButton({ color, selected, onClick }: ColorButtonProps) {
  const colorMap: Record<string, string> = {
    'red': 'bg-red-500',
    'blue': 'bg-blue-500',
    'green': 'bg-green-500',
    'yellow': 'bg-yellow-500',
    'purple': 'bg-purple-500',
    'black': 'bg-gray-800',
    'white': 'bg-white border border-gray-300',
    'gray': 'bg-gray-500',
    'navy': 'bg-blue-900',
    'pink': 'bg-pink-500',
    'beige': 'bg-yellow-100',
    'khaki': 'bg-yellow-700',
    'orange': 'bg-orange-500',
    'brown': 'bg-amber-800',
    'default': 'bg-gray-400'
  };

  const bgColorClass = colorMap[color.toLowerCase()] || colorMap.default;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-8 h-8 rounded-full border-2 hover:scale-110 transition",
        bgColorClass,
        selected ? "border-primary scale-110" : "border-white shadow-sm"
      )}
      title={color}
      aria-label={selected ? `${color} (selected)` : color}
    />
  );
}
