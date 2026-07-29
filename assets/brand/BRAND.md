# imdtho — brand guidelines

imdtho is a search fund. The ethos: **always down** — biased toward action, and we want investors and sellers to be down too. The identity is flat, architectural, and typographic: burgundy and white, zero corner radius, strong 2px rules, everything flush left.

## The mark — "step down"

Three solid blocks descending like stairs, left to right. It reads as momentum: deal-by-deal progress, always moving down toward action.

- Geometry (44×44 viewBox): rects at (0,0,16,14), (14,15,16,14), (28,30,16,14). Never redraw, rotate, flip, or re-space the blocks.
- One color only: burgundy `#6F1D2B` on white/light grounds, white on burgundy/dark grounds. Never multicolor, never outlined, never with shadows or gradients.
- Minimum size 16px. Clear space around the lockup: one block-width (⅓ of mark height) on all sides.

## Wordmark

`imdtho` — always lowercase, Archivo SemiBold (600), letter-spacing -0.03em, set in ink `#201E1D` (white when reversed). Pronounced im·d·tho. On the web, prefer live text (`.imdtho-wordmark`) over the SVG lockup.

Lockup: mark + wordmark side by side, gap ≈ ⅓ mark height, optically centered. No tagline in the lockup.

## Color

Burgundy and white. The system is mostly ink on white — burgundy is the accent and is used sparingly: the mark, primary actions, small emphasis, and occasional full-bleed poster moments (a solid burgundy band with white display type).

| Token | Hex | Use |
|---|---|---|
| burgundy-500 | #6F1D2B | Brand base: mark, primary buttons, rules of emphasis |
| burgundy-700 | #4A121D | Accent-colored body/paragraph text (contrast-safe) |
| burgundy-600 | #5C1723 | Hover/pressed on light grounds |
| burgundy-100–300 | see tokens.css | Tinted fills, subtle borders |
| ink | #201E1D | Default text |
| white | #FFFFFF | Ground |

## Typography

Archivo (Google Fonts) for everything — headings and body. Headings 600–700 weight, tight tracking (-0.03em) at display sizes, always flush left. Body 400/500, normal tracking. Never center hero copy or button labels; wide buttons start their label at the left padding edge.

## Structure (website)

- Zero border-radius everywhere. Flat: no gradients, no decorative shadows.
- Strong 2px rules (`--rule`) divide major sections; let the grid show.
- Photography prints in black and white (grayscale filter), never tinted.
- Icons: Lucide (https://lucide.dev).
- Focus states: `outline: 2px solid var(--burgundy-500); outline-offset: 2px;`

## Don'ts

- Don't round corners, add gradients, or drop shadows on the mark.
- Don't set the wordmark in any weight but 600, any case but lowercase.
- Don't run burgundy as a page-wide background except poster statements.
- Don't recolor, rotate, or restack the step blocks.

## Files

- `logo-mark.svg` / `logo-mark-white.svg` — the mark alone
- `logo-lockup.svg` / `logo-lockup-white.svg` — mark + wordmark (SVG text; requires Archivo loaded — prefer live-text lockup on the web)
- `favicon.svg` — burgundy tile, white blocks
- `tokens.css` — drop-in CSS custom properties + wordmark classes

Load Archivo: `<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap" rel="stylesheet">`
