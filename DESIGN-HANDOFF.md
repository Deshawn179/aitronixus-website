# AiTroniXus — Sculpted Intelligence redesign

Updated 17 September 2026 in `C:\Users\RT\Desktop\aitronixus`.
The original `HANDOFF.md` remains available for stack, intro timing, and the
motion safeguards. Those safeguards were intentionally preserved.

## What changed

- Rebuilt the hero around the approved transparent chrome pinwheel mark.
  CSS orbital geometry, a lit pedestal, floating movement, and three genuinely
  interactive focus controls accompany the new editorial headline.
- Added a three-part exploration bridge linking to intelligence, capabilities
  and approach. Visitors have clear routes into the existing business content.
- Replaced the old chip symbol with the approved 3D identity in the navigation,
  introduction wordmark, footer, favicon and generated social preview.
- Added a CSS-built dimensional service installation whose labels and accent
  change with the capabilities accordion.
- Restyled the entire page: glass navigation, dimensional layer controls,
  capability surfaces, operating-model controls, principles, ecosystem,
  contrasting light outcomes, solution panels, vision and inquiry form.
- Removed visible developer placeholders from the footer without inventing
  contact details or publishing nonexistent legal pages.

## Files

- `src/app/experience.css`: final visual-system overrides and responsive rules.
- `src/components/hero/Hero.tsx`: rebuilt hero and focus controls.
- `src/components/hero/ExperienceBridge.tsx`: three exploration links.
- `src/components/sections/ServiceSculpture.tsx`: lightweight depth installation.
- `src/components/sections/Capabilities.tsx`: installation integration.
- `src/components/brand/Wordmark.tsx`: shared approved chrome mark and wordmark.
- `src/components/site/SiteFooter.tsx`: revised footer.
- `src/app/opengraph-image.tsx`: branded social-sharing image.
- `src/app/icon.png`: approved-mark favicon, replacing the old chip SVG.
- `public/brand/`: optimized WebP marks and PNG for social-image generation.
- `src/app/page.tsx`, `src/app/layout.tsx`: new component and stylesheet imports.

The hero WebP is about 118 KB; the navigation WebP is about 9 KB. The original
approved full-resolution artwork is unchanged in the earlier task's outputs.
The design uses an actual rendered 3D logo with CSS depth/movement, not an
interactive 3D mesh or a heavy WebGL engine.

## Run locally

```powershell
Set-Location C:\Users\RT\Desktop\aitronixus
npm run build
npm run start -- --hostname 127.0.0.1 --port 3000
```

Preview: http://127.0.0.1:3000 . Development: `npm run dev`.
Stop the development/production server before rebuilding: both modes share
`.next`, and simultaneous build/dev activity can corrupt the running preview.
This is a local preview, not a public deployment.

## Verification and launch requirements

Production build/type checks passed during redesign. Chrome visual checks
covered the desktop hero, capability installation, solution panel, light
outcomes section, 390px mobile hero and mobile menu. Tested hero focus switching,
capability expansion, intelligence-layer switching, Azure scenario switching,
mobile menu open/close and Escape. Desktop/mobile root widths showed no horizontal
overflow. The embedded browser sometimes shows black; Chrome rendered correctly.
A browser extension injected `fdprocessedid` attributes and caused a React
hydration warning; these are not authored by the site. No suppression was added.

The film and its timing were preserved, not re-edited as part of this redesign.
Contact delivery still requires `AITRONIXUS_CONTACT_WEBHOOK`. Real contact
details, social links and approved privacy/legal text must be supplied before
public launch. No clients, statistics, certification or partnership claims were
invented. No external form submission was performed during verification.

Original source backup:
`C:\Users\RT\Documents\Codex\2026-09-14\i-x20\site-before-overhaul\src`.
The replaced chip SVG is recoverable from that backup.
