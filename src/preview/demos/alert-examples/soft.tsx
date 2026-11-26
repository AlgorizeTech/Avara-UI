import { Alert, AlertAction } from "@/components/custom/blocks/Alerts";

export default function SoftAlerts() {
  return (
    <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
      <div className="flex flex-col gap-3">
        <Alert
          variant="soft"
          type="neutral"
          title="New features available"
          message="Check out our latest updates including dark mode support and improved accessibility features."
        />
        <Alert
          variant="soft"
          type="info"
          title="Update available"
          message="A new version is available. Refresh to get the latest features and fixes."
          action={
            <>
              <AlertAction appearance="outline">Later</AlertAction>
              <AlertAction>Refresh</AlertAction>
            </>
          }
        />
        <Alert
          variant="soft"
          type="success"
          title="Profile updated successfully"
          dismissible
        />
        <Alert
          variant="soft"
          type="warning"
          title="Payment method expires soon"
          message="Your Visa ending in 4242 expires on March 28. Update billing to keep Pro active."
          dismissible
          action={
            <>
              <AlertAction appearance="outline">Not now</AlertAction>
              <AlertAction>Update billing</AlertAction>
            </>
          }
        />
        <Alert
          variant="soft"
          type="danger"
          title="Unable to connect to server"
          message="We're experiencing connection issues. Please try the following:"
          action={
            <>
              <AlertAction appearance="outline">Contact support</AlertAction>
              <AlertAction>Retry</AlertAction>
            </>
          }
        >
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Check your internet connection</li>
            <li>Refresh the page</li>
            <li>Clear your browser cache</li>
          </ul>
        </Alert>
        <Alert
          variant="soft"
          type="loading"
          title="Processing your request"
          message="Please wait while we sync your data. This may take a few moments."
        />
      </div>
    </div>
  );
}
