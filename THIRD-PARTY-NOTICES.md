# Third-Party Notices

This project is licensed under the MIT License — see [LICENSE](LICENSE).

It includes and redistributes a small amount of third-party code, listed below.
The MIT License requires the original copyright notice to be preserved in
copies and substantial portions; that is what this file is for.

---

## shadcn/ui

The following files are derived from [shadcn/ui](https://github.com/shadcn-ui/ui):

- `src/components/custom/ui/accordion.tsx`
- `src/components/custom/ui/avatar.tsx`
- `src/components/custom/ui/badge.tsx`
- `src/components/custom/ui/button.tsx`
- `src/components/custom/ui/sheet.tsx`
- `src/components/custom/ui/slider.tsx`

shadcn/ui is distributed under the MIT License:

```
MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Everything else

All other components — including every block under
`src/components/custom/blocks/` and the remaining primitives
(`base.tsx`, `codeblocks.tsx`, `multi-select.tsx`, `FluidGlassSlider.tsx`) —
are original AlgorizeTech work, licensed under this project's MIT License.

---

## Runtime dependencies

npm packages used by these components (`@radix-ui/*`, `lucide-react`,
`framer-motion`, `gsap`, `leaflet`, `react-leaflet`, `react-day-picker`,
`class-variance-authority`, `qrcode.react`, `jsqr`, `next-themes`,
`react-icons`, `motion`) are installed from npm by the consumer and retain
their own licenses. They are not redistributed by this project.
