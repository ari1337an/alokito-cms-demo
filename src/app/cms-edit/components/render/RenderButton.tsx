/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DynamicIcon from "./DynamicIcon";

interface RenderButtonProps {
  buttonText: string;
  buttonLink: string;
  buttonVariant: string;
  buttonIcon: string;
  buttonIconSize: number;
  buttonIconColor?: string;
  buttonGap: number;
  buttonPaddingTop: number;
  buttonPaddingBottom: number;
  buttonPaddingLeft: number;
  buttonPaddingRight: number;
  buttonBgColor: string;
  buttonTextColor: string;
  buttonWidth?: string;
  buttonCustomWidth?: number;
  contentFont: string;
  compact?: boolean;
  onClick?: () => void;
}

export default function RenderButton({
  buttonText,
  buttonLink,
  buttonVariant,
  buttonIcon,
  buttonIconSize,
  buttonIconColor,
  buttonGap,
  buttonPaddingTop,
  buttonPaddingBottom,
  buttonPaddingLeft,
  buttonPaddingRight,
  buttonBgColor,
  buttonTextColor,
  buttonWidth = "auto",
  buttonCustomWidth = 200,
  contentFont,
  compact = false,
  onClick,
}: RenderButtonProps) {
  // Common button styles
  const buttonStyles = {
    paddingTop: `${buttonPaddingTop * (compact ? 2 : 4)}px`,
    paddingBottom: `${buttonPaddingBottom * (compact ? 2 : 4)}px`,
    paddingLeft: `${buttonPaddingLeft * (compact ? 2 : 4)}px`,
    paddingRight: `${buttonPaddingRight * (compact ? 2 : 4)}px`,
    ...(buttonVariant === "custom" && {
      backgroundColor: buttonBgColor,
      color: buttonTextColor,
      border: "none",
    }),
    ...(buttonWidth === "custom" && {
      width: `${buttonCustomWidth}px`,
    }),
    fontWeight: "bold",
  };

  // Determine button container class based on width
  const containerClass = cn(
    buttonWidth === "full" ? "w-full" : "w-auto",
    "md:w-auto"
  );

  // Common button class names
  const buttonClassNames = cn(
    compact ? "text-base" : "text-lg",
    `font-[${contentFont}]`,
    buttonWidth === "full" ? "w-full" : "w-auto" // Full width only when explicitly set
  );

  // Determine icon color (use dedicated icon color if available, otherwise fall back to text color for custom variant)
  const iconColor =
    buttonVariant === "custom" ? buttonIconColor || buttonTextColor : undefined;

  if (onClick) {
    return (
      <Button
        variant={
          buttonVariant === "custom" ? "outline" : (buttonVariant as any)
        }
        className={buttonClassNames}
        style={buttonStyles}
        onClick={onClick}
      >
        <span
          className={`inline-flex items-center justify-center gap-${buttonGap}`}
        >
          {buttonText}
          {buttonIcon && (
            <DynamicIcon
              name={buttonIcon}
              size={compact ? buttonIconSize * 0.75 : buttonIconSize}
              color={iconColor}
            />
          )}
        </span>
      </Button>
    );
  }

  return (
    <div className={containerClass}>
      <Button
        variant={
          buttonVariant === "custom" ? "outline" : (buttonVariant as any)
        }
        asChild
        className={buttonClassNames}
        style={buttonStyles}
      >
        <a
          href={buttonLink}
          className="w-full flex items-center justify-center"
        >
          <span
            className={`inline-flex items-center justify-center gap-${buttonGap}`}
          >
            {buttonText}
            {buttonIcon && (
              <DynamicIcon
                name={buttonIcon}
                size={compact ? buttonIconSize * 0.75 : buttonIconSize}
                color={iconColor}
              />
            )}
          </span>
        </a>
      </Button>
    </div>
  );
}
