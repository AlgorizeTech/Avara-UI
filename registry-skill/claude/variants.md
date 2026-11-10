---
name: avara-ui-variants
description: How to ask the user which design of a section they want, and how to choose for them.
---

# Choosing a variant

Some pages offer several designs of the same section: a honeycomb hero or a carousel hero. A variant is a different layout, not a restyle. Size, colour and loading states are props on one design and are not variants.

The user decides which design their site gets, because it is their brand. You do not. An index entry with `choose: true` offers variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code.

## When to ask

| Situation | What to do |
| --- | --- |
| The entry has `choose: true` and the user has not named a variant | **Ask.** List every variant with its live link. Do not install or write code first. |
| The user named one ("the honeycomb hero") | Use it. No question. |
| The request already narrows the choice ("a login page" on a page that has login and register designs) | Offer only the designs that match. If that leaves one, use it. |
| The user said "pick the best", "your choice", "whatever fits" | Choose by the procedure below, say which and why, and give its live link so they can swap. |
| The entry has no `choose` | One option. Install it. No question. |
| You do not know enough to choose (no purpose, no content, no brand) | Ask the brief questions first, then the variant question. |
| The user asked for a whole page (hero, pricing, footer) | Ask once per section that has variants, all in one message. |
| The client has no question tool | Print a numbered list, end the message and wait for the answer. |

## How to ask

Every option carries its live link. An option without a link is not allowed.

**If your client has a click-to-pick question tool, use it, and make the user answer by clicking, never by typing a name or a number.** Claude Code has `AskUserQuestion`; other clients have an options dialog or a question tool. Send one short message first with the page's `galleryUrl`, so every option can be opened live. These tools hold 2 to 4 options per question, so:

- **3 variants or fewer:** one question. One option per variant (label: the variant's label; description: its `summary`, the first `bestFor` line and its `viewUrl`), plus a last option "Pick the best one for me".
- **4 variants or more** (each variant has a `group`; at most 4 groups, at most 4 variants in each): ask in two rounds.
  1. **Round one, one call with two questions.** Question 1, "How should I choose the <section>?", with the options "I'll pick one" and "Pick the best one for me". Question 2, "Which group of <section>s do you want to see?", with one option per group (label: the group; description: the labels of its variants). Tell the user to ignore question 2 if they pick "Pick the best one for me".
  2. **Round two, only if they chose "I'll pick one".** One question with one option per variant in the chosen group, each described as above, with its `viewUrl`.
- **Several sections with variants on one page** (a hero and a footer): put each section's round-one questions in the same call, up to the tool's limit of 4 questions. Past that, do the sections one after another.
- The tool's own "Other" box is a fallback, not the plan. Do not ask the user to type.

**If your client has no such tool,** print a numbered list in the message and wait for the answer. Give each variant its label, its `summary`, who it suits (`bestFor`) and its `viewUrl`. Add a last option: "Pick the best one for me". For example:

```text
Which hero do you want? All of them live: https://avaraui.com/view/hero

1. Honeycomb hero: Dark travel hero: a huge word on the left, a turning honeycomb of hexagonal photographs on the right. Best for: travel, outdoor and expedition brands with strong photography. Live: https://avaraui.com/view/hero/honeycomb
2. Hero carousel: Full-bleed photo hero with a queue of cards and a glass panel; the front card is the slide on screen. Best for: destinations, hotels and experiences sold by place. Live: https://avaraui.com/view/hero/carousel
3. Fashion hero: Staggered columns of looks on flat colour, with a video badge, a tilt-on-hover effect and a story teaser. Best for: fashion, lookbook and store landing pages. Live: https://avaraui.com/view/hero/fashion
... (every variant, not a sample)

Or tell me to pick the best one for you.
```

Then stop, whether you used the picker or the list. Install nothing until the user answers.

## Choosing for the user

Only when the user asked you to choose, or picked "Pick the best one for me".

1. Know the brief: what the site is for, the tone, and what content and images the user has. If you do not know, ask short brief questions first.
2. Drop every variant whose `avoidIf` matches the brief (for example, "you have no photographs").
3. Score the rest on `bestFor` and `traits` against the brief. Prefer the one that needs the least content the user does not have.
4. Say which you chose and why in one or two sentences, name the runner-up, and give the `viewUrl` so the user can swap.

## After the answer

Install the chosen variant's own `install` command from the index. Several looks of one component can share one install item (the `hero` item holds eight looks): install it once, then set the variant's `props` from the index on the component (the footer is `variant="glass-dock"` and so on; its default is not the look the user may have chosen) and read the page's Markdown for the rest. Do not install every item a page lists.

## Pages with variants today

- `hero`: 16 variants. All live: https://avaraui.com/view/hero
- `footer`: 9 variants. All live: https://avaraui.com/view/footer
- `navbar`: 7 variants. All live: https://avaraui.com/view/navbar
- `pricing`: 12 variants. All live: https://avaraui.com/view/pricing
- `scroll-stack`: 6 variants. All live: https://avaraui.com/view/scroll-stack
- `file-upload`: 3 variants. All live: https://avaraui.com/view/file-upload
- `video-player`: 4 variants. All live: https://avaraui.com/view/video-player
- `audio-player`: 4 variants. All live: https://avaraui.com/view/audio-player
- `auth-forms`: 13 variants. All live: https://avaraui.com/view/auth-forms
- `profile-page`: 3 variants. All live: https://avaraui.com/view/profile-page
- `component-wall`: 2 variants. All live: https://avaraui.com/view/component-wall
- `support-dashboard`: 4 variants. All live: https://avaraui.com/view/support-dashboard
- `counter-section`: 4 variants. All live: https://avaraui.com/view/counter-section
- `cta-section`: 4 variants. All live: https://avaraui.com/view/cta-section
- `reviews`: 4 variants. All live: https://avaraui.com/view/reviews
- `product-details`: 4 variants. All live: https://avaraui.com/view/product-details
- `newsletter`: 3 variants. All live: https://avaraui.com/view/newsletter
- `waitlist`: 3 variants. All live: https://avaraui.com/view/waitlist
- `not-found`: 3 variants. All live: https://avaraui.com/view/not-found
- `dashboard`: 3 variants. All live: https://avaraui.com/view/dashboard
- `faq-section`: 2 variants. All live: https://avaraui.com/view/faq-section
- `book-appointment`: 2 variants. All live: https://avaraui.com/view/book-appointment
- `loader`: 5 variants. All live: https://avaraui.com/view/loader
- `vertical-tabs`: 8 variants. All live: https://avaraui.com/view/vertical-tabs
- `accordion`: 6 variants. All live: https://avaraui.com/view/accordion
- `gallery`: 6 variants. All live: https://avaraui.com/view/gallery
- `image-compare`: 10 variants. All live: https://avaraui.com/view/image-compare
- `cursor-animation`: 11 variants. All live: https://avaraui.com/view/cursor-animation
- `toast`: 4 variants. All live: https://avaraui.com/view/toast
- `theme-switcher`: 3 variants. All live: https://avaraui.com/view/theme-switcher
- `chat`: 4 variants. All live: https://avaraui.com/view/chat
- `calendar`: 4 variants. All live: https://avaraui.com/view/calendar
- `email`: 4 variants. All live: https://avaraui.com/view/email
- `ai-chat`: 5 variants. All live: https://avaraui.com/view/ai-chat
- `curved-carousel`: 2 variants. All live: https://avaraui.com/view/curved-carousel
- `data-maps`: 2 variants. All live: https://avaraui.com/view/data-maps
- `draggable-card-list`: 2 variants. All live: https://avaraui.com/view/draggable-card-list
- `heart-signal`: 3 variants. All live: https://avaraui.com/view/heart-signal
- `image-viewer`: 4 variants. All live: https://avaraui.com/view/image-viewer
- `input`: 4 variants. All live: https://avaraui.com/view/input
- `invoice`: 3 variants. All live: https://avaraui.com/view/invoice
- `item`: 2 variants. All live: https://avaraui.com/view/item
- `fleet-tracker`: 3 variants. All live: https://avaraui.com/view/fleet-tracker
- `modern-scroll-stack`: 2 variants. All live: https://avaraui.com/view/modern-scroll-stack
- `particle-canvas`: 2 variants. All live: https://avaraui.com/view/particle-canvas
- `range-date-picker`: 4 variants. All live: https://avaraui.com/view/range-date-picker
- `scroll-area`: 3 variants. All live: https://avaraui.com/view/scroll-area
- `split-flap`: 2 variants. All live: https://avaraui.com/view/split-flap
- `terminal`: 3 variants. All live: https://avaraui.com/view/terminal
- `counter`: 8 variants. All live: https://avaraui.com/view/counter
- `designs-toolkit`: 2 variants. All live: https://avaraui.com/view/designs-toolkit
- `glass-panel`: 3 variants. All live: https://avaraui.com/view/glass-panel
- `otp-input`: 2 variants. All live: https://avaraui.com/view/otp-input
- `progress`: 2 variants. All live: https://avaraui.com/view/progress
- `select`: 2 variants. All live: https://avaraui.com/view/select
- `social-links`: 4 variants. All live: https://avaraui.com/view/social-links
- `table`: 3 variants. All live: https://avaraui.com/view/table
- `tech-stack`: 2 variants. All live: https://avaraui.com/view/tech-stack
- `timeline`: 5 variants. All live: https://avaraui.com/view/timeline
- `toggle-group`: 4 variants. All live: https://avaraui.com/view/toggle-group
- `ribbon-drift`: 2 variants. All live: https://avaraui.com/view/ribbon-drift

An index entry with `choose: true` is the authority: it lists every variant and its live link.
