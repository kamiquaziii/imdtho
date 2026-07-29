# Team headshots

Drop the two headshots here, then wire them into `team.html`:

| File | Used for |
|---|---|
| `zuhayer.jpg` | Zuhayer Quazi's profile |
| `shivam.jpg` | Shivam Patel's profile |

In `team.html`, replace the placeholder block inside each `.profile__photo` with:

```html
<img src="assets/img/team/zuhayer.jpg" alt="Zuhayer Quazi">
```

Notes:
- Aspect ratio is **4:5** (portrait). Roughly 800×1000px or larger looks crisp.
- The site renders photography in **black & white** automatically (brand rule) —
  a `grayscale(100%)` filter is applied, so color photos are fine.
- Keep files reasonably small (< ~300KB each) for fast loads.
