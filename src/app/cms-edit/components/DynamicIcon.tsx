/* eslint-disable @next/next/no-img-element */
export const formatIconName = (name: string) => {
  // Convert camelCase or PascalCase to kebab-case
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

interface DynamicIconProps {
  name: string;
  size: number;
  color?: string;
}

export default function DynamicIcon({ name, size, color }: DynamicIconProps) {
  const iconName = formatIconName(name);
  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/lucide-static/icons/${iconName}.svg`}
      width={size}
      height={size}
      alt={name}
      className="inline-block"
      style={{
        width: size,
        height: size,
        filter: color
          ? `invert(1) sepia(1) saturate(0) hue-rotate(180deg) brightness(100%) contrast(100%) drop-shadow(0 0 0 ${color})`
          : undefined,
      }}
    />
  );
}
