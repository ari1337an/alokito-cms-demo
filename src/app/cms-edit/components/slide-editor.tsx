/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useRef, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLucideIcons } from "@/hooks/use-lucide-icons";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Slide {
  id?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary"
    | "custom";
  buttonIcon: string;
  buttonIconSize: number;
  buttonGap: number;
  buttonPaddingX: number;
  buttonPaddingY: number;
  imageUrl: string;
  imageFit: "contain" | "cover" | "fill" | "none" | "scale-down";
  imageBackground: "transparent" | "solid";
  imageBackgroundColor?: string;
  backgroundColor: string;
  imageMargin: string;
  imagePadding: string;
  heroImageUrl: string;
  heroImageFit: "contain" | "cover" | "fill" | "none" | "scale-down";
  heroImageBackground: "transparent" | "solid";
  heroImageBackgroundColor?: string;
  heroImageMargin: string;
  heroImagePadding: string;
  contentPaddingX: number;
  contentPaddingY: number;
  contentFont: string;
  titleFontSize: number;
  titleFontWeight: number;
  descriptionFontSize: number;
  descriptionFontWeight: number;
  titleColor: string;
  descriptionColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
}

interface SlideEditorProps {
  slide: Slide;
  onSave: (slide: Slide) => void;
  onCancel: () => void;
}

const formatIconName = (name: string) => {
  // Convert camelCase or PascalCase to kebab-case
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};

const DynamicIcon = ({
  name,
  size,
  color,
}: {
  name: string;
  size: number;
  color?: string;
}) => {
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
};

export function SlideEditor({ slide, onSave, onCancel }: SlideEditorProps) {
  const [editedSlide, setEditedSlide] = useState(slide);
  const { icons, loading, hasMore, loadMoreIcons, filterIcons } =
    useLucideIcons();
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastIconRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreIcons();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, loadMoreIcons]
  );

  const handleChange = (field: string, value: string) => {
    setEditedSlide((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Tabs defaultValue="edit" className="space-y-6">
      <TabsList>
        <TabsTrigger value="edit">Edit</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>

      <TabsContent value="edit">
        <div className="grid gap-6">
          {/* Content Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={editedSlide.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter the main heading"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={editedSlide.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Enter the description text"
                />
              </div>

              {/* Font */}
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Input
                  value={editedSlide.contentFont}
                  onChange={(e) => handleChange("contentFont", e.target.value)}
                  placeholder="Enter font name"
                />
                <p className="text-sm text-muted-foreground">
                  Example: Inter, Roboto, etc.
                </p>
              </div>

              {/* Padding Controls */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Horizontal Padding</Label>
                    <span className="text-sm text-muted-foreground">
                      {editedSlide.contentPaddingX}px
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={24}
                    step={1}
                    value={[editedSlide.contentPaddingX]}
                    onValueChange={([value]) =>
                      handleChange("contentPaddingX", value.toString())
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Vertical Padding</Label>
                    <span className="text-sm text-muted-foreground">
                      {editedSlide.contentPaddingY}px
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={24}
                    step={1}
                    value={[editedSlide.contentPaddingY]}
                    onValueChange={([value]) =>
                      handleChange("contentPaddingY", value.toString())
                    }
                  />
                </div>
              </div>

              {/* Title Font Controls */}
              <div className="space-y-4">
                <Label className="text-base">Title Typography</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Font Size</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.titleFontSize}px
                      </span>
                    </div>
                    <Slider
                      min={16}
                      max={96}
                      step={1}
                      value={[editedSlide.titleFontSize]}
                      onValueChange={([value]) =>
                        handleChange("titleFontSize", value.toString())
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Font Weight</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.titleFontWeight}
                      </span>
                    </div>
                    <Select
                      value={editedSlide.titleFontWeight.toString()}
                      onValueChange={(value) =>
                        handleChange("titleFontWeight", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select weight" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">Light (300)</SelectItem>
                        <SelectItem value="400">Regular (400)</SelectItem>
                        <SelectItem value="500">Medium (500)</SelectItem>
                        <SelectItem value="600">Semibold (600)</SelectItem>
                        <SelectItem value="700">Bold (700)</SelectItem>
                        <SelectItem value="800">Extrabold (800)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Description Font Controls */}
              <div className="space-y-4">
                <Label className="text-base">Description Typography</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Font Size</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.descriptionFontSize}px
                      </span>
                    </div>
                    <Slider
                      min={12}
                      max={48}
                      step={1}
                      value={[editedSlide.descriptionFontSize]}
                      onValueChange={([value]) =>
                        handleChange("descriptionFontSize", value.toString())
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Font Weight</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.descriptionFontWeight}
                      </span>
                    </div>
                    <Select
                      value={editedSlide.descriptionFontWeight.toString()}
                      onValueChange={(value) =>
                        handleChange("descriptionFontWeight", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select weight" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300">Light (300)</SelectItem>
                        <SelectItem value="400">Regular (400)</SelectItem>
                        <SelectItem value="500">Medium (500)</SelectItem>
                        <SelectItem value="600">Semibold (600)</SelectItem>
                        <SelectItem value="700">Bold (700)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Title Color */}
              <div className="space-y-2">
                <Label>Title Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={editedSlide.titleColor}
                    onChange={(e) => handleChange("titleColor", e.target.value)}
                    className="w-20 p-1 h-10"
                  />
                  <Input
                    value={editedSlide.titleColor}
                    onChange={(e) => handleChange("titleColor", e.target.value)}
                    placeholder="#000000"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Description Color */}
              <div className="space-y-2">
                <Label>Description Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={editedSlide.descriptionColor}
                    onChange={(e) =>
                      handleChange("descriptionColor", e.target.value)
                    }
                    className="w-20 p-1 h-10"
                  />
                  <Input
                    value={editedSlide.descriptionColor}
                    onChange={(e) =>
                      handleChange("descriptionColor", e.target.value)
                    }
                    placeholder="#374151"
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Content Preview */}
              <div className="pt-2">
                <Label>Preview</Label>
                <div className="mt-2 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="space-y-4">
                    <h1
                      className={cn(
                        "leading-tight",
                        `font-[${editedSlide.contentFont}]`
                      )}
                      style={{
                        fontSize: `${editedSlide.titleFontSize}px`,
                        fontWeight: editedSlide.titleFontWeight,
                        color: editedSlide.titleColor,
                      }}
                    >
                      {editedSlide.title}
                    </h1>
                    <p
                      className={cn(`font-[${editedSlide.contentFont}]`)}
                      style={{
                        fontSize: `${editedSlide.descriptionFontSize}px`,
                        fontWeight: editedSlide.descriptionFontWeight,
                        color: editedSlide.descriptionColor,
                      }}
                    >
                      {editedSlide.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Button Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Call to Action Button
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input
                    value={editedSlide.buttonText}
                    onChange={(e) => handleChange("buttonText", e.target.value)}
                    placeholder="Enter button text"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Button Link</Label>
                  <Input
                    value={editedSlide.buttonLink}
                    onChange={(e) => handleChange("buttonLink", e.target.value)}
                    placeholder="/your-link"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Button Style</Label>
                  <Select
                    value={editedSlide.buttonVariant}
                    onValueChange={(value) =>
                      handleChange("buttonVariant", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select button style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="destructive">Destructive</SelectItem>
                      <SelectItem value="outline">Outline</SelectItem>
                      <SelectItem value="ghost">Ghost</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Add custom color controls when custom variant is selected */}
                {editedSlide.buttonVariant === "custom" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Background Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={editedSlide.buttonBgColor}
                          onChange={(e) =>
                            handleChange("buttonBgColor", e.target.value)
                          }
                          className="w-20 p-1 h-10"
                        />
                        <Input
                          value={editedSlide.buttonBgColor}
                          onChange={(e) =>
                            handleChange("buttonBgColor", e.target.value)
                          }
                          placeholder="#000000"
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={editedSlide.buttonTextColor}
                          onChange={(e) =>
                            handleChange("buttonTextColor", e.target.value)
                          }
                          className="w-20 p-1 h-10"
                        />
                        <Input
                          value={editedSlide.buttonTextColor}
                          onChange={(e) =>
                            handleChange("buttonTextColor", e.target.value)
                          }
                          placeholder="#ffffff"
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <Select
                    value={editedSlide.buttonIcon || "none"}
                    onValueChange={(value) =>
                      handleChange("buttonIcon", value === "none" ? "" : value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an icon">
                        {editedSlide.buttonIcon && (
                          <span className="inline-flex items-center gap-2">
                            <DynamicIcon
                              name={editedSlide.buttonIcon}
                              size={16}
                              color={
                                editedSlide.buttonVariant === "custom"
                                  ? editedSlide.buttonTextColor
                                  : undefined
                              }
                            />
                            {editedSlide.buttonIcon}
                          </span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="p-0 overflow-hidden">
                      <Command className="w-full">
                        <CommandInput
                          placeholder="Search icons..."
                          onValueChange={filterIcons}
                          className="border-none focus:ring-0"
                        />
                        <CommandList className="max-h-[200px] overflow-y-auto">
                          <CommandEmpty className="py-2 text-center text-sm">
                            No icons found.
                          </CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value="none"
                              onSelect={() => {
                                handleChange("buttonIcon", "");
                                const trigger =
                                  document.activeElement as HTMLElement;
                                trigger?.blur();
                              }}
                              className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-3 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground"
                            >
                              <span className="inline-flex items-center gap-2">
                                No Icon
                              </span>
                            </CommandItem>
                            {icons.map((icon, index) => (
                              <CommandItem
                                key={icon}
                                value={icon}
                                onSelect={() => {
                                  handleChange("buttonIcon", icon);
                                  const trigger =
                                    document.activeElement as HTMLElement;
                                  trigger?.blur();
                                }}
                                ref={
                                  index === icons.length - 1
                                    ? lastIconRef
                                    : undefined
                                }
                                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-3 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground"
                              >
                                <span className="inline-flex items-center gap-2">
                                  <DynamicIcon
                                    name={icon}
                                    size={16}
                                    color={
                                      editedSlide.buttonVariant === "custom"
                                        ? editedSlide.buttonTextColor
                                        : undefined
                                    }
                                  />
                                  {formatIconName(icon)}
                                </span>
                              </CommandItem>
                            ))}
                            {loading && (
                              <div className="py-2 text-center text-sm text-muted-foreground">
                                Loading more icons...
                              </div>
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Icon Size</Label>
                    <span className="text-sm text-muted-foreground">
                      {editedSlide.buttonIconSize}px
                    </span>
                  </div>
                  <Slider
                    min={12}
                    max={24}
                    step={1}
                    value={[editedSlide.buttonIconSize]}
                    onValueChange={([value]) =>
                      handleChange("buttonIconSize", value.toString())
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Text-Icon Gap</Label>
                    <span className="text-sm text-muted-foreground">
                      {editedSlide.buttonGap}px
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={8}
                    step={1}
                    value={[editedSlide.buttonGap]}
                    onValueChange={([value]) =>
                      handleChange("buttonGap", value.toString())
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Horizontal Padding</Label>
                    <span className="text-sm text-muted-foreground">
                      {editedSlide.buttonPaddingX}px
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={12}
                    step={1}
                    value={[editedSlide.buttonPaddingX]}
                    onValueChange={([value]) =>
                      handleChange("buttonPaddingX", value.toString())
                    }
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Vertical Padding</Label>
                    <span className="text-sm text-muted-foreground">
                      {editedSlide.buttonPaddingY}px
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={8}
                    step={1}
                    value={[editedSlide.buttonPaddingY]}
                    onValueChange={([value]) =>
                      handleChange("buttonPaddingY", value.toString())
                    }
                  />
                </div>
              </div>

              <div className="pt-2">
                <Label>Preview</Label>
                <div className="mt-2">
                  <Button
                    variant={
                      editedSlide.buttonVariant === "custom"
                        ? "outline"
                        : (editedSlide.buttonVariant as any)
                    }
                    className="text-lg"
                    style={{
                      padding: `${editedSlide.buttonPaddingY * 4}px ${
                        editedSlide.buttonPaddingX * 4
                      }px`,
                      ...(editedSlide.buttonVariant === "custom" && {
                        backgroundColor: editedSlide.buttonBgColor,
                        color: editedSlide.buttonTextColor,
                        border: "none",
                      }),
                    }}
                  >
                    <span
                      className={`inline-flex items-center gap-${editedSlide.buttonGap}`}
                    >
                      {editedSlide.buttonText}
                      {editedSlide.buttonIcon && (
                        <DynamicIcon
                          name={editedSlide.buttonIcon}
                          size={editedSlide.buttonIconSize}
                          color={
                            editedSlide.buttonVariant === "custom"
                              ? editedSlide.buttonTextColor
                              : undefined
                          }
                        />
                      )}
                    </span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hero Image Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Hero Section Background Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={editedSlide.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Margin</Label>
                  <RadioGroup
                    value={editedSlide.imageMargin}
                    onValueChange={(value) =>
                      handleChange("imageMargin", value)
                    }
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="margin-none" />
                      <Label htmlFor="margin-none">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mx-auto" id="margin-center" />
                      <Label htmlFor="margin-center">Center</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="m-auto" id="margin-all" />
                      <Label htmlFor="margin-all">Auto All</Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Top Margin</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.imageMargin.includes("mt-")
                          ? editedSlide.imageMargin.match(/mt-(\d+)/)?.[1] ||
                            "0"
                          : "0"}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={16}
                      step={1}
                      value={[
                        Number(
                          editedSlide.imageMargin.match(/mt-(\d+)/)?.[1] || 0
                        ),
                      ]}
                      onValueChange={([value]) => {
                        const newMargin = editedSlide.imageMargin
                          .replace(/mt-\d+/, "")
                          .concat(value > 0 ? ` mt-${value}` : "")
                          .trim();
                        handleChange("imageMargin", newMargin);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Bottom Margin</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.imageMargin.includes("mb-")
                          ? editedSlide.imageMargin.match(/mb-(\d+)/)?.[1] ||
                            "0"
                          : "0"}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={16}
                      step={1}
                      value={[
                        Number(
                          editedSlide.imageMargin.match(/mb-(\d+)/)?.[1] || 0
                        ),
                      ]}
                      onValueChange={([value]) => {
                        const newMargin = editedSlide.imageMargin
                          .replace(/mb-\d+/, "")
                          .concat(value > 0 ? ` mb-${value}` : "")
                          .trim();
                        handleChange("imageMargin", newMargin);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Left/Right Margin</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.imageMargin.includes("mx-")
                          ? editedSlide.imageMargin.match(/mx-(\d+)/)?.[1] ||
                            "0"
                          : "0"}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={16}
                      step={1}
                      value={[
                        Number(
                          editedSlide.imageMargin.match(/mx-(\d+)/)?.[1] || 0
                        ),
                      ]}
                      onValueChange={([value]) => {
                        const newMargin = editedSlide.imageMargin
                          .replace(/mx-\d+/, "")
                          .concat(value > 0 ? ` mx-${value}` : "")
                          .trim();
                        handleChange("imageMargin", newMargin);
                      }}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Padding</Label>
                  <RadioGroup
                    value={editedSlide.imagePadding}
                    onValueChange={(value) =>
                      handleChange("imagePadding", value)
                    }
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="padding-none" />
                      <Label htmlFor="padding-none">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="p-4" id="padding-all" />
                      <Label htmlFor="padding-all">Equal All Sides</Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Top/Bottom Padding</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.imagePadding.includes("py-")
                          ? editedSlide.imagePadding.match(/py-(\d+)/)?.[1] ||
                            "0"
                          : "0"}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={16}
                      step={1}
                      value={[
                        Number(
                          editedSlide.imagePadding.match(/py-(\d+)/)?.[1] || 0
                        ),
                      ]}
                      onValueChange={([value]) => {
                        const newPadding = editedSlide.imagePadding
                          .replace(/py-\d+/, "")
                          .concat(value > 0 ? ` py-${value}` : "")
                          .trim();
                        handleChange("imagePadding", newPadding);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Left/Right Padding</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.imagePadding.includes("px-")
                          ? editedSlide.imagePadding.match(/px-(\d+)/)?.[1] ||
                            "0"
                          : "0"}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={16}
                      step={1}
                      value={[
                        Number(
                          editedSlide.imagePadding.match(/px-(\d+)/)?.[1] || 0
                        ),
                      ]}
                      onValueChange={([value]) => {
                        const newPadding = editedSlide.imagePadding
                          .replace(/px-\d+/, "")
                          .concat(value > 0 ? ` px-${value}` : "")
                          .trim();
                        handleChange("imagePadding", newPadding);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Image Fitting Style</Label>
                <Select
                  value={editedSlide.imageFit}
                  onValueChange={(value) => handleChange("imageFit", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fitting style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contain">
                      Contain - Preserve aspect ratio
                    </SelectItem>
                    <SelectItem value="cover">
                      Cover - Fill while preserving aspect ratio
                    </SelectItem>
                    <SelectItem value="fill">Fill - Stretch to fit</SelectItem>
                    <SelectItem value="none">None - Original size</SelectItem>
                    <SelectItem value="scale-down">
                      Scale down - Contain or original size
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Image Background</Label>
                <Select
                  value={editedSlide.imageBackground}
                  onValueChange={(value) => {
                    handleChange("imageBackground", value);
                    if (value === "transparent") {
                      handleChange("imageBackgroundColor", "");
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select background type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transparent">Transparent</SelectItem>
                    <SelectItem value="solid">Solid Color</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {editedSlide.imageBackground === "solid" && (
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={editedSlide.imageBackgroundColor || "#ffffff"}
                      onChange={(e) =>
                        handleChange("imageBackgroundColor", e.target.value)
                      }
                      className="w-20 p-1 h-10"
                    />
                    <Input
                      value={editedSlide.imageBackgroundColor || "#ffffff"}
                      onChange={(e) =>
                        handleChange("imageBackgroundColor", e.target.value)
                      }
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "w-full rounded-lg overflow-hidden",
                  "ring-2 ring-gray-200 dark:ring-gray-800",
                  "bg-gray-50 dark:bg-gray-900/50",
                  editedSlide.imageMargin,
                  editedSlide.imagePadding,
                  editedSlide.imageBackground === "transparent" &&
                    "bg-[url('/checkered-pattern.png')] bg-repeat"
                )}
                style={
                  editedSlide.imageBackground === "solid"
                    ? {
                        backgroundColor: editedSlide.imageBackgroundColor,
                      }
                    : undefined
                }
              >
                <img
                  src={editedSlide.imageUrl}
                  alt="Preview"
                  className={`w-full h-full object-${editedSlide.imageFit}`}
                />
              </div>
            </CardContent>
          </Card>

          {/* Hero Image Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Hero Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={editedSlide.heroImageUrl}
                  onChange={(e) => handleChange("heroImageUrl", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Margin</Label>
                  <RadioGroup
                    value={editedSlide.heroImageMargin}
                    onValueChange={(value) =>
                      handleChange("heroImageMargin", value)
                    }
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="hero-margin-none" />
                      <Label htmlFor="hero-margin-none">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mx-auto" id="hero-margin-center" />
                      <Label htmlFor="hero-margin-center">Center</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="m-auto" id="hero-margin-all" />
                      <Label htmlFor="hero-margin-all">Auto All</Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Top Margin</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.heroImageMargin.includes("mt-")
                          ? editedSlide.heroImageMargin.match(
                              /mt-(\d+)/
                            )?.[1] || "0"
                          : "0"}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={16}
                      step={1}
                      value={[
                        Number(
                          editedSlide.heroImageMargin.match(/mt-(\d+)/)?.[1] ||
                            0
                        ),
                      ]}
                      onValueChange={([value]) => {
                        const newMargin = editedSlide.heroImageMargin
                          .replace(/mt-\d+/, "")
                          .concat(value > 0 ? ` mt-${value}` : "")
                          .trim();
                        handleChange("heroImageMargin", newMargin);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Bottom Margin</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.heroImageMargin.includes("mb-")
                          ? editedSlide.heroImageMargin.match(
                              /mb-(\d+)/
                            )?.[1] || "0"
                          : "0"}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={16}
                      step={1}
                      value={[
                        Number(
                          editedSlide.heroImageMargin.match(/mb-(\d+)/)?.[1] ||
                            0
                        ),
                      ]}
                      onValueChange={([value]) => {
                        const newMargin = editedSlide.heroImageMargin
                          .replace(/mb-\d+/, "")
                          .concat(value > 0 ? ` mb-${value}` : "")
                          .trim();
                        handleChange("heroImageMargin", newMargin);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Left/Right Margin</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.heroImageMargin.includes("mx-")
                          ? editedSlide.heroImageMargin.match(
                              /mx-(\d+)/
                            )?.[1] || "0"
                          : "0"}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={16}
                      step={1}
                      value={[
                        Number(
                          editedSlide.heroImageMargin.match(/mx-(\d+)/)?.[1] ||
                            0
                        ),
                      ]}
                      onValueChange={([value]) => {
                        const newMargin = editedSlide.heroImageMargin
                          .replace(/mx-\d+/, "")
                          .concat(value > 0 ? ` mx-${value}` : "")
                          .trim();
                        handleChange("heroImageMargin", newMargin);
                      }}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Padding</Label>
                  <RadioGroup
                    value={editedSlide.heroImagePadding}
                    onValueChange={(value) =>
                      handleChange("heroImagePadding", value)
                    }
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="hero-padding-none" />
                      <Label htmlFor="hero-padding-none">None</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="p-4" id="hero-padding-all" />
                      <Label htmlFor="hero-padding-all">Equal All Sides</Label>
                    </div>
                  </RadioGroup>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Top/Bottom Padding</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.heroImagePadding.includes("py-")
                          ? editedSlide.heroImagePadding.match(
                              /py-(\d+)/
                            )?.[1] || "0"
                          : "0"}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={16}
                      step={1}
                      value={[
                        Number(
                          editedSlide.heroImagePadding.match(/py-(\d+)/)?.[1] ||
                            0
                        ),
                      ]}
                      onValueChange={([value]) => {
                        const newPadding = editedSlide.heroImagePadding
                          .replace(/py-\d+/, "")
                          .concat(value > 0 ? ` py-${value}` : "")
                          .trim();
                        handleChange("heroImagePadding", newPadding);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Left/Right Padding</Label>
                      <span className="text-sm text-muted-foreground">
                        {editedSlide.heroImagePadding.includes("px-")
                          ? editedSlide.heroImagePadding.match(
                              /px-(\d+)/
                            )?.[1] || "0"
                          : "0"}
                        px
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={16}
                      step={1}
                      value={[
                        Number(
                          editedSlide.heroImagePadding.match(/px-(\d+)/)?.[1] ||
                            0
                        ),
                      ]}
                      onValueChange={([value]) => {
                        const newPadding = editedSlide.heroImagePadding
                          .replace(/px-\d+/, "")
                          .concat(value > 0 ? ` px-${value}` : "")
                          .trim();
                        handleChange("heroImagePadding", newPadding);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Image Fitting Style</Label>
                <Select
                  value={editedSlide.heroImageFit}
                  onValueChange={(value) => handleChange("heroImageFit", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select fitting style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contain">
                      Contain - Preserve aspect ratio
                    </SelectItem>
                    <SelectItem value="cover">
                      Cover - Fill while preserving aspect ratio
                    </SelectItem>
                    <SelectItem value="fill">Fill - Stretch to fit</SelectItem>
                    <SelectItem value="none">None - Original size</SelectItem>
                    <SelectItem value="scale-down">
                      Scale down - Contain or original size
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Image Background</Label>
                <Select
                  value={editedSlide.heroImageBackground}
                  onValueChange={(value) => {
                    handleChange("heroImageBackground", value);
                    if (value === "transparent") {
                      handleChange("heroImageBackgroundColor", "");
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select background type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transparent">Transparent</SelectItem>
                    <SelectItem value="solid">Solid Color</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {editedSlide.heroImageBackground === "solid" && (
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={editedSlide.heroImageBackgroundColor || "#ffffff"}
                      onChange={(e) =>
                        handleChange("heroImageBackgroundColor", e.target.value)
                      }
                      className="w-20 p-1 h-10"
                    />
                    <Input
                      value={editedSlide.heroImageBackgroundColor || "#ffffff"}
                      onChange={(e) =>
                        handleChange("heroImageBackgroundColor", e.target.value)
                      }
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "relative",
                  editedSlide.heroImageMargin,
                  editedSlide.heroImagePadding,
                  editedSlide.heroImageBackground === "transparent" &&
                    "bg-[url('/checkered-pattern.png')] bg-repeat"
                )}
                style={
                  editedSlide.heroImageBackground === "solid"
                    ? {
                        backgroundColor: editedSlide.heroImageBackgroundColor,
                      }
                    : undefined
                }
              >
                <img
                  src={editedSlide.heroImageUrl}
                  alt="Hero"
                  className={`w-full h-full rounded-2xl object-${editedSlide.heroImageFit}`}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={() => onSave(editedSlide)}>Save Changes</Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="preview">
        <div className="ring-2 ring-gray-200 dark:ring-gray-800 rounded-lg overflow-hidden">
          <div
            className={`relative ${editedSlide.backgroundColor} min-h-[600px] flex items-center`}
          >
            <div
              className={cn(
                "absolute inset-0 w-full h-full",
                editedSlide.imageMargin,
                editedSlide.imagePadding,
                editedSlide.imageBackground === "transparent" &&
                  "bg-[url('/checkered-pattern.png')] bg-repeat"
              )}
              style={
                editedSlide.imageBackground === "solid"
                  ? {
                      backgroundColor: editedSlide.imageBackgroundColor,
                    }
                  : undefined
              }
            >
              <img
                src={editedSlide.imageUrl}
                alt="Background"
                className={`w-full h-full object-${editedSlide.imageFit}`}
              />
            </div>

            <div
              className="container relative mx-auto grid md:grid-cols-2 gap-8 items-center"
              style={{
                paddingLeft: `${editedSlide.contentPaddingX * 4}px`,
                paddingRight: `${editedSlide.contentPaddingX * 4}px`,
                paddingTop: `${editedSlide.contentPaddingY * 4}px`,
                paddingBottom: `${editedSlide.contentPaddingY * 4}px`,
              }}
            >
              <div className="space-y-6">
                <h1
                  className={cn(
                    "leading-tight",
                    `font-[${editedSlide.contentFont}]`
                  )}
                  style={{
                    fontSize: `${editedSlide.titleFontSize}px`,
                    fontWeight: editedSlide.titleFontWeight,
                    color: editedSlide.titleColor,
                  }}
                >
                  {editedSlide.title}
                </h1>
                <p
                  className={cn(`font-[${editedSlide.contentFont}]`)}
                  style={{
                    fontSize: `${editedSlide.descriptionFontSize}px`,
                    fontWeight: editedSlide.descriptionFontWeight,
                    color: editedSlide.descriptionColor,
                  }}
                >
                  {editedSlide.description}
                </p>
                <Button
                  variant={
                    editedSlide.buttonVariant === "custom"
                      ? "outline"
                      : (editedSlide.buttonVariant as any)
                  }
                  asChild
                  className={cn("text-lg", `font-[${editedSlide.contentFont}]`)}
                  style={{
                    padding: `${editedSlide.buttonPaddingY * 4}px ${
                      editedSlide.buttonPaddingX * 4
                    }px`,
                    ...(editedSlide.buttonVariant === "custom" && {
                      backgroundColor: editedSlide.buttonBgColor,
                      color: editedSlide.buttonTextColor,
                      border: "none",
                    }),
                  }}
                >
                  <a href={editedSlide.buttonLink}>
                    <span
                      className={`inline-flex items-center gap-${editedSlide.buttonGap}`}
                    >
                      {editedSlide.buttonText}
                      {editedSlide.buttonIcon && (
                        <DynamicIcon
                          name={editedSlide.buttonIcon}
                          size={editedSlide.buttonIconSize}
                          color={
                            editedSlide.buttonVariant === "custom"
                              ? editedSlide.buttonTextColor
                              : undefined
                          }
                        />
                      )}
                    </span>
                  </a>
                </Button>
              </div>

              {editedSlide.heroImageUrl && (
                <div
                  className={cn(
                    "relative",
                    editedSlide.heroImageMargin,
                    editedSlide.heroImagePadding,
                    editedSlide.heroImageBackground === "transparent" &&
                      "bg-[url('/checkered-pattern.png')] bg-repeat"
                  )}
                  style={
                    editedSlide.heroImageBackground === "solid"
                      ? {
                          backgroundColor: editedSlide.heroImageBackgroundColor,
                        }
                      : undefined
                  }
                >
                  <img
                    src={editedSlide.heroImageUrl}
                    alt="Hero"
                    className={`w-full h-full rounded-2xl object-${editedSlide.heroImageFit}`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
