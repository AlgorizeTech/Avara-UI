# API Playground

A highly advanced, interactive split-pane block for testing API requests directly inside documentation.

This is the hallmark of top-tier developer platforms (like Stripe, Supabase, or Vercel). Instead of showing static code blocks, this component allows users to adjust headers, parameters, and JSON payloads, and hit "Send" to see formatted responses.

Crucially, this `ApiPlaygroundBlock` uses a `mockHandler` pattern. It does not blindly send network requests (which usually fail due to CORS in documentation environments). Instead, you define exactly how the component should respond to different inputs, creating a safe, curated learning experience.

Each playground below is fully interactive: edit params, headers or the JSON body, then hit **Send**. Nothing leaves the browser — a `mockHandler` decides the response.

export const usageDefault = `import {
  ApiPlaygroundBlock,
  type ApiMockHandler,
} from "@/components/custom/blocks/ApiPlaygroundBlock";

export default function UsersEndpointDocs() {
  // Decide how the playground responds to whatever the reader types. Typing the
  // handler checks both the request it receives and the response it returns.
  const handleApiMock: ApiMockHandler = async (req) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // latency

    if (req.method === "POST") {
      return { status: 201, timeMs: 120, data: { id: "cus_123", created: true } };
    }

    return { status: 200, timeMs: 80, data: { list: [], has_more: false } };
  };

  return (
    
  );
}`;

## Installation

## Features & Core Capabilities
Explore the interactive API Playground component capabilities designed to elevate API documentation:

    Split-Pane Architecture
    Interactive dual-panel interface with real-time HTTP Request Builder on the left and Live JSON Response Viewer on the right.

    CORS-Safe Mock Handler
    Uses a client-side `mockHandler` async function to simulate network latency, dynamic endpoints, and custom status codes safely without CORS issues.

    Full Header & Query Params Editor
    Add, enable/disable, or remove HTTP headers and query parameters dynamically before executing API calls.

    JSON Body Payload & Syntax Highlighting
    Built-in raw JSON request body editor with syntax highlighting, automatic JSON formatting, error handling, and response timing metrics.

## Best Practices & Guidelines

    Usage Guidelines
    Provide realistic mock handlers with simulated delays (e.g. 100ms - 500ms) to give users an authentic API testing experience directly inside your documentation.

## Props Reference

mockHandler Object Signatures
When you provide a mockHandler, your function receives a Request object and must return a Promise that resolves to a Response object. Both shapes are exported, so annotate the whole handler and TypeScript infers the rest — no need to restate them:

```tsx

const handleApiMock: ApiMockHandler = async (req) => {
  // req is an ApiPlaygroundRequest; the return value must be an ApiResponse.
  return { status: 200, timeMs: 80, data: { list: [], has_more: false } };
};
```

The Request Object — exported as `ApiPlaygroundRequest` (passed to your function):

```tsx
{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  headers: Array;
  params: Array;
  body: string; // The raw JSON string from the text area
}
```

The Response Object — exported as `ApiResponse` (required return type):

```tsx
{
  status: number; // e.g. 200, 201, 400, 401, 500
  timeMs: number; // e.g. 142 (Displayed in the terminal header)
  data: any; // A Javascript object or array. The component will format this as JSON automatically.
}
```

---

**Component Path:** `[framework]\api-playground\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
