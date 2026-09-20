# AiTroniXus

**Redefining the Future of Intelligent Infrastructure.**

A cinematic, single-page enterprise experience built around one idea: *Enter the
Intelligence Layer*. The visitor moves from space, through the machine, into the
intelligence core, and out into infrastructure and transformation.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build && npm start
```

Node 20+ is required (developed against Node 24). Fonts are fetched and
self-hosted at build time by `next/font`, so the first build needs network
access; after that the build is offline-clean.

---

## Configuration

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `AITRONIXUS_CONTACT_WEBHOOK` | Where contact submissions are POSTed as JSON. Any endpoint that accepts a JSON body works — a CRM webhook, a Power Automate flow, a Logic App, a transactional-mail proxy. **Unset:** submissions are validated and logged to the server console, and the form tells the visitor delivery is not configured yet. |
| `AITRONIXUS_CONTACT_INBOX` | Optional. Recorded in the server log line as the intended destination. |
| `NEXT_PUBLIC_SITE_URL` | Absolute origin for canonical and Open Graph URLs. Defaults to `https://www.aitronixus.com`. |

---

## Still to be supplied

Nothing in this build invents a fact about the business. These are marked in the
UI as dashed placeholder chips and should be replaced before launch:

- **Email address** — footer contact column
- **Telephone number** — footer contact column
- **Registered address** — footer contact column
- **Social profiles** — footer contact column
- **Privacy policy** and **Legal notice** — footer base; currently marked pending
- **Contact delivery endpoint** — `AITRONIXUS_CONTACT_WEBHOOK`
- **Production domain** — `NEXT_PUBLIC_SITE_URL`

Deliberately absent, and worth keeping absent unless there is evidence: client
names, testimonials, performance percentages, headcount, awards, partner or
certification badges. The technology ecosystem section carries an explicit
disclaimer that it lists areas of practice, not partnerships.

Optional swap-ins that need no restructuring:

- **Logo** — replace `src/components/brand/Wordmark.tsx`. It is a self-contained
  typographic treatment plus an inline SVG mark; nothing else references its
  internals.
- **Social card** — `src/app/opengraph-image.tsx` generates the 1200×630 card
  from the same tokens as the site. Replace with artwork if preferred.

---

## Structure

```
src/
  app/
    layout.tsx              Fonts, metadata, Organization JSON-LD, chrome
    page.tsx                Section composition
    not-found.tsx           Custom 404 ("This node is not on the map")
    globals.css             Design tokens, base, type, atmosphere, controls
    chrome.css              Navigation, mobile panel, footer, cursor, progress
    intro.css               Cinematic entry
    sections.css            Every section's layout
    icon.svg                Favicon
    opengraph-image.tsx     Generated social card
    robots.ts / sitemap.ts  SEO surface
    api/contact/route.ts    Validated, configurable contact endpoint

  components/
    brand/Wordmark.tsx          Ai · TroniX · us treatment + intelligence node
    intro/CinematicIntro.tsx    The film, synchronised to its own transition
    intro/IntroContext.tsx      Replay plumbing
    hero/Hero.tsx               Editorial hero
    hero/InfrastructureViz.tsx  Authored topology (core, three orbital tiers)
    site/SiteChrome.tsx         Skip link, progress, cursor, nav, footer
    site/SiteNav.tsx            Sticky nav + mobile panel
    site/SiteFooter.tsx         Footer with placeholder chips
    site/SystemStatus.tsx       Animated system-status detail
    sections/                   The nine content sections
    fx/                         Reveal, Magnetic, Ambient, MotionGuard,
                                useInViewSafe

  lib/content.ts            All copy, in one place
public/media/               Intro film + fallback poster
```

### Sections

1. **Cinematic entry + hero** — the film dissolves into the hero's environment
2. **The intelligence layer** — the seven-layer stack as a keyboard-navigable tablist
3. **Core capabilities** — an engineering register with a sticky diagram, not a card grid
4. **The operating model** — six states on a closed ring
5. **Think / Learn / Evolve** — scroll-selected principles
6. **Technology ecosystem** — decorative marquee over a readable definition grid
7. **Business outcomes** — a before/after matrix (a real table, restyled)
8. **Solution scenarios** — six representative scenarios, explicitly not case studies
9. **Vision manifesto** — one statement, word-by-word
10. **Conversion** — validated contact form

---

## The cinematic entry

The supplied film (`public/media/alien-spacecraft-ai-website-intro.mp4`, 9.97s)
cross-dissolves from the craft into the AI processor at about 5.4s. The overlay
reads the video's own `currentTime` and drives five phases from it:

| Time | Phase | What happens |
| --- | --- | --- |
| 0 – 5.3s | `flight` | Film only, plus four corner ticks and one status line |
| 5.3 – 6.35s | `transition` | The dissolve; interface recedes |
| 6.35s | `identity` | The wordmark resolves as the die resolves |
| 7.4s | `chrome` | Supporting line, staggered |
| 9.15s | `dissolve` | Film scales forward and fades into the hero |

The identity sits in the **lower third** rather than centre: the film's own
subject owns the middle of the frame, and the frame is bright and busy exactly
where a centred wordmark would land. As the identity arrives the film dims to
55%, so the brand carries the frame instead of competing with it.

**Behaviour**

- Autoplays muted and inline; `object-fit: cover` preserves the 16:9 composition
- Skip button, always present, plus <kbd>Esc</kbd>
- Completion is stored in `sessionStorage`; returning visitors in the same
  session get a ~1.5s identity card, and the film is never fetched
- Following a link with a hash (`/#solutions`) skips the intro entirely
- `prefers-reduced-motion`, `saveData` and 2G/3G connections skip to the hero
- If playback fails — blocked autoplay, codec, network — a 4s watchdog falls
  through to the hero rather than stranding anyone on a black screen
- "Watch the AiTroniXus Experience" in the hero replays the full film

---

## Design system

Tokens live in `globals.css` — one vocabulary shared by Tailwind utilities and
hand-authored CSS.

**Colour.** Void `#030507`, carbon `#080C12`, deep navy `#071523` carry the
surfaces. Electric cyan `#50E6FF`, azure `#0078D4` and ion blue `#366BFF` are
spent sparingly: an accent line, one word in a headline, an active state, a live
node. Cool white `#F4F8FC` and muted steel `#8A99AA` do the reading.

**Type.** Sora for display (tight tracking, 0.98 line height), Inter for body,
JetBrains Mono for the small uppercase technical labels. Every size is a
`clamp()` step; the hero scale is tuned against its column width rather than the
viewport, which is why it never wraps awkwardly.

**Atmosphere.** Technical grids as background images, radial halos, one slow
scan pass, drifting particles, SVG-turbulence grain. Glass is used in exactly two
places where an element genuinely sits over moving content: the nav bar and the
skip button.

---

## Performance decisions

- **Intro is timer + CSS driven, not library driven.** The overlay gates the
  whole page, so its removal must not depend on an animation callback ever
  firing. Same for the mobile menu — it unmounts immediately rather than waiting
  on an exit animation.
- **`MotionGuard`** confirms the frame loop is alive. If it is not, the document
  is marked and CSS forces every `[data-reveal]` to its finished state. Entrance
  animations hide their element until they play; this makes "never played" a
  visible outcome rather than an invisible one.
- **`useInViewSafe`** observes with `IntersectionObserver` but falls back to
  geometry on scroll if the observer produces nothing within 1.2s. Copy is never
  left hidden behind an observer that will not report.
- **Animation is transform and opacity only.** No layout-triggering properties,
  no animated `width`/`top`/`filter` on large surfaces.
- **The film releases its decoder** the moment the intro finishes — `src`
  removed and `load()` called — instead of idling in memory.
- **The film is never fetched at all** on the abbreviated pass, under reduced
  motion, on `saveData`, or on 2G/3G.
- **Below-the-fold interactive code is split** (`Conversion` via `next/dynamic`).
  First load is ~164 kB JS.
- **No layout shift from media.** The hero visual is an inline SVG with a fixed
  `aspect-ratio`; the film is an overlay that never participates in page layout.
- **No horizontal overflow.** `overflow-x: clip` on `body` is the backstop; the
  outcome matrix and the ecosystem marquee carry their own contained axis.
- **Zero third-party requests at runtime.** Fonts are self-hosted; no analytics,
  no tracking cookies.

## Accessibility decisions

- **Semantic first.** Ten `<section>` elements, each labelled by its heading. The
  outcomes matrix is a real `<table>` with `<caption>`, `scope="col"` and
  `scope="row"` — restyled, not replaced by divs.
- **Real ARIA patterns, keyboard complete.** The intelligence stack and the
  scenario explorer are tablists with arrow keys, Home and End, and roving
  `tabindex`. The capability register is a proper disclosure pattern with
  `aria-expanded` and `aria-controls`.
- **The mobile panel** locks scroll, traps Tab, closes on <kbd>Esc</kbd>, and
  returns focus to the toggle it came from.
- **Visible focus everywhere** — a 2px cyan ring with offset, never suppressed.
  A skip link is the first tab stop.
- **Reduced motion is a branch, not a dimmer.** Each component renders its static
  form; decorative loops are removed rather than frozen mid-frame; the intro is
  skipped entirely.
- **The form** marks invalid fields with `aria-invalid`, links errors with
  `aria-describedby`, moves focus to the first field needing attention, and
  announces the result through one polite live region.
- **Decoration is hidden from assistive technology** — the ecosystem marquee is
  duplicated for its loop and marked `aria-hidden`; the readable definition list
  below it is the real content. Responsive alternates use `display: none` so
  nothing is ever announced twice.
- **Contrast.** Body copy is cool white or steel on void black; the muted steel
  is reserved for supporting text, never for the only copy that carries meaning.
