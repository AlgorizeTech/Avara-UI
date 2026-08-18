# API Playground

A highly advanced, interactive split-pane block for testing API requests directly inside documentation.

This is the hallmark of top-tier developer platforms (like Stripe, Supabase, or Vercel). Instead of showing static code blocks, this component allows users to adjust headers, parameters, and JSON payloads, and hit "Send" to see formatted responses.

Crucially, this `ApiPlaygroundBlock` uses a `mockHandler` pattern. It does not blindly send network requests (which usually fail due to CORS in documentation environments). Instead, you define exactly how the component should respond to different inputs, creating a safe, curated learning experience.

## Examples

Each playground below is fully interactive: edit params, headers or the JSON body, then hit **Send**. Nothing leaves the browser — a `mockHandler` decides the response.

export const usageDefault = `import { ApiPlaygroundBlock } from "@/components/custom/blocks/ApiPlaygroundBlock";

export default function UsersEndpointDocs() {
  // Decide how the playground responds to whatever the reader types.
  const handleApiMock = async (req) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // latency

    if (req.method === "POST") {
      return { status: 201, timeMs: 120, data: { id: "cus_123", created: true } };
    }

    return { status: 200, timeMs: 80, data: { list: [], has_more: false } };
  };

  return (
    
  );
}`;

export const usageGet = `import { ApiPlaygroundBlock } from "@/components/custom/blocks/ApiPlaygroundBlock";

export default function GetPlayground() {
  // \`defaultMethod\` and \`defaultUrl\` seed the request the reader lands on.
  return (
    
  );
}`;

export const usageError = `import { ApiPlaygroundBlock } from "@/components/custom/blocks/ApiPlaygroundBlock";

// Any non-2xx status you return is formatted as an error response.
const handleApiMock = async () => ({
  status: 401,
  timeMs: 45,
  data: {
    error: "unauthorized",
    message: "Invalid API key provided in Authorization header.",
  },
});

export default function ErrorPlayground() {
  return (
    
  );
}`;

export const usageNoMock = `import { ApiPlaygroundBlock } from "@/components/custom/blocks/ApiPlaygroundBlock";

export default function SketchPlayground() {
  // Omit \`mockHandler\` and the block answers with its own canned response —
  // handy while you are still sketching the endpoint.
  return (
    
  );
}`;

## Installation

## Features
Discover how the API Playground component enables developers to test endpoints, view JSON responses, and debug requests directly from the UI.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

mockHandler Object Signatures
When you provide a mockHandler, your function receives a Request object and must return a Promise that resolves to a Response object.

The Request Object (Passed to your function):

```tsx
{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  headers: Array;
  params: Array;
  body: string; // The raw JSON string from the text area
}
```

The Response Object (Required return type):

```tsx
{
  status: number; // e.g. 200, 201, 400, 401, 500
  timeMs: number; // e.g. 142 (Displayed in the terminal header)
  data: any; // A Javascript object or array. The component will format this as JSON automatically.
}
```

---

**Component Path:** `nextjs\api-playground\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
