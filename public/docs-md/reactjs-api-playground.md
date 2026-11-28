---
title: "Shadcn API Playground"
description: "A highly advanced, interactive split-pane block for testing API requests directly inside documentation. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/api-playground
---

# Shadcn API Playground

A highly advanced, interactive split-pane block for testing API requests directly inside documentation.

This is the hallmark of top-tier developer platforms (like Stripe, Supabase, or Vercel). Instead of showing static code blocks, this component allows users to adjust headers, parameters, and JSON payloads, and hit "Send" to see formatted responses.

Crucially, this `ApiPlaygroundBlock` uses a `mockHandler` pattern. It does not blindly send network requests (which usually fail due to CORS in documentation environments). Instead, you define exactly how the component should respond to different inputs, creating a safe, curated learning experience.

Each playground below is fully interactive: edit params, headers or the JSON body, then hit **Send**. Nothing leaves the browser — a `mockHandler` decides the response.

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

## API playground

A split-pane request builder.

- Pass `mockHandler` an async function — it receives the method, url, headers, params and body, and returns { status, timeMs, data } for the response pane to render.
- `defaultUrl` seeds the address bar the reader lands on.

```tsx
import {
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
    <ApiPlaygroundBlock
      defaultUrl="https://api.acme.com/v1/customers"
      defaultMethod="POST"
      mockHandler={handleApiMock}
    />
  );
}
```

## About Shadcn API Playground

**What it is.** `ApiPlaygroundBlock` is a split-pane request builder and response viewer for API documentation. The left pane has a method picker, URL bar and Params, Headers and Body tabs, and the right pane shows the status, the time and the JSON response.

**How it is built.** Pressing Send calls your async `mockHandler` with `{ method, url, headers, params, body }` and renders the `{ status, timeMs, data }` it returns. The component never calls `fetch` itself, and without a handler it returns a built-in echo of the request. It uses the `select` registry item for the method dropdown and the `ui-animated-icons` item for its icons.

**When to use it.** Use it for REST API docs, SDK quickstarts, webhook simulators and developer portals where readers should try a request without leaving the page.

## For AI agents

**When to use**

- REST API docs, SDK quickstarts, webhook simulators, and developer portals where readers test payloads interactively

**When not to use**

- A static, read-only code sample: use [Custom Code Block](https://avaraui.com/docs/reactjs/custom-code-block)
- Shell commands and install snippets: use [Terminal](https://avaraui.com/docs/reactjs/terminal)

**Agent notes**

- Named export `ApiPlaygroundBlock` from `@/components/custom/blocks/ApiPlaygroundBlock`. Props are `mockHandler`, `defaultUrl`, `defaultMethod`, `color` and `className`.
- Annotate the handler as `ApiMockHandler`. It receives `{ method, url, headers, params, body }` (`body` is the raw string from the textarea) and must return a promise of `{ status, timeMs, data }`.
- `headers` and `params` include rows the reader switched off, with `enabled: false`, so filter on `enabled`.
- Without `mockHandler` a built-in handler echoes the request after about 600 ms. The component does no network call of its own.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `defaultUrl` | `string` | `"https://api.example.com/v1/users"` | Initial API URL displayed in the request address bar. |
| `defaultMethod` | `"GET" \| "POST" \| "PUT" \| "PATCH" \| "DELETE"` | `"GET"` | Initial HTTP method selected in the method dropdown. |
| `color` | `ApiColor` | `"primary"` | Accent color theme (`"primary" \| "default" \| "lavender" \| "indigo" \| "rose" \| "emerald" \| "zinc"` or custom hex). |
| `mockHandler` | `ApiMockHandler` | `undefined` | Async function that receives request details and returns the response to show. Without it, a built-in handler echoes the request. |
| `className` | `string` | `undefined` | Additional CSS classes applied to the root container. |

### mockHandler Object Signatures

When you provide a mockHandler, your function receives a Request object and must return a Promise that resolves to a Response object. Both shapes are exported, so annotate the whole handler and TypeScript infers the rest — no need to restate them:

```tsx
import type { ApiMockHandler } from "@/components/custom/blocks/ApiPlaygroundBlock";

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
  headers: Array<{ id: string; key: string; value: string; enabled: boolean }>;
  params: Array<{ id: string; key: string; value: string; enabled: boolean }>;
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

## Works with other components

- [Custom Code Block](https://avaraui.com/docs/reactjs/custom-code-block) for the SDK or request samples shown beside the playground.
- [Terminal](https://avaraui.com/docs/reactjs/terminal) for a cURL equivalent of the request the reader just built.
- [Tabs](https://avaraui.com/docs/reactjs/vertical-tabs) to switch between languages or endpoints above a playground.

## Does ApiPlaygroundBlock make live network requests?

Not by itself. `ApiPlaygroundBlock` never calls `fetch`; Send runs your `mockHandler` and shows what it returns. The handler can still call a real API if you write it that way, and then CORS and exposed keys become your concern. Without a handler it returns a built-in echo.

## What should `mockHandler` return?

Return a promise that resolves to `{ status, timeMs, data }`. `status` is a number, `timeMs` is the duration shown in the header, and `data` is any JSON-serialisable value, which is printed with `JSON.stringify(data, null, 2)`. A status below 400 shows green and anything else shows red.

## What happens if I do not pass a mockHandler to ApiPlaygroundBlock?

A built-in handler waits about 600 ms and returns status 201 for POST and 200 otherwise. The `data` holds `message: "Success"` and an `echo` of the method, URL, enabled params and headers, and parsed body. It is good for trying the layout before you write real responses.

## How do params and the URL stay in sync in ApiPlaygroundBlock?

Editing a row on the Params tab rebuilds the query string in the URL bar, using only enabled rows with a key. Typing a query string into the URL bar parses it back into Params rows. `defaultUrl` is parsed the same way, so `?limit=10` starts as a row.

## How do I handle errors and invalid JSON in ApiPlaygroundBlock?

Return an error status yourself, for example `{ status: 400, timeMs: 15, data: { error: "bad_request" } }`, after a `JSON.parse` try/catch on `req.body`. If your handler throws or rejects, the playground shows status 500 with the error message instead of crashing.

---

Live previews and every example: https://avaraui.com/docs/nextjs/api-playground
