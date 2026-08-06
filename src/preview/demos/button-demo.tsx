"use client";

import Button from "@/components/custom/blocks/Button";
import {
  AppleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
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
  | "commerce"
  | "social"
  | "icon-only"
  | "right-icon"
  | "others";

export default function ButtonDemo({
  layout = "basic",
}: {
  layout?: LayoutType;
}) {
  return (
    <div className="w-full flex items-center justify-center min-h-[350px]">
      {layout === "basic" && (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="default" size="sm">
                Small
              </Button>
              <Button variant="default" size="lg">
                Large
              </Button>
              <Button variant="default" loading>
                Loading
              </Button>
              <Button variant="outline" loading>
                Loading
              </Button>
            </div>
          </div>
        </div>
      )}

      {layout === "commerce" && (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="default" iconLeft={<ShoppingCartIcon />}>
                Buy Now
              </Button>
              <Button variant="outline" iconLeft={<HeartIcon />}>
                Save for Later
              </Button>
              <Button variant="secondary" iconLeft={<StarIcon />}>
                Write Review
              </Button>
              <Button variant="ghost" iconLeft={<ShareIcon />}>
                Share Product
              </Button>
            </div>
          </div>
        </div>
      )}

      {layout === "social" && (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl">
              <Button variant="outline" iconLeft={<EmailIcon />}>
                Login with Email
              </Button>
              <Button variant="outline" iconLeft={<GoogleIcon />}>
                Continue with Google
              </Button>
              <Button variant="outline" iconLeft={<GitHubIcon />}>
                Continue with GitHub
              </Button>
              <Button variant="outline" iconLeft={<FacebookIcon />}>
                Login with Facebook
              </Button>
              <Button variant="outline" iconLeft={<XIcon2 />}>
                Login with X
              </Button>
              <Button variant="outline" iconLeft={<AppleIcon />}>
                Login with Apple
              </Button>
              <Button variant="outline" iconLeft={<MicrosoftIcon />}>
                Login with Microsoft
              </Button>
              <Button variant="outline" iconLeft={<SlackIcon />}>
                Login with Slack
              </Button>
              <Button variant="outline" iconLeft={<LinkedInIcon />}>
                Login with LinkedIn
              </Button>
            </div>
          </div>
        </div>
      )}

      {layout === "icon-only" && (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" size="sm" iconLeft={<SearchIcon />} />
              <Button variant="outline" size="sm" iconLeft={<BellIcon />} />
              <Button variant="outline" size="sm" iconLeft={<MailIcon />} />
              <Button variant="outline" size="sm" iconLeft={<PhoneIcon />} />
              <Button variant="outline" size="sm" iconLeft={<SettingsIcon />} />
              <Button variant="outline" size="sm" iconLeft={<PlusIcon />} />
              <Button variant="outline" size="sm" iconLeft={<MinusIcon />} />
              <Button variant="outline" size="sm" iconLeft={<XIcon />} />
            </div>
          </div>
        </div>
      )}

      {layout === "right-icon" && (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="default" iconRight={<ArrowRightIcon />}>
                Next
              </Button>
              <Button variant="outline" iconRight={<ArrowRightIcon />}>
                Continue
              </Button>
              <Button variant="secondary" iconRight={<CheckIcon />}>
                Confirm
              </Button>
              <Button variant="ghost" iconRight={<SettingsIcon />}>
                Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {layout === "others" && (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" iconLeft={<ArrowLeftIcon />}>
                Previous
              </Button>
              <Button variant="default" iconRight={<ArrowRightIcon />}>
                Next
              </Button>
              <Button variant="secondary" iconLeft={<ArrowLeftIcon />}>
                Back
              </Button>
              <Button variant="ghost" iconRight={<ArrowRightIcon />}>
                Forward
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                className="bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700"
                variant="default"
                iconLeft={<CheckIcon />}
              >
                Success
              </Button>
              <Button variant="destructive" iconLeft={<XIcon />}>
                Delete
              </Button>
              <Button variant="outline" iconLeft={<CheckIcon />}>
                Approve
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                variant="secondary"
                iconLeft={<XIcon />}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
