---
title: "Shadcn Voice Note"
description: "Shadcn Voice Note. A hold-to-record voice note component with dynamic audio waveform bars, slide-to-cancel gesture, and instant playback with a discard option."
url: https://avaraui.com/docs/nextjs/voice-note
---

# Shadcn Voice Note

A hold-to-record voice note component with dynamic audio waveform bars, slide-to-cancel gesture, and instant playback with a discard option.

Press and hold the pill to record audio in real time. Sliding left cancels the recording, and releasing gives you an instant audio player with waveform seeking and a close/discard option.

## Voice Note

Press and hold to record with live animated waveforms, slide left to cancel, and release to preview audio playback with close option.

- `holdLabel="Hold to record"` label displayed inside the pill during the idle state.
- `slideCancelLabel="< Slide to cancel"` cancel hint shown underneath the pill during active recording.

```tsx
"use client";

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/voice-note
