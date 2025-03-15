export interface Slide {
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
  buttonPaddingTop: number;
  buttonPaddingBottom: number;
  buttonPaddingLeft: number;
  buttonPaddingRight: number;
  imageUrl: string;
  imageFit: "contain" | "cover" | "fill" | "none" | "scale-down";
  imageBackground: "transparent" | "solid";
  imageBackgroundColor?: string;
  backgroundColor: string;
  imageMargin: string;
  imagePaddingTop: number;
  imagePaddingBottom: number;
  imagePaddingLeft: number;
  imagePaddingRight: number;
  heroImageUrl: string;
  heroImageFit: "contain" | "cover" | "fill" | "none" | "scale-down";
  heroImageBackground: "transparent" | "solid";
  heroImageBackgroundColor?: string;
  heroImageMargin: string;
  heroImagePaddingTop: number;
  heroImagePaddingBottom: number;
  heroImagePaddingLeft: number;
  heroImagePaddingRight: number;
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
  titlePaddingTop: number;
  titlePaddingBottom: number;
  titlePaddingLeft: number;
  titlePaddingRight: number;
  descriptionPaddingTop: number;
  descriptionPaddingBottom: number;
  descriptionPaddingLeft: number;
  descriptionPaddingRight: number;
  titleMarginTop: number;
  titleMarginBottom: number;
  titleMarginLeft: number;
  titleMarginRight: number;
  descriptionMarginTop: number;
  descriptionMarginBottom: number;
  descriptionMarginLeft: number;
  descriptionMarginRight: number;
} 