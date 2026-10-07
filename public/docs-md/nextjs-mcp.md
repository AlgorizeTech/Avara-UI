export const metadata = docsPageMetadata("mcp");

# MCP Server

Connect your AI assistant to the Algorize UI registry. With the shadcn MCP server
it can browse, search and install components from plain-language prompts — no
copy-pasting commands.

The server is part of the shadcn CLI. It is free, needs no API key, and works with
Algorize UI because our components are published as a standard shadcn registry.

## Quick start

### Step 1: Register Algorize UI

Run once per project, so the server knows where to find our components:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
```

This adds the registry to `components.json`, which you can also write by hand:

```json
{
  "registries": {
    "@algorize-ui": "https://algorize-ui.vercel.app/r/{name}.json"
  }
}
```

### Step 2: Add the MCP server

Pick your client and run the command in your project. Prefer to do it by hand? See
[Configuration](#configuration).

    **Run the following command** in your project:

    ```bash
npx shadcn@latest mcp init --client claude
```

    Restart Claude Code and run `/mcp` to check the connection.

    **Run the following command** in your project:

    ```bash
npx shadcn@latest mcp init --client cursor
```

    Open **Cursor Settings** and **Enable** the MCP server for shadcn.

    **Run the following command** in your project:

    ```bash
npx shadcn@latest mcp init --client vscode
```

    Open `.vscode/mcp.json` and click **Start** beside the shadcn server.

    **Run the following command** in your project:

    ```bash
npx shadcn@latest mcp init --client codex
```

    Restart Codex to load the server.

    **Run the following command** in your project:

    ```bash
npx shadcn@latest mcp init --client opencode
```

    Restart OpenCode to load the server.

### Step 3: Try it

Ask your assistant:

- "Show me all components in the @algorize-ui registry"
- "Add the hero and navbar from @algorize-ui to my project"
- "Build a pricing page using components from @algorize-ui"

    Name the registry. Include @algorize-ui in your prompt. Without it the assistant may search only the default shadcn/ui registry.

## Configuration

Add the server to your client's MCP config. The command is the same everywhere —
only the file differs.

    Add to `.mcp.json`, then run `/mcp` to check the connection:

    ```json
    {
      "mcpServers": {
        "shadcn": {
          "command": "npx",
          "args": ["shadcn@latest", "mcp"]
        }
      }
    }
    ```

    Add to `.cursor/mcp.json`, then enable the server in Cursor Settings. A green dot
    means it is connected:

    ```json
    {
      "mcpServers": {
        "shadcn": {
          "command": "npx",
          "args": ["shadcn@latest", "mcp"]
        }
      }
    }
    ```

    Add to `.vscode/mcp.json`, then click **Start** beside the server. VS Code uses
    `servers` rather than `mcpServers`:

    ```json
    {
      "servers": {
        "shadcn": {
          "command": "npx",
          "args": ["shadcn@latest", "mcp"]
        }
      }
    }
    ```

    Add to `.codex/config.toml` in your project (or `~/.codex/config.toml` for every project), then restart Codex:

    ```toml
    [mcp_servers.shadcn]
    command = "npx"
    args = ["shadcn@latest", "mcp"]
    ```

    Add to `opencode.json`, then restart OpenCode:

    ```json
    {
      "$schema": "https://opencode.ai/config.json",
      "mcp": {
        "shadcn": {
          "type": "local",
          "command": ["npx", "shadcn@latest", "mcp"],
          "enabled": true
        }
      }
    }
    ```

## Example prompts

**Browse and search**

- "List the components in @algorize-ui"
- "Find a pricing section in @algorize-ui"

**Install**

- "Add @algorize-ui/hero to my project"
- "Install the navbar and footer from @algorize-ui"

**Build**

- "Create a landing page with a hero, features and FAQ from @algorize-ui"

## Troubleshooting

    The assistant can't find Algorize components
    Check that components.json has the @algorize-ui entry from Step 1, and mention @algorize-ui in your prompt.

    The server doesn't respond
    Check the config file for typos, restart your client, and make sure you can reach algorize-ui.vercel.app.

    "No tools" message
    Clear the npx cache with npx clear-npx-cache, re-enable the server, and read your client's MCP output log.

    Installs fail
    Make sure components.json exists (run init) and you have write access to the project folders.

## Next steps

- Installation — set up a project for Algorize UI
- All components — browse the library

For the full server reference, see the
[shadcn MCP docs](https://ui.shadcn.com/docs/mcp).

---

**Component Path:** `[framework]\mcp\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
