import { Alert, AlertAction } from "@/components/custom/blocks/Alerts";

export default function GlassAlerts() {
  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
      {/* Glass needs an image or gradient behind it, and its text is white. */}
      <div className="relative overflow-hidden rounded-2xl p-4 md:p-8">
        <img
          src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 flex flex-col gap-3">
          <Alert
            variant="glass"
            type="neutral"
            title="New features available"
            message="Check out our latest updates including dark mode support and improved accessibility features."
          />
          <Alert
            variant="glass"
            type="info"
            title="Update available"
            message="A new version is available. Refresh to get the latest features and fixes."
            action={<AlertAction>Refresh</AlertAction>}
          />
          <Alert
            variant="glass"
            type="success"
            title="Profile updated successfully"
            dismissible
          />
          <Alert
            variant="glass"
            type="warning"
            title="Payment method expires soon"
            message="Your Visa ending in 4242 expires on March 28. Update billing to keep Pro active."
            action={<AlertAction>Update billing</AlertAction>}
            dismissible
          />
          <Alert
            variant="glass"
            type="danger"
            title="Unable to connect to server"
            message="We're experiencing connection issues. Please try the following:"
            action={<AlertAction>Retry</AlertAction>}
          >
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>Check your internet connection</li>
              <li>Refresh the page</li>
              <li>Clear your browser cache</li>
            </ul>
          </Alert>
          <Alert
            variant="glass"
            type="loading"
            title="Processing your request"
            message="Please wait while we sync your data. This may take a few moments."
          />
        </div>
      </div>
    </div>
  );
}
