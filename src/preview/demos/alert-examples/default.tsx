import { Alert, AlertAction } from "@/components/custom/blocks/Alerts";

export default function DefaultAlerts() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4 md:p-8">
      <div className="flex flex-col gap-3">
        <Alert
          type="neutral"
          title="New features available"
          message="Check out our latest updates including dark mode support and improved accessibility features."
        />
        <Alert
          type="info"
          title="Update available"
          message="A new version of the application is available. Please refresh to get the latest features and bug fixes."
          action={<AlertAction>Refresh</AlertAction>}
        />
        <Alert
          type="success"
          title="Profile updated successfully"
          dismissible
        />
        <Alert
          type="warning"
          title="Payment method expires soon"
          message="Your Visa ending in 4242 expires on March 28. Update billing to avoid interrupting your Pro subscription."
          action={<AlertAction>Update billing</AlertAction>}
          dismissible
        />
        <Alert
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
          type="loading"
          title="Processing your request"
          message="Please wait while we sync your data. This may take a few moments."
        />
      </div>
    </div>
  );
}
