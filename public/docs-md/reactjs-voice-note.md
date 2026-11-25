---
title: "Shadcn Voice Note"
description: "Shadcn Voice Note. A hold-to-record voice note component with dynamic audio waveform bars, slide-to-cancel gesture, and instant playback with a discard option."
url: https://avaraui.com/docs/nextjs/voice-note
---

# Shadcn Voice Note

A hold-to-record voice note component with dynamic audio waveform bars, slide-to-cancel gesture, and instant playback with a discard option.

Press and hold the pill to record audio in real time. Sliding left cancels the recording, and releasing gives you an instant audio player with waveform seeking and a close/discard option.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/voice-note.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/voice-note
```

## Voice Note

Press and hold to record with live animated waveforms, slide left to cancel, and release to preview audio playback with close option.

- `holdLabel="Hold to record"` label displayed inside the pill during the idle state.
- `slideCancelLabel="< Slide to cancel"` cancel hint shown underneath the pill during active recording.

```tsx
import { VoiceNote } from "@/components/custom/blocks/VoiceNoteBlock";

export default function VoiceNoteInteractiveDemo() {
  return (
    <VoiceNote
      holdLabel="Hold to record"
      slideCancelLabel="< Slide to cancel"
      onRecordComplete={(res) => {
        console.log("Voice note recorded:", res);
      }}
      onCancel={() => {
        console.log("Recording cancelled or discarded");
      }}
    />
  );
}
```

## About Shadcn Voice Note

**What it is.** **Shadcn Voice Note** (`VoiceNote`) is a hold-to-record audio capture pill with real-time animated waveform bars, a slide-left-to-cancel gesture, and instant inline playback with waveform seeking and discard.

**How it is built.** Holding the pill starts recording and tracks pointer horizontal drag distance for cancellation; releasing transitions into a compact player and invokes `onRecordComplete` or `onCancel`.

**When to use it.** Use it for chat composers, voice feedback widgets, audio journaling apps, and customer support message inputs.

## For AI agents

**When to use**

- Chat composers, voice feedback widgets
- Audio journaling apps, customer support message inputs

**When not to use**

- Playing back an existing audio file: use [Audio Player](https://avaraui.com/docs/reactjs/audio-player)
- A complete messenger interface: use [Chat](https://avaraui.com/docs/reactjs/chat)

**Agent notes**

- `VoiceNote` accepts `holdLabel`, `slideCancelLabel`, `themeColor`, `onRecordComplete`, and `onCancel`.
- Supports press-and-hold recording, slide-left cancellation, and release-to-preview waveform playback.
- Customize copy labels for localization directly via `holdLabel` and `slideCancelLabel`.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `holdLabel` | `string` | `"Hold to record"` | Label displayed inside the pill during the idle state. |
| `slideCancelLabel` | `string` | `"< Slide to cancel"` | Subtext displayed underneath the pill during active recording. |
| `themeColor` | `string` | `undefined` | Custom theme accent color applied to the play button, active soundwave bars, and pulse indicators. |
| `maxDuration` | `number` | `60` | Maximum recording duration in seconds before auto-completing. |
| `minDuration` | `number` | `0.5` | Minimum duration in seconds required to accept the recording. A short tap below this threshold cancels the record immediately. |
| `enableMic` | `boolean` | `true` | Captures real audio via navigator.mediaDevices when microphone permission is granted. |
| `initialState` | `"idle" \| "recording" \| "recorded"` | `"idle"` | Initial visual state for previews and testing. |
| `onRecordStart` | `() => void` | `undefined` | Callback invoked when the user starts holding to record. |
| `onRecordComplete` | `(result: VoiceNoteRecordResult) => void` | `undefined` | Callback invoked when recording successfully finishes. |
| `onCancel` | `() => void` | `undefined` | Callback invoked when recording is cancelled or closed via the 'X' button. |

## Works with other components

Pair `VoiceNote` with [Audio Player](https://avaraui.com/docs/reactjs/audio-player) for published audio playback, [Chat](https://avaraui.com/docs/reactjs/chat) and [Chat Bubble](https://avaraui.com/docs/reactjs/chat-bubble) for messaging threads, and [Toast](https://avaraui.com/docs/reactjs/toast) for recording permission alerts.

## How do I build a hold-to-record voice message button in React?

Render `VoiceNote` and handle `onRecordComplete`. Users press and hold the pill to record, with live waveform bars, then release to get an inline player with a discard option. With `enableMic` on, which is the default, it captures real audio through `navigator.mediaDevices`.

## How do users cancel a recording before releasing?

While holding the pill, sliding the pointer or finger to the left cancels the recording and fires `onCancel`. A tap shorter than `minDuration`, which is `0.5` seconds by default, also cancels immediately, so accidental presses do not create empty notes.

## Can I customize the prompt text inside the pill?

Yes. Pass custom strings to `holdLabel` and `slideCancelLabel` to adapt the prompts to your product or locale. The defaults are "Hold to record" while idle and a "Slide to cancel" hint while recording.

## How do I limit how long a voice note can be?

Set `maxDuration` in seconds. It defaults to `60`, and recording auto-completes when the limit is reached. `minDuration` is the shortest recording accepted. Use `onRecordStart`, `onRecordComplete` and `onCancel` to hook the lifecycle into your upload logic.

## Does VoiceNote ask for microphone permission?

Yes, when `enableMic` is `true` it requests access through `navigator.mediaDevices` and records real audio once permission is granted. Set `initialState` to `"recording"` or `"recorded"` to preview those states in a design or test without a microphone.

---

Live previews and every example: https://avaraui.com/docs/nextjs/voice-note
