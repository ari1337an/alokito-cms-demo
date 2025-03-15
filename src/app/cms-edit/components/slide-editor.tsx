import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useLucideIcons } from "@/hooks/use-lucide-icons";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Slide } from "./types";
import DynamicIcon, { formatIconName } from "./DynamicIcon";
import RenderSlide from "./render/RenderSlide";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface SlideEditorProps {
  slide: Slide;
  onSave: (slide: Slide) => void;
  onCancel: () => void;
}

interface MarginControlsProps {
  label: string;
  top: number;
  bottom: number;
  left: number;
  right: number;
  onChangeTop: (value: number) => void;
  onChangeBottom: (value: number) => void;
  onChangeLeft: (value: number) => void;
  onChangeRight: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

function MarginControls({ label, ...props }: MarginControlsProps) {
  const [linkTopBottom, setLinkTopBottom] = useState(false);
  const [linkLeftRight, setLinkLeftRight] = useState(false);

  const handleTopChange = (value: number) => {
    props.onChangeTop(value);
    if (linkTopBottom) props.onChangeBottom(value);
  };

  const handleBottomChange = (value: number) => {
    props.onChangeBottom(value);
    if (linkTopBottom) props.onChangeTop(value);
  };

  const handleLeftChange = (value: number) => {
    props.onChangeLeft(value);
    if (linkLeftRight) props.onChangeRight(value);
  };

  const handleRightChange = (value: number) => {
    props.onChangeRight(value);
    if (linkLeftRight) props.onChangeLeft(value);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/30 transition-colors hover:bg-muted/40">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">{label}</Label>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLinkTopBottom(!linkTopBottom)}
            className={cn(
              "h-7 text-xs",
              linkTopBottom && "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex items-center gap-1">
              <span>↕</span>
              <span>Link</span>
            </div>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLinkLeftRight(!linkLeftRight)}
            className={cn(
              "h-7 text-xs",
              linkLeftRight && "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex items-center gap-1">
              <span>↔</span>
              <span>Link</span>
            </div>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Top</Label>
            <span className="text-xs bg-muted px-2 py-0.5 rounded">
              {props.top}px
            </span>
          </div>
          <Slider
            min={props.min}
            max={props.max}
            step={props.step}
            value={[props.top]}
            onValueChange={([value]) => handleTopChange(value)}
            className="py-2"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Bottom</Label>
            <span className="text-xs bg-muted px-2 py-0.5 rounded">
              {props.bottom}px
            </span>
          </div>
          <Slider
            min={props.min}
            max={props.max}
            step={props.step}
            value={[props.bottom]}
            onValueChange={([value]) => handleBottomChange(value)}
            className="py-2"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Left</Label>
            <span className="text-xs bg-muted px-2 py-0.5 rounded">
              {props.left}px
            </span>
          </div>
          <Slider
            min={props.min}
            max={props.max}
            step={props.step}
            value={[props.left]}
            onValueChange={([value]) => handleLeftChange(value)}
            className="py-2"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Right</Label>
            <span className="text-xs bg-muted px-2 py-0.5 rounded">
              {props.right}px
            </span>
          </div>
          <Slider
            min={props.min}
            max={props.max}
            step={props.step}
            value={[props.right]}
            onValueChange={([value]) => handleRightChange(value)}
            className="py-2"
          />
        </div>
      </div>
    </div>
  );
}

interface PaddingControlsProps {
  label: string;
  top: number;
  bottom: number;
  left: number;
  right: number;
  onChangeTop: (value: number) => void;
  onChangeBottom: (value: number) => void;
  onChangeLeft: (value: number) => void;
  onChangeRight: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

function PaddingControls({
  label,
  top,
  bottom,
  left,
  right,
  onChangeTop,
  onChangeBottom,
  onChangeLeft,
  onChangeRight,
  min = 0,
  max = 12,
  step = 1,
}: PaddingControlsProps) {
  const [linkTopBottom, setLinkTopBottom] = useState(false);
  const [linkLeftRight, setLinkLeftRight] = useState(false);

  const handleTopChange = (value: number) => {
    onChangeTop(value);
    if (linkTopBottom) onChangeBottom(value);
  };

  const handleBottomChange = (value: number) => {
    onChangeBottom(value);
    if (linkTopBottom) onChangeTop(value);
  };

  const handleLeftChange = (value: number) => {
    onChangeLeft(value);
    if (linkLeftRight) onChangeRight(value);
  };

  const handleRightChange = (value: number) => {
    onChangeRight(value);
    if (linkLeftRight) onChangeLeft(value);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/30 transition-colors hover:bg-muted/40">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">{label}</Label>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLinkTopBottom(!linkTopBottom)}
            className={cn(
              "h-7 text-xs",
              linkTopBottom && "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex items-center gap-1">
              <span>↕</span>
              <span>Link</span>
            </div>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLinkLeftRight(!linkLeftRight)}
            className={cn(
              "h-7 text-xs",
              linkLeftRight && "bg-accent text-accent-foreground"
            )}
          >
            <div className="flex items-center gap-1">
              <span>↔</span>
              <span>Link</span>
            </div>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Top</Label>
            <span className="text-xs bg-muted px-2 py-0.5 rounded">
              {top}px
            </span>
          </div>
          <Slider
            min={min}
            max={max}
            step={step}
            value={[top]}
            onValueChange={([value]) => handleTopChange(value)}
            className="py-2"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Bottom</Label>
            <span className="text-xs bg-muted px-2 py-0.5 rounded">
              {bottom}px
            </span>
          </div>
          <Slider
            min={min}
            max={max}
            step={step}
            value={[bottom]}
            onValueChange={([value]) => handleBottomChange(value)}
            className="py-2"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Left</Label>
            <span className="text-xs bg-muted px-2 py-0.5 rounded">
              {left}px
            </span>
          </div>
          <Slider
            min={min}
            max={max}
            step={step}
            value={[left]}
            onValueChange={([value]) => handleLeftChange(value)}
            className="py-2"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Right</Label>
            <span className="text-xs bg-muted px-2 py-0.5 rounded">
              {right}px
            </span>
          </div>
          <Slider
            min={min}
            max={max}
            step={step}
            value={[right]}
            onValueChange={([value]) => handleRightChange(value)}
            className="py-2"
          />
        </div>
      </div>
    </div>
  );
}

export function SlideEditor({ slide, onSave, onCancel }: SlideEditorProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [editedSlide, setEditedSlide] = useState<Slide>(slide);
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

  const handleChange = (field: string, value: string | number) => {
    setEditedSlide((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="relative h-screen">
      {/* Full Preview */}
      <div
        className={cn(
          "h-full transition-all duration-300",
          isOpen ? "pl-[400px]" : "pl-0"
        )}
      >
        <RenderSlide slide={editedSlide} isPreview={true} />
      </div>

      {/* Editor Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[400px] bg-background border-r shadow-lg transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Fixed Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <h2 className="text-xl font-semibold truncate">Edit Slide</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2 flex-shrink-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Accordion
              type="single"
              collapsible
              defaultValue="content"
              className="space-y-4"
            >
              {/* Content Section */}
              <AccordionItem value="content" className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-lg font-semibold">Content</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-6">
                    {/* Title Settings */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold">
                        Title Settings
                      </h3>

                      {/* Title Text Input */}
                      <div className="space-y-2">
                        <Label>Title Text</Label>
                        <Input
                          value={editedSlide.title}
                          onChange={(e) =>
                            handleChange("title", e.target.value)
                          }
                          placeholder="Enter title"
                        />
                      </div>

                      {/* Font Controls */}
                      <div className="space-y-4 p-4 rounded-lg bg-muted/30">
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
                          <Label>Font Weight</Label>
                          <Select
                            value={editedSlide.titleFontWeight.toString()}
                            onValueChange={(value) =>
                              handleChange("titleFontWeight", parseInt(value))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="400">Regular (400)</SelectItem>
                              <SelectItem value="500">Medium (500)</SelectItem>
                              <SelectItem value="600">
                                Semibold (600)
                              </SelectItem>
                              <SelectItem value="700">Bold (700)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Margin Controls */}
                      <MarginControls
                        label="Title Margin"
                        top={editedSlide.titleMarginTop}
                        bottom={editedSlide.titleMarginBottom}
                        left={editedSlide.titleMarginLeft}
                        right={editedSlide.titleMarginRight}
                        onChangeTop={(value: number) =>
                          handleChange("titleMarginTop", value)
                        }
                        onChangeBottom={(value: number) =>
                          handleChange("titleMarginBottom", value)
                        }
                        onChangeLeft={(value: number) =>
                          handleChange("titleMarginLeft", value)
                        }
                        onChangeRight={(value: number) =>
                          handleChange("titleMarginRight", value)
                        }
                      />

                      {/* Padding Controls */}
                      <PaddingControls
                        label="Title Padding"
                        top={editedSlide.titlePaddingTop}
                        bottom={editedSlide.titlePaddingBottom}
                        left={editedSlide.titlePaddingLeft}
                        right={editedSlide.titlePaddingRight}
                        onChangeTop={(value: number) =>
                          handleChange("titlePaddingTop", value)
                        }
                        onChangeBottom={(value: number) =>
                          handleChange("titlePaddingBottom", value)
                        }
                        onChangeLeft={(value: number) =>
                          handleChange("titlePaddingLeft", value)
                        }
                        onChangeRight={(value: number) =>
                          handleChange("titlePaddingRight", value)
                        }
                      />

                      {/* Color Control */}
                      <div className="space-y-2">
                        <Label>Title Color</Label>
                        <div className="flex gap-2">
                          <div className="relative">
                            <Input
                              type="color"
                              value={editedSlide.titleColor}
                              onChange={(e) =>
                                handleChange("titleColor", e.target.value)
                              }
                              className="w-20 p-1 h-10 cursor-pointer"
                            />
                          </div>
                          <Input
                            value={editedSlide.titleColor}
                            onChange={(e) =>
                              handleChange("titleColor", e.target.value)
                            }
                            placeholder="#000000"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description Settings */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold">
                        Description Settings
                      </h3>

                      {/* Description Text Input */}
                      <div className="space-y-2">
                        <Label>Description Text</Label>
                        <Textarea
                          value={editedSlide.description}
                          onChange={(e) =>
                            handleChange("description", e.target.value)
                          }
                          placeholder="Enter description"
                          className="min-h-[100px] resize-y"
                        />
                      </div>

                      {/* Font Controls */}
                      <div className="space-y-4 p-4 rounded-lg bg-muted/30">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Font Size</Label>
                            <span className="text-sm text-muted-foreground">
                              {editedSlide.descriptionFontSize}px
                            </span>
                          </div>
                          <Slider
                            min={12}
                            max={36}
                            step={1}
                            value={[editedSlide.descriptionFontSize]}
                            onValueChange={([value]) =>
                              handleChange(
                                "descriptionFontSize",
                                value.toString()
                              )
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Font Weight</Label>
                          <Select
                            value={editedSlide.descriptionFontWeight.toString()}
                            onValueChange={(value) =>
                              handleChange(
                                "descriptionFontWeight",
                                parseInt(value)
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="400">Regular (400)</SelectItem>
                              <SelectItem value="500">Medium (500)</SelectItem>
                              <SelectItem value="600">
                                Semibold (600)
                              </SelectItem>
                              <SelectItem value="700">Bold (700)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Margin Controls */}
                      <MarginControls
                        label="Description Margin"
                        top={editedSlide.descriptionMarginTop}
                        bottom={editedSlide.descriptionMarginBottom}
                        left={editedSlide.descriptionMarginLeft}
                        right={editedSlide.descriptionMarginRight}
                        onChangeTop={(value: number) =>
                          handleChange("descriptionMarginTop", value)
                        }
                        onChangeBottom={(value: number) =>
                          handleChange("descriptionMarginBottom", value)
                        }
                        onChangeLeft={(value: number) =>
                          handleChange("descriptionMarginLeft", value)
                        }
                        onChangeRight={(value: number) =>
                          handleChange("descriptionMarginRight", value)
                        }
                      />

                      {/* Padding Controls */}
                      <PaddingControls
                        label="Description Padding"
                        top={editedSlide.descriptionPaddingTop}
                        bottom={editedSlide.descriptionPaddingBottom}
                        left={editedSlide.descriptionPaddingLeft}
                        right={editedSlide.descriptionPaddingRight}
                        onChangeTop={(value: number) =>
                          handleChange("descriptionPaddingTop", value)
                        }
                        onChangeBottom={(value: number) =>
                          handleChange("descriptionPaddingBottom", value)
                        }
                        onChangeLeft={(value: number) =>
                          handleChange("descriptionPaddingLeft", value)
                        }
                        onChangeRight={(value: number) =>
                          handleChange("descriptionPaddingRight", value)
                        }
                      />

                      {/* Color Control */}
                      <div className="space-y-2">
                        <Label>Description Color</Label>
                        <div className="flex gap-2">
                          <div className="relative border rounded p-1 w-16 h-10">
                            <Input
                              type="color"
                              value={editedSlide.descriptionColor}
                              onChange={(e) =>
                                handleChange("descriptionColor", e.target.value)
                              }
                              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            />
                            <div
                              className="w-full h-full rounded"
                              style={{
                                backgroundColor: editedSlide.descriptionColor,
                              }}
                            />
                          </div>
                          <Input
                            value={editedSlide.descriptionColor}
                            onChange={(e) =>
                              handleChange("descriptionColor", e.target.value)
                            }
                            placeholder="#000000"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Background Section */}
              <AccordionItem value="background" className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-lg font-semibold">Background</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-6">
                    {/* Background Color */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold">
                        Background Settings
                      </h3>
                      <div className="space-y-4 p-4 rounded-lg bg-muted/30">
                        <div className="space-y-2">
                          <Label>Background Color</Label>
                          <div className="flex items-center gap-2">
                            <div className="relative border rounded p-1 w-16 h-10">
                              <Input
                                type="color"
                                value={editedSlide.backgroundColor}
                                onChange={(e) =>
                                  handleChange(
                                    "backgroundColor",
                                    e.target.value
                                  )
                                }
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                              />
                              <div
                                className="w-full h-full rounded"
                                style={{
                                  backgroundColor: editedSlide.backgroundColor,
                                }}
                              />
                            </div>
                            <Input
                              value={editedSlide.backgroundColor}
                              onChange={(e) =>
                                handleChange("backgroundColor", e.target.value)
                              }
                              placeholder="#ffffff"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image Settings */}
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold">
                        Image Settings
                      </h3>

                      {/* Image URL */}
                      <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input
                          value={editedSlide.imageUrl}
                          onChange={(e) =>
                            handleChange("imageUrl", e.target.value)
                          }
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>

                      {/* Image Fit */}
                      <div className="space-y-2">
                        <Label>Image Fit</Label>
                        <Select
                          value={editedSlide.imageFit}
                          onValueChange={(value) =>
                            handleChange("imageFit", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select image fit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cover">Cover</SelectItem>
                            <SelectItem value="contain">Contain</SelectItem>
                            <SelectItem value="fill">Fill</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="scale-down">
                              Scale Down
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Image Margin */}
                      <MarginControls
                        label="Image Margin"
                        top={typeof editedSlide.imageMargin === 'string' ? parseInt(editedSlide.imageMargin, 10) || 0 : editedSlide.imageMargin ?? 0}
                        bottom={typeof editedSlide.imageMargin === 'string' ? parseInt(editedSlide.imageMargin, 10) || 0 : editedSlide.imageMargin ?? 0}
                        left={typeof editedSlide.imageMargin === 'string' ? parseInt(editedSlide.imageMargin, 10) || 0 : editedSlide.imageMargin ?? 0}
                        right={typeof editedSlide.imageMargin === 'string' ? parseInt(editedSlide.imageMargin, 10) || 0 : editedSlide.imageMargin ?? 0}
                        onChangeTop={(value: number) =>
                          handleChange("imageMargin", value)
                        }
                        onChangeBottom={(value: number) =>
                          handleChange("imageMargin", value)
                        }
                        onChangeLeft={(value: number) =>
                          handleChange("imageMargin", value)
                        }
                        onChangeRight={(value: number) =>
                          handleChange("imageMargin", value)
                        }
                      />

                      {/* Image Padding */}
                      <PaddingControls
                        label="Image Padding"
                        top={editedSlide.imagePaddingTop}
                        bottom={editedSlide.imagePaddingBottom}
                        left={editedSlide.imagePaddingLeft}
                        right={editedSlide.imagePaddingRight}
                        onChangeTop={(value: number) =>
                          handleChange("imagePaddingTop", value)
                        }
                        onChangeBottom={(value: number) =>
                          handleChange("imagePaddingBottom", value)
                        }
                        onChangeLeft={(value: number) =>
                          handleChange("imagePaddingLeft", value)
                        }
                        onChangeRight={(value: number) =>
                          handleChange("imagePaddingRight", value)
                        }
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Button Section */}
              <AccordionItem value="button" className="border rounded-lg">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <span className="text-lg font-semibold">Call to Action</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Button Text</Label>
                        <Input
                          value={editedSlide.buttonText}
                          onChange={(e) =>
                            handleChange("buttonText", e.target.value)
                          }
                          placeholder="Enter button text"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Button Link</Label>
                        <Input
                          value={editedSlide.buttonLink}
                          onChange={(e) =>
                            handleChange("buttonLink", e.target.value)
                          }
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
                            <SelectItem value="destructive">
                              Destructive
                            </SelectItem>
                            <SelectItem value="outline">Outline</SelectItem>
                            <SelectItem value="ghost">Ghost</SelectItem>
                            <SelectItem value="link">Link</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Add custom color controls when custom variant is selected */}
                      {editedSlide.buttonVariant === "custom" && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Background Color</Label>
                            <div className="flex items-center gap-2">
                              <div className="relative border rounded p-1 w-16 h-10">
                                <Input
                                  type="color"
                                  value={editedSlide.buttonBgColor}
                                  onChange={(e) =>
                                    handleChange(
                                      "buttonBgColor",
                                      e.target.value
                                    )
                                  }
                                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                />
                                <div
                                  className="w-full h-full rounded"
                                  style={{
                                    backgroundColor: editedSlide.buttonBgColor,
                                  }}
                                />
                              </div>
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
                            <div className="flex items-center gap-2">
                              <div className="relative border rounded p-1 w-16 h-10">
                                <Input
                                  type="color"
                                  value={editedSlide.buttonTextColor}
                                  onChange={(e) =>
                                    handleChange(
                                      "buttonTextColor",
                                      e.target.value
                                    )
                                  }
                                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                />
                                <div
                                  className="w-full h-full rounded"
                                  style={{
                                    backgroundColor:
                                      editedSlide.buttonTextColor,
                                  }}
                                />
                              </div>
                              <Input
                                value={editedSlide.buttonTextColor}
                                onChange={(e) =>
                                  handleChange(
                                    "buttonTextColor",
                                    e.target.value
                                  )
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
                            handleChange(
                              "buttonIcon",
                              value === "none" ? "" : value
                            )
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
                                            editedSlide.buttonVariant ===
                                            "custom"
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

                    <PaddingControls
                      label="Button"
                      top={editedSlide.buttonPaddingTop}
                      bottom={editedSlide.buttonPaddingBottom}
                      left={editedSlide.buttonPaddingLeft}
                      right={editedSlide.buttonPaddingRight}
                      onChangeTop={(value: number) =>
                        handleChange("buttonPaddingTop", value)
                      }
                      onChangeBottom={(value: number) =>
                        handleChange("buttonPaddingBottom", value)
                      }
                      onChangeLeft={(value: number) =>
                        handleChange("buttonPaddingLeft", value)
                      }
                      onChangeRight={(value: number) =>
                        handleChange("buttonPaddingRight", value)
                      }
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={() => onSave(editedSlide)}>Save Changes</Button>
          </div>
        </div>
      </div>

      {/* Toggle Button (when panel is closed) */}
      {!isOpen && (
        <Button
          variant="outline"
          size="sm"
          className="fixed top-4 left-4 z-50 shadow-md"
          onClick={() => setIsOpen(true)}
        >
          <ChevronRight className="h-4 w-4 mr-2" />
          <span>Edit</span>
        </Button>
      )}
    </div>
  );
}
