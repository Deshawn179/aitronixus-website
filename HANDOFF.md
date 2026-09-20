# AiTroniXus — Handoff

**Written:** 2026-09-17
**Project location:** `C:\Users\RT\Desktop\aitronixus`
**Status:** Full site built and verified. Logo swap in progress, not finished, no logo code changed yet.

This document is written to be self-contained — everything a new session needs to
pick up this project with no prior context is below. Paths are absolute.

---

## 1. What this project is

A cinematic, single-page Next.js marketing site for **AiTroniXus** ("Redefining
the Future of Intelligent Infrastructure"), built around a supplied intro video
that dissolves from a UFO into an AI processor chip, then into the page itself.

Stack: Next.js 15.5.4 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion. Node 20+ required (built and tested against Node 24).

---

## 2. How to run it right now

```bash
cd /c/Users/RT/Desktop/aitronixus   # or C:\Users\RT\Desktop\aitronixus
npm install                          # only if node_modules is missing
npm run dev                          # http://localhost:3000
```

Production mode (what was used for LAN demos):

```bash
cd /c/Users/RT/Desktop/aitronixus
npm run build
npx next start -p 3210 -H 0.0.0.0    # binds all interfaces, not just localhost
```

**The server is currently NOT running.** It was stopped/died between sessions.
Start it with the commands above before trying to view anything.

### Sharing it on a LAN

`-H 0.0.0.0` makes it reachable at the machine's LAN IP, not just `localhost`.
That IP **changes depending on which Wi-Fi network the machine is on** — it has
been `192.168.1.85`, `10.0.0.26`, and is `192.168.1.85` again as of this
writing. Get the current one with:

```powershell
Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' }
```

**Known blocker:** this machine's Wi-Fi profile has shown up as **Public** in
Windows' network category at least once. On a Public profile, Windows Firewall
blocks unsolicited inbound connections by default, so another device on the
same Wi-Fi may not be able to reach the LAN IP even though the server is
running and self-tests fine from this machine. Fix (user's call, not
something an assistant can toggle unilaterally): **Settings → Network &
internet → Wi-Fi → [network name] → Network profile type → Private**, or add
an inbound firewall rule for the Node process/port. Trade-off worth stating to
the user: Private also makes this machine discoverable to the whole LAN, which
is normal for a home network but not for a shared/public one.

If firewall changes aren't wanted, a Cloudflare quick tunnel
(`cloudflared tunnel --url http://localhost:3210`) gives a public HTTPS URL
with no firewall change and no same-Wi-Fi requirement — but it puts the
(unfinished, placeholder-contact-info) site on the open internet. Get explicit
go-ahead before doing that.

---

## 3. Repo state — NOT a git repository

`git status` returns "not a git repository." Nothing here is version
controlled. `.gitignore` already exists and is correct
(`node_modules`, `.next`, `.env*.local`), so `git init && git add -A && git
commit` is safe to run whenever wanted. This was flagged to the user once and
not yet actioned.

---

## 4. File map

```
src/
  app/
    layout.tsx              Fonts (Sora/Inter/JetBrains Mono via next/font), metadata,
                             Organization JSON-LD, wraps everything in IntroProvider + SiteChrome
    page.tsx                Section composition (imports every section below, in order)
    not-found.tsx            Custom 404 ("This node is not on the map")
    globals.css              Design tokens (@theme block), base styles, type utilities,
                             atmosphere (grid/grain/halo), buttons, form fields, keyframes,
                             reduced-motion overrides, motion-guard override (see section 6)
    chrome.css               Nav, mobile menu, footer, cursor aura, scroll progress
    intro.css                Cinematic intro overlay, all phase-driven via [data-phase] CSS
    sections.css             Every content section's layout (hero through conversion)
    icon.svg                 Favicon — STILL THE ORIGINAL PLACEHOLDER (see section 7)
    opengraph-image.tsx      Generates the 1200x630 social card at build time from tokens
    robots.ts / sitemap.ts   SEO surface
    api/contact/route.ts     Contact form endpoint (validates, POSTs to a configurable
                             webhook if AITRONIXUS_CONTACT_WEBHOOK is set, else logs+tells
                             the visitor delivery isn't configured yet)

  components/
    brand/Wordmark.tsx        Text-based "Ai/Troni/X/us" treatment + abstract chip-node SVG.
                              STILL THE ORIGINAL PLACEHOLDER — see section 7, this is the file to edit.
    intro/CinematicIntro.tsx  The intro video component (see section 5 for how it works)
    intro/IntroContext.tsx    Replay button plumbing (the "Watch the AiTroniXus Experience" CTA)
    hero/Hero.tsx             Editorial hero section
    hero/InfrastructureViz.tsx  Authored (not random) SVG topology — core + 3 orbital tiers
    site/SiteChrome.tsx       Skip link, scroll progress, cursor aura, nav, footer wrapper
    site/SiteNav.tsx          Sticky nav + mobile panel (CSS-driven, not animation-library-driven — see section 6)
    site/SiteFooter.tsx       Footer; contains the placeholder chips (section 8)
    site/SystemStatus.tsx     Small animated "system status" footer detail
    sections/                 The 9 content sections (Intelligence Layer, Capabilities,
                              Operating Model, Principles, Ecosystem, Outcomes, Scenarios,
                              Manifesto, Conversion/contact form)
    fx/Reveal.tsx             Scroll-triggered entrance animations
    fx/useInViewSafe.ts       IntersectionObserver wrapper with a geometry fallback (section 6)
    fx/MotionGuard.tsx        Confirms requestAnimationFrame actually runs; if not, forces
                              every animated reveal to its finished state (section 6)
    fx/Magnetic.tsx           Desktop-only magnetic CTA hover effect
    fx/Ambient.tsx            Scroll progress bar + cursor aura

  lib/content.ts             ALL site copy lives here, single source of truth

public/
  media/
    alien-spacecraft-ai-website-intro.mp4   The supplied intro film (9.97s)
    intro-poster.svg                         Fallback poster frame
  logo-preview/               SCRATCH FILES, NOT PART OF THE SITE — see section 7, should be deleted
```

Full narrative version of all this (creative direction, section-by-section
description, performance/accessibility rationale) is in
`C:\Users\RT\Desktop\aitronixus\README.md` — read that for the "why," this
document is the "what's actually true right now."

---

## 5. The cinematic intro — how it's timed

Source film: `public/media/alien-spacecraft-ai-website-intro.mp4`, 9.97s. It
cross-dissolves from a UFO into a glowing "AI" processor die at roughly 5.4s.

`CinematicIntro.tsx` reads the `<video>` element's own `currentTime` and
derives five phases from it — nothing is a fixed setTimeout race against
playback:

| Time | Phase | What happens |
|---|---|---|
| 0 to 5.3s | flight | Film only, four corner HUD ticks, one "Signal acquired" status line |
| 5.3 to 6.35s | transition | The dissolve; HUD fades out |
| 6.35s | identity | AiTroniXus wordmark resolves in the lower third of the frame (not centered — the film's own subject occupies the middle, and centering would collide with the chip's own "AI" glyph baked into the footage) |
| 7.4s | chrome | Supporting tagline fades in |
| 9.15s | dissolve | Film scales forward and fades into the hero's dark environment |

**Important engineering fact, not obvious from reading the component alone:**
this was rewritten mid-project from Framer Motion's `AnimatePresence` to pure
CSS transitions driven by a `data-phase` attribute. The reason: this overlay
gates the entire page (nothing else is visible/usable until it's gone), and it
was found in testing that on a host where `requestAnimationFrame` never fires,
an `AnimatePresence`-driven exit animation never resolves, permanently
trapping the visitor behind the intro. Same fix applied to the mobile nav
menu. See section 6 for the general pattern this created.

Behavior:
- Autoplay muted, inline, `object-fit: cover`
- Skip button + Esc always available
- Completion stored in `sessionStorage` (`aitronixus.intro.seen.v1`) —
  returning visitors in the same session get a ~1.5s "abbreviated" identity
  card instead of refetching the 9MB film
- Following any link with a URL hash (e.g. `/#solutions`) skips the intro
  entirely — a deep link is a request for that section, not the title sequence
- `prefers-reduced-motion`, `navigator.connection.saveData`, and detected
  2G/3G connections all skip straight to the static hero
- 4-second watchdog: if the video hasn't progressed past `currentTime < 0.1`
  by then (blocked autoplay, codec issue, network failure), it falls through
  to the hero rather than leaving a black screen
- "Watch the AiTroniXus Experience" button in the hero calls `requestReplay()`
  from `IntroContext`, which always re-plays the full film regardless of
  session state

---

## 6. Non-obvious engineering decisions (read before touching motion code)

These came from real bugs found during testing, not speculative hardening —
worth understanding before "simplifying" anything back to a more obvious
pattern.

1. **`MotionGuard` (`components/fx/MotionGuard.tsx`).** On mount, it fires one
   `requestAnimationFrame` and one 800ms timeout race. If the rAF never wins,
   it sets `<html data-motion="off">`. A CSS rule in `globals.css` (search
   `[data-motion="off"]`) then forces every `[data-reveal]`-tagged entrance
   animation to its finished, visible state. Why this exists: every
   scroll-triggered reveal on this site hides its element until an animation
   plays it in. That's fine as long as the animation is guaranteed to run —
   but a host where the frame loop never runs (some embedded webviews,
   automated screenshot/prerender pipelines, throttled background tabs) would
   otherwise leave that copy permanently invisible, with no error, nothing in
   the console. This was caught by hand during testing, not by any test
   framework — worth remembering if this component looks removable.

2. **`useInViewSafe` (`components/fx/useInViewSafe.ts`).** Same class of bug,
   different mechanism: components that used Framer's `whileInView` are
   vulnerable if `IntersectionObserver` never reports (again: some embedded
   contexts don't fire IO callbacks at all). This hook wraps IO but starts a
   1.2s fallback timer; if IO hasn't reported by then, it disconnects the
   observer and switches to measuring `getBoundingClientRect()` on scroll
   instead. Content becomes visible either way.

3. **The mobile nav panel (`SiteNav.tsx`) is not wrapped in
   `AnimatePresence`.** Same reasoning as the intro — it's a full-page
   overlay, so its unmount must not depend on an animation library's exit
   callback ever firing. It mounts/unmounts on plain React conditional
   rendering; the entrance motion is a CSS `@keyframes` animation in
   `chrome.css` (`menu-in`), not a JS-driven one.

**The general rule these three encode:** anything that hides content or blocks
the page until an animation completes must have a non-animation-dependent
fallback. New motion code added to this project should follow the same
pattern, or should not gate visibility/interactivity at all.

---

## 7. Logo — full status, this is the unfinished part

### What's live right now (unchanged since project start)

- `src/components/brand/Wordmark.tsx` — a text-based treatment
  ("**Ai**Troni**X**us" with color-weighted spans) plus an abstract inline-SVG
  "chip aperture" glyph (`IntelligenceNode`). This is what currently renders
  in the nav, footer, mobile menu, intro overlay, and 404 page.
- `src/app/icon.svg` — a simplified version of that same chip-aperture glyph,
  used as the favicon.
- **Neither file has been touched by any of the logo work described below.**
  Everything below is exploration/asset-prep only.

### The logo saga, in order

**Round 1 — my own concepts (superseded).** Before the user had any real logo
assets, I designed 4 original SVG mark concepts (Node Aperture, Orbital
Signal, Infrastructure Monogram, Signal Bracket) and published them as a
Claude artifact for review at
`https://claude.ai/artifact/C9ksmG473JZXZpDNAGdpKb`. **The user did not pick
any of these** — a real logo package arrived instead. This artifact can be
ignored/discarded going forward.

**Round 2 — "Nexus Gate" package (rejected by the user).** The user pointed at
`C:\Users\RT\Documents\Codex\2026-09-14\i-x20\outputs\aitronixus-nexus-gate-logo-package.zip`
(also pre-extracted at `...\i-x20\outputs\aitronixus-logo-package\`). This is
a 3-color isometric hexagon "gate" mark (cyan top face, near-black
bottom-left face, blue bottom-right face, with a small hexagonal cutout and
cyan core in the middle) plus wordmark lockups and a LinkedIn avatar, all as
clean SVG. It was extracted, diffed against the pre-extracted copy
(identical), the README read (documents the color palette and usage rules),
and all 5 SVGs rendered in-browser to check the geometry — it renders
correctly; a `transform="translate(-39 0)"` on one path that looked
suspicious at first glance is actually load-bearing (it correctly positions
the hexagon's third face) and is not a bug. These 5 SVG files plus a preview
HTML were copied into `public/logo-preview/` on the live site purely to view
them in a browser tab. **The user then said "Thats the wrong logo" — this
whole package is rejected.** `public/logo-preview/` is leftover scratch from
this step and should be deleted; it is not referenced by any site code.

**Round 3 — the correct flat mark (approved, not yet wired in).** The user
pasted an image directly in chat: a flat cyan/white/blue "pinwheel" mark,
three congruent notched-ribbon shapes arranged with 3-fold rotational
symmetry around a small negative-space gap (looks like interlocking circuit
traces or folded ribbons). This was matched to an existing file:
`C:\Users\RT\Documents\Codex\2026-09-14\i-x20\outputs\aitronixus-linkedin-logo.png`
— confirmed pixel-identical to the pasted image.

  - File facts: 800x800px, PNG color type 2 (RGB, no alpha channel).
  - Background: sampled at all 4 corners plus center = solid RGB(3,7,13) (hex
    `#03070D`) — extremely close to but not identical to the site's own void
    black token `--color-void: #030507`.
  - The problem this creates: dropped straight into the nav/footer as-is,
    this would render as a dark rectangle rather than blending into the page,
    because it has no transparency.
  - The fix in progress, not yet executed: since the mark contains no black
    pixels in the actual design (only cyan/white/blue), the black background
    can be mathematically removed by treating the image as
    premultiplied-alpha-over-black and unpremultiplying it: for each pixel,
    `alpha = max(R,G,B) / 255`, then `outputColor = originalColor / alpha`
    (clamped, careful with near-zero alpha). This recovers a properly
    transparent PNG rather than a hard-edge chroma key, which matters because
    the shape has soft/anti-aliased edges against the black background — a
    naive "make near-black transparent" threshold would leave dark fringing
    around every edge.
  - What was actually done before this got interrupted: wrote and ran a
    PowerShell snippet using `System.Drawing.Bitmap` to sample corner/center
    pixels (confirms the numbers above). The actual unpremultiply-and-export
    script was never written. No transparent version of this asset exists
    yet anywhere on disk.

**Round 4 — the 3D chrome variant (approved, "add as a clickable option," not
yet built).** The user pasted a second image mid-turn: a glossy, brushed-metal
3D render of the same pinwheel mark on a white/transparent-looking
background, and asked to "add this logo as a clickable option on the
website." This was matched to:
`C:\Users\RT\Documents\Codex\2026-09-14\i-x20\outputs\aitronixus-3d-website-logo-transparent.png`
— confirmed pixel-identical.

  - File facts: 1254x1254px, PNG color type 6 (RGBA, real alpha channel
    already present — this one needs no processing, it's ready to use as-is).
  - Two sibling files exist and were inspected but are NOT what was approved
    — do not use them: `aitronixus-linkedin-logo-3d.png` (same mark, but
    rendered with a dark studio floor, reflection, and smoke, not
    transparent — a hero/marketing shot, not a UI asset) and
    `aitronixus-orbital-concept.png` (a different, wider concept image, never
    referenced by the user).
  - Open question, never resolved with the user: "add as a clickable option"
    is ambiguous. The working assumption, never confirmed, was some kind of
    interactive reveal — e.g. clicking the nav mark or an easter egg toggles
    between the flat mark and this 3D render, or it appears in a
    modal/lightbox on click. A new session should ask the user what
    "clickable option" means before building it — it could equally mean "a
    button/link somewhere that shows this image," "a toggle switch for
    light/dark or flat/3D," or something else entirely.

### Exact next steps to finish this

1. Ask the user to clarify what "clickable option" should actually do with
   the 3D render, if not already clarified elsewhere.
2. Write the unpremultiply script for the flat mark (PowerShell
   `System.Drawing`, or Node with a PNG library — nothing suitable was
   installed as of this writing) and export a true-alpha PNG (or, better,
   hand-trace it as an SVG for lossless scaling at favicon size — no SVG
   source exists for this mark, only the two PNGs).
3. Copy the finished transparent flat-mark asset into `public/brand/` (new
   folder, doesn't exist yet) and the 3D chrome asset alongside it.
4. Edit `src/components/brand/Wordmark.tsx` to render the new mark image (or
   inlined SVG if hand-traced) instead of the current `IntelligenceNode`
   glyph — this is the single file every other component already imports
   from, so this is intentionally a one-file change.
5. Regenerate `src/app/icon.svg` (or add `icon.png`) from the new mark for
   the favicon.
6. Regenerate `src/app/opengraph-image.tsx`'s mark to match (it currently
   draws its own inline JSX version of the placeholder glyph).
7. Build the "clickable option" behavior for the 3D render per whatever the
   user clarifies in step 1.
8. Delete `public/logo-preview/` (Round 2 scratch files, unused).
9. Rebuild (`npm run build`) and visually re-verify nav, footer, mobile menu,
   intro overlay, 404 page, and the OG image — every one of these currently
   renders the old placeholder wordmark and needs to be checked after the
   swap.

---

## 8. Content still needed from the user (unchanged, still outstanding)

Marked in the UI as dashed placeholder chips in the footer
(`src/components/site/SiteFooter.tsx`) — nothing fabricated in their place:

- Email address
- Telephone number
- Registered address
- Social profiles
- Privacy policy text/link
- Legal notice text/link

Also outstanding, environment-level (`.env.example` documents both):
- `AITRONIXUS_CONTACT_WEBHOOK` — where the contact form actually delivers
  submissions. Unset right now, so submissions are validated and logged to
  the server console only, and the visitor is told delivery isn't configured
  yet (this is honest, working behavior, not a bug).
- `NEXT_PUBLIC_SITE_URL` — used for canonical/OG URLs, currently defaults to
  a placeholder domain.

No fabricated client names, testimonials, statistics, or certification/partner
badges exist anywhere in the copy (`src/lib/content.ts`) — this was a hard
constraint from the original brief and should stay that way.

---

## 9. Verification already done (production build, not dev mode)

- `npm run build` completes clean, no type errors.
- Zero console errors/warnings observed.
- Zero horizontal overflow at 375px and 1440px viewport widths.
- All 10 page sections present and render their content (verified partly by
  screenshot, partly by DOM geometry/computed-style inspection — see caveat
  below).
- No dead `href="#..."` anchors.
- Custom 404 page returns real HTTP 404.
- Contact form: per-field validation fires correctly, focus moves to the
  first invalid field on submit, valid submissions round-trip through
  `/api/contact` successfully.
- Mobile menu: locks body scroll while open, traps Tab focus, closes on Esc,
  returns focus to the toggle button on close.

**Caveat on visual verification:** the in-app Browser pane used for testing
repeatedly failed to paint below-the-fold content reliably (returned solid
black screenshots on some scroll positions even though the DOM/CSS was
confirmed correct via JS inspection). Sections were cross-checked with
`getBoundingClientRect()` / `getComputedStyle()` queries where screenshots
failed, but a real-browser visual pass is still worth doing before calling
this fully signed off.

---

## 10. Summary for whoever picks this up

The site itself is done and solid. The only open work is the logo swap
(section 7) and the outstanding content placeholders (section 8) — both are
things only the user can ultimately resolve (asset finishing decisions, real
contact details). Nothing about the core site (sections, motion system,
accessibility, performance) is mid-flight or broken.
