export const metadata = docsPageMetadata("api-playground");

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
  // Decide how the playground responds to whatever the reader types.
  // This handler receives method, url, headers, params and body.
  const handleApiMock: ApiMockHandler = async (req) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Latency

    let parsedBody = null;
    if (req.method !== "GET" && req.body) {
      try {
        parsedBody = JSON.parse(req.body);
      } catch {
        return {
          status: 400,
          timeMs: 15,
          data: { error: "bad_request", message: "Invalid JSON in request body." },
        };
      }
    }

    return {
      status: req.method === "POST" ? 201 : 200,
      timeMs: 120,
      data: {
        success: true,
        resource: req.url.split("/").pop() || "unknown",
        received_headers: req.headers.filter((h) => h.enabled).length,
        payload: parsedBody || "No body provided",
      },
    };
  };

  return (
    
  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/api-playground.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/api-playground
```

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

        Prop
        Type
        Default
        Description

          defaultUrl

          string

          "https://api.example.com/v1/users"
        
        Initial API URL displayed in the request address bar.

          defaultMethod

          "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

          "GET"
        
        Initial HTTP method selected in the method dropdown.

          color

          ApiColor

          "primary"
        
        Accent color theme ("primary" | "indigo" | "rose" | "emerald" | "zinc" or custom hex).

          mockHandler

          ApiMockHandler

          undefined
        
        Async function that receives request details and returns simulated API response data.

          className

          string

          undefined
        
        Additional CSS classes applied to the root container.

### mockHandler Object Signatures

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

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
