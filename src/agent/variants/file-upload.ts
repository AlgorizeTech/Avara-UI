import type { PageVariants } from "./types";

/**
 * File upload: 3 designs, three registry items. `input` and `folder` are
 * general-purpose components that also do upload, so they are marked
 * `generalItem` and their registry descriptions carry no ask-first notice.
 * Claims come from src/app/docs/[framework]/file-upload/page.mdx.
 */
export const fileUpload: PageVariants = {
  slug: "file-upload",
  intro:
    "Ways to let a visitor attach files. Three designs: a full dropzone with per-file progress, a plain file field with previews inside a form, and a folder you drop files onto.",
  gotchas: [
    "`input` and `folder` are general components used for much more than uploads. Install the one that matches the chosen design and set its props from the index.",
  ],
  variants: [
    {
      id: "dropzone",
      label: "Dropzone with upload states",
      summary: "A drag-and-drop zone with a row per file: progress, pause, retry, time remaining and success or error states.",
      bestFor: ["multi-file uploads where users need to watch each file land"],
      avoidIf: ["you only need to attach one file to a form"],
      traits: ["drag feedback", "per-file progress", "retry", "size limit in megabytes"],
      item: "upload",
      demo: "upload",
      example: "Dropzone",
      props: { layout: "dropzone" },
    },
    {
      id: "file-input",
      label: "File input with previews",
      summary: "The Input block in file mode: a drag-and-drop field with previews and removal, built to sit inside a form.",
      bestFor: ["a form that just needs files attached"],
      avoidIf: ["users need to see progress and retry for each file"],
      traits: ["inside a form", "previews", "removal", "returns native File[]"],
      item: "input",
      demo: "input",
      example: "Simple file input",
      props: { inputType: "file", isMultiple: true, isImageOnly: true },
      setProps: { inputType: "file" },
      generalItem: true,
    },
    {
      id: "folder-drop",
      label: "Folder drop target",
      summary: "A tactile frosted-glass folder that takes dropped or picked files; each file becomes a card with its own progress bar.",
      bestFor: ["galleries and file groups where a folder metaphor fits"],
      avoidIf: ["you want a plain form field"],
      traits: ["folder metaphor", "cards per file", "progress bar", "follows the theme colour"],
      item: "folder",
      demo: "folder",
      example: "Folder drop target",
      props: { example: "upload" },
      generalItem: true,
    },
  ],
};
