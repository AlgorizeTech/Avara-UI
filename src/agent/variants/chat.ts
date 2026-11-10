import type { PageVariants } from "./types";

/**
 * Chat: 4 shells of one registry item (`chat`), chosen with the `variant`
 * prop. The conversation state, search and typing simulation are identical
 * across all four. Claims come from src/app/docs/[framework]/chat/page.mdx.
 */
export const chat: PageVariants = {
  slug: "chat",
  intro: "A self-contained chat interface with a contact list, search, simulated replies, unread badges and a mobile drawer, in four shells: the default two-pane layout, a two-card minimal one, frosted glass and liquid glass.",
  whenNot: [
    {
      use: "AI Chat",
      slug: "ai-chat",
      reason: "for an assistant with a prompt composer, model picker, attachments and streamed answers",
    },
  ],
  gotchas: [
    "All four are looks of the one `chat` item: install it once and set `variant` from the index.",
    "`variant` changes only the shell; the conversation behaviour is the same in each.",
    "`glass` and `liquid-glass` need a colourful or photographic backdrop behind them to read.",
  ],
  variants: [
    {
      id: "default",
      label: "Default",
      group: "Solid",
      summary: "The two-pane layout: the contact list beside the thread, collapsing to a drawer on narrow screens.",
      bestFor: ["a standard messaging screen on a normal background"],
      avoidIf: ["you want the list and thread as two separate cards"],
      traits: ["two panes in one shell", "default look", "mobile drawer"],
      item: "chat",
      demo: "chat",
      example: "Chat application",
      props: { variant: "default" },
      setProps: { variant: "default" },
    },
    {
      id: "minimal",
      label: "Minimal",
      group: "Solid",
      summary: "Two bordered cards with a gap between them: the contact list on the left and the thread on the right.",
      bestFor: ["a dashboard where the chat sits among other cards"],
      avoidIf: ["you want a single unified shell"],
      traits: ["two separate cards", "gap between the panes"],
      item: "chat",
      demo: "chat",
      example: "Minimal",
      props: { variant: "minimal" },
      setProps: { variant: "minimal" },
    },
    {
      id: "glass",
      label: "Glass",
      group: "Glass",
      summary: "Translucent panels with backdrop blur.",
      bestFor: ["a chat over a colourful or photographic background"],
      avoidIf: ["the backdrop is plain, since there is nothing to blur"],
      traits: ["translucent panels", "backdrop blur"],
      item: "chat",
      demo: "chat",
      example: "Glass",
      props: { variant: "glass" },
      setProps: { variant: "glass" },
    },
    {
      id: "liquid-glass",
      label: "Liquid glass",
      group: "Glass",
      summary: "Liquid-glass refraction using SVG displacement mapping, layered specular highlights and fluid reflections.",
      bestFor: ["a showpiece interface over rich imagery"],
      avoidIf: ["the backdrop is plain or you want a restrained look"],
      traits: ["refraction effect", "specular highlights"],
      item: "chat",
      demo: "chat",
      example: "Liquid Glass",
      props: { variant: "liquid-glass" },
      setProps: { variant: "liquid-glass" },
    },
  ],
};
