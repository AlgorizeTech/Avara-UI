"use client";

import Button from "@/components/custom/blocks/Button";
import {
  AppleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  DownloadIcon,
  EmailIcon,
  FacebookIcon,
  GitHubIcon,
  GoogleIcon,
  HeartIcon,
  LinkedInIcon,
  MailIcon,
  MicrosoftIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  ShoppingCartIcon,
  SlackIcon,
  StarIcon,
  XIcon,
  XIcon2,
} from "@/components/custom/blocks/Icons";

type LayoutType =
  | "basic"
  | "default"
  | "variants"
  | "sizes"
  | "loading"
  | "with-icon"
  | "commerce"
  | "social"
  | "icon-only"
  | "right-icon"
  | "others";

export default function ButtonDemo({
  layout = "basic",
}: {
  layout?: "basic" | "slide-icon" | "slide-text" | "icon-only" | "social";
}) {
  return (
    <div className="w-full min-h-[320px] h-full flex flex-col items-center justify-center p-8 m-0">
      {layout === "basic" && (
        <div className="w-full h-full flex flex-wrap items-center justify-center gap-8 m-0 py-12">
          {/* 1. Single Conic Spinning Border */}
          <Button variant="outline" iconRight={<ArrowRightIcon />}>
            Spinning Border
          </Button>

          {/* 2. Smooth Aura Beacon Pulse */}
          <Button variant="beacon-radar-pulse" iconRight={<DownloadIcon />}>
            Beacon Pulse
          </Button>

          {/* 3. Glossy Shine Sweep */}
          <Button variant="shine-sweep" iconLeft={<BellIcon />}>
            Shine Sweep
          </Button>
        </div>
      )}

      {layout === "slide-icon" && (
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto py-2">
          {/* 1. Icon Radial Expand */}
          <Button variant="expand-icon" iconLeft={<ArrowRightIcon />}>
            Radial Expand
          </Button>

          {/* 2. Sliding Rounded Icon */}
          <Button variant="slide-icon" iconRight={<ArrowRightIcon />}>
            Sliding Icon
          </Button>

          {/* 3. Horizontal Background Slide */}
          <Button variant="slide-bg" iconRight={<DownloadIcon />}>
            Background Wipe
          </Button>

          {/* 4. Top to Bottom Slide */}
          <Button variant="slide-bg-top" iconLeft={<MailIcon />}>
            Slide Top
          </Button>

          {/* 5. Bottom to Top Slide */}
          <Button variant="slide-bg-bottom" iconRight={<ArrowRightIcon />}>
            Slide Bottom
          </Button>

          {/* 6. Right to Left Slide */}
          <Button variant="slide-bg-right" iconLeft={<SettingsIcon />}>
            Slide Right
          </Button>

          {/* 7. Center Scale Pop */}
          <Button variant="scale-up" iconRight={<StarIcon />}>
            Scale Pop
          </Button>

          {/* 9. Skewed Diagonal Slide */}
          <Button variant="skew-slide" iconLeft={<PlusIcon />}>
            Skew Slide
          </Button>

          {/* 11. Border Ring Expansion */}
          <Button variant="border-expand" iconRight={<CheckIcon />}>
            Border Expand
          </Button>

          {/* 12. Icon Rotate Spin */}
          <Button variant="icon-rotate" iconLeft={<SettingsIcon />}>
            Icon Rotate
          </Button>

          {/* 13. Icon Spring Bounce */}
          <Button variant="icon-bounce" iconRight={<ArrowRightIcon />}>
            Icon Bounce
          </Button>

          {/* 14. Icon Continuous Spin */}
          <Button variant="icon-spin" iconLeft={<SettingsIcon />}>
            Icon Spin
          </Button>

          {/* 15. Vertical Curtain Reveal */}
          <Button variant="curtain-reveal" iconRight={<ShareIcon />}>
            Curtain Reveal
          </Button>

          {/* 17. Spring Bounce Roll */}
          <Button variant="slide-text-bounce">
            Spring Bounce
          </Button>

          {/* 18. Upward Text Roll */}
          <Button variant="slide-text" iconRight={<ArrowRightIcon />}>
            Upward Roll
          </Button>

          {/* 19. Downward Text Roll */}
          <Button variant="slide-text-down" iconLeft={<MailIcon />}>
            Downward Roll
          </Button>

          {/* 20. Liquid Wave Fill */}
          <Button variant="liquid-fill" iconLeft={<MailIcon />}>
            Liquid Fill
          </Button>
        </div>
      )}

      {layout === "icon-only" && (
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto py-2">
          <Button variant="default" size="sm" className="bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<SearchIcon />} />
          <Button variant="default" size="sm" className="bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<BellIcon />} />
          <Button variant="default" size="sm" className="bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<MailIcon />} />
          <Button variant="default" size="sm" className="bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<PhoneIcon />} />
          <Button variant="default" size="sm" className="bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<SettingsIcon />} />
          <Button variant="default" size="sm" className="bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<PlusIcon />} />
          <Button variant="default" size="sm" className="bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<MinusIcon />} />
          <Button variant="default" size="sm" className="bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<XIcon />} />
        </div>
      )}

      {layout === "social" && (
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 w-full max-w-4xl mx-auto py-2">
          <Button variant="default" className="w-full sm:w-auto justify-center bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<EmailIcon />}>
            Login with Email
          </Button>
          <Button variant="default" className="w-full sm:w-auto justify-center bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<GoogleIcon />}>
            Continue with Google
          </Button>
          <Button variant="default" className="w-full sm:w-auto justify-center bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<GitHubIcon />}>
            Continue with GitHub
          </Button>
          <Button variant="default" className="w-full sm:w-auto justify-center bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<FacebookIcon />}>
            Login with Facebook
          </Button>
          <Button variant="default" className="w-full sm:w-auto justify-center bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<XIcon2 />}>
            Login with X
          </Button>
          <Button variant="default" className="w-full sm:w-auto justify-center bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<AppleIcon />}>
            Login with Apple
          </Button>
          <Button variant="default" className="w-full sm:w-auto justify-center bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<MicrosoftIcon />}>
            Login with Microsoft
          </Button>
          <Button variant="default" className="w-full sm:w-auto justify-center bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<SlackIcon />}>
            Login with Slack
          </Button>
          <Button variant="default" className="w-full sm:w-auto justify-center bg-background text-foreground border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-colors duration-200" iconLeft={<LinkedInIcon />}>
            Login with LinkedIn
          </Button>
        </div>
      )}
    </div>
  );
}
