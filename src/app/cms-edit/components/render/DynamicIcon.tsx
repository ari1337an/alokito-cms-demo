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

// Helper function to create a CSS filter for a specific color
function createColorFilter(color: string) {
  // If it's a hex color, convert it to RGB
  let r, g, b;

  if (color.startsWith("#")) {
    // Remove # and convert to RGB
    const hex = color.slice(1);
    const bigint = parseInt(hex, 16);
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  } else if (color.startsWith("rgb")) {
    // Extract RGB values from rgb/rgba string
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (match) {
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    } else {
      // Default to black if unable to parse
      r = 0;
      g = 0;
      b = 0;
    }
  } else {
    // For named colors or other formats, use a simpler approach
    return `brightness(0) saturate(100%) invert(1) sepia(0) saturate(0) hue-rotate(0deg) brightness(2) drop-shadow(0 0 0 ${color})`;
  }

  // Calculate filter values based on RGB
  // This approach works better for a wider range of colors
  return `invert(${r / 255}) sepia(${g / 255}) saturate(${
    b / 255
  }) hue-rotate(${Math.round(
    (Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180) / Math.PI
  )}deg)`;
}

export default function DynamicIcon({ name, size, color }: DynamicIconProps) {
  const iconName = formatIconName(name);

  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/lucide-static/icons/${iconName}.svg`}
      width={size}
      height={size}
      alt={name}
      className="inline-block stroke-2"
      style={{
        width: size,
        height: size,
        filter: color ? createColorFilter(color) : undefined,
      }}
    />
  );
}
