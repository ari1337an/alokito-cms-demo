/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DynamicIcon from "../DynamicIcon";

interface RenderButtonProps {
  buttonText: string;
  buttonLink: string;
  buttonVariant: string;
  buttonIcon: string;
  buttonIconSize: number;
  buttonGap: number;
  buttonPaddingTop: number;
  buttonPaddingBottom: number;
  buttonPaddingLeft: number;
  buttonPaddingRight: number;
  buttonBgColor: string;
  buttonTextColor: string;
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
  buttonGap,
  buttonPaddingTop,
  buttonPaddingBottom,
  buttonPaddingLeft,
  buttonPaddingRight,
  buttonBgColor,
  buttonTextColor,
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
  };

  // Common button class names
  const buttonClassNames = cn(
    compact ? "text-base" : "text-lg",
    `font-[${contentFont}]`,
    "w-full md:w-auto" // Full width on mobile, auto width on md and up
  );

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
              color={buttonVariant === "custom" ? buttonTextColor : undefined}
            />
          )}
        </span>
      </Button>
    );
  }

  return (
    <div className="w-full md:w-auto">
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
                color={buttonVariant === "custom" ? buttonTextColor : undefined}
              />
            )}
          </span>
        </a>
      </Button>
    </div>
  );
}
