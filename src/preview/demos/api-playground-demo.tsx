"use client";

import {
  ApiColor,
  ApiPlaygroundBlock,
  HttpMethod,
} from "@/components/custom/blocks/ApiPlaygroundBlock";

export default function ApiPlaygroundDemo({
  defaultMethod = "POST",
  defaultUrl = "https://api.acme.com/v1/customers",
  color = "primary",
  simulateError = false,
  useMockHandler = true,
}: {
  defaultMethod?: HttpMethod;
  defaultUrl?: string;
  color?: ApiColor | string;
  simulateError?: boolean;
  /** false falls back to the block's built-in default mock response. */
  useMockHandler?: boolean;
}) {
  // Advanced Mock Handler to simulate real API interactions for documentation
  const handleCustomMock = async (req: {
    method: string;
    url: string;
    headers: any[];
    params: any[];
    body: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 600)); // Network delay

    if (simulateError) {
      return {
        status: 401,
        timeMs: 45,
        data: {
          error: "unauthorized",
          message: "Invalid API key provided in Authorization header.",
        },
      };
    }

    // Try parsing body for POST/PUT requests
    let parsedBody = null;
    if (req.method !== "GET" && req.body) {
      try {
        parsedBody = JSON.parse(req.body);
      } catch {
        return {
          status: 400,
          timeMs: 12,
          data: {
            error: "bad_request",
            message: "Invalid JSON in request body.",
          },
        };
      }
    }

    return {
      status: req.method === "POST" ? 201 : 200,
      timeMs: 142,
      data: {
        success: true,
        resource: req.url.split("/").pop() || "unknown",
        received_headers: req.headers.filter((h: any) => h.enabled).length,
        payload: parsedBody || "No body provided",
      },
    };
  };

  return (
    <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl bg-white dark:bg-[#050505] py-[12px] px-0 min-w-0 overflow-hidden">
      <ApiPlaygroundBlock
        key={`${defaultMethod}-${color}-${simulateError}-${useMockHandler}`} // Force remount on config changes
        defaultUrl={defaultUrl}
        defaultMethod={defaultMethod}
        color={color}
        mockHandler={useMockHandler ? handleCustomMock : undefined}
      />
    </div>
  );
}
