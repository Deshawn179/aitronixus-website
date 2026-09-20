"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { useIntro } from "./IntroContext";
import { IntelligenceNode } from "@/components/brand/Wordmark";

/* --------------------------------------------------------------------------
   Film timing.
   The supplied clip runs 9.97s: the craft holds and descends, cross-dissolves
   into the processor at ~5.4s, and the AI die resolves through to the end.
   The identity is revealed against that dissolve, not before it.
   -------------------------------------------------------------------------- */
const T = {
  /** Restrained flight-deck interface only. */
  transitionStart: 5.3,
  /** The craft has become the processor — the brand arrives. */
  identity: 6.35,
  /** Chrome and calls to action stagger in. */
  chrome: 7.4,
  /** Begin dissolving the film into the hero environment. */
  dissolve: 9.15,
} as const;

const FILM_SRC = "/media/alien-spacecraft-ai-website-intro.mp4";
const POSTER_SRC = "/media/intro-poster.svg";
const STORAGE_KEY = "aitronixus.intro.seen.v1";

type Phase = "boot" | "flight" | "transition" | "identity" | "chrome" | "dissolve" | "done";
type Mode = "pending" | "film" | "abbreviated" | "static";

/**
 * Everything in the overlay is driven by timers and CSS transitions rather
 * than by the animation library. This screen gates the entire page, so its
 * removal must not depend on an animation callback ever firing.
 */

/** Connections too slow for a 9MB film, or a user who has asked to save data. */
function isConstrained(): boolean {
  if (typeof navigator === "undefined") return false;
  const c = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!c) return false;
  if (c.saveData) return true;
  return c.effectiveType === "slow-2g" || c.effectiveType === "2g" || c.effectiveType === "3g";
}

export function CinematicIntro() {
  const { replayToken } = useIntro();
  const reduced = useReducedMotion();

  const [mode, setMode] = useState<Mode>("pending");
  const [phase, setPhase] = useState<Phase>("boot");
  const [progress, setProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const timers = useRef<number[]>([]);
  const finished = useRef(false);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  /* ---------------------------------------------------------------- finish */
  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    clearTimers();
    setPhase("dissolve");

    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* Private mode or blocked storage — the film simply plays again. */
    }

    const el = videoRef.current;
    if (el) {
      el.pause();
      /* Release decoder + network immediately; the poster covers the frame. */
      el.removeAttribute("src");
      el.load();
    }

    window.setTimeout(
      () => {
        setPhase("done");
        document.documentElement.dataset.intro = "done";
        document.body.removeAttribute("data-intro-locked");
      },
      reduced ? 80 : 1150,
    );
  }, [reduced]);

  /* ------------------------------------------------------------- decide mode
     Runs before paint so returning visitors never see a full-length film they
     have already sat through. */
  useLayoutEffect(() => {
    finished.current = false;
    clearTimers();
    setProgress(0);

    const replaying = replayToken > 0;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    /* Someone who followed a link to a specific section asked for that
       section, not for a title sequence. */
    const deepLink = Boolean(window.location.hash);

    /* An explicit replay always earns the full film, whatever came before. */
    const next: Mode = replaying
      ? reduced
        ? "static"
        : "film"
      : reduced || deepLink || isConstrained()
        ? "static"
        : seen
          ? "abbreviated"
          : "film";

    setMode(next);
    setPhase("boot");

    if (next === "static") {
      document.documentElement.dataset.intro = "done";
      document.body.removeAttribute("data-intro-locked");
      finished.current = true;
      setPhase("done");
      return;
    }

    document.documentElement.dataset.intro = "running";
    document.body.setAttribute("data-intro-locked", "true");

    /* The film opens on the top of the page — but never at the cost of a deep
       link. Someone arriving at /#solutions asked for that section. */
    if (!window.location.hash) window.scrollTo(0, 0);

    return clearTimers;
  }, [replayToken, reduced]);

  /* --------------------------------------------------- abbreviated sequence
     Returning visitors get the identity card and a quick wipe — about 1.6s,
     enough to feel deliberate, short enough not to be a toll gate. */
  useEffect(() => {
    if (mode !== "abbreviated") return;
    setPhase("identity");
    const t1 = window.setTimeout(() => setPhase("chrome"), 520);
    const t2 = window.setTimeout(() => finish(), 1450);
    timers.current.push(t1, t2);
    return clearTimers;
  }, [mode, finish]);

  /* ------------------------------------------------------------ film driving */
  useEffect(() => {
    if (mode !== "film") return;
    const el = videoRef.current;
    if (!el) return;

    let cancelled = false;

    const onTime = () => {
      const t = el.currentTime;
      const d = el.duration || 9.97;
      setProgress(Math.min(1, t / d));

      if (t >= T.dissolve) finish();
      else if (t >= T.chrome) setPhase("chrome");
      else if (t >= T.identity) setPhase("identity");
      else if (t >= T.transitionStart) setPhase("transition");
      else setPhase("flight");
    };

    /* If the film cannot play — blocked autoplay, codec, network — we do not
       strand the visitor behind a black screen. */
    const bail = () => {
      if (cancelled) return;
      setMode("static");
      document.documentElement.dataset.intro = "done";
      document.body.removeAttribute("data-intro-locked");
      finished.current = true;
      setPhase("done");
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", finish);
    el.addEventListener("error", bail);

    const start = () => {
      const p = el.play();
      if (p && typeof p.catch === "function") p.catch(bail);
    };

    if (el.readyState >= 2) start();
    else el.addEventListener("loadeddata", start, { once: true });

    /* Hard ceiling: if nothing has progressed after 4s, fall through. */
    const watchdog = window.setTimeout(() => {
      if (!cancelled && el.currentTime < 0.1) bail();
    }, 4000);
    timers.current.push(watchdog);

    return () => {
      cancelled = true;
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", finish);
      el.removeEventListener("error", bail);
      el.removeEventListener("loadeddata", start);
      clearTimers();
    };
  }, [mode, finish, replayToken]);

  /* Escape always skips. */
  useEffect(() => {
    if (phase === "done") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase, finish]);

  /* Safety net: never leave the page locked if this unmounts mid-sequence. */
  useEffect(
    () => () => {
      document.body.removeAttribute("data-intro-locked");
      document.documentElement.dataset.intro = "done";
    },
    [],
  );

  /* The overlay is server-rendered in its "boot" state — a plain sheet of
     --color-void, identical to the page background, so there is no flash
     either way. The mode is resolved in a layout effect before the next
     paint: static visitors lose it immediately, everyone else sees the film. */
  const visible = mode !== "static" && phase !== "done";

  if (!visible) return null;

  return (
    <div
      className="intro"
      data-phase={phase}
      data-mode={mode}
      role="dialog"
      aria-modal="true"
      aria-label="AiTroniXus cinematic introduction"
    >
      {/* ------------------------------------------------------------- film */}
      {mode === "film" && (
        <div className="intro__stage">
          <video
            ref={videoRef}
            className="intro__video"
            src={FILM_SRC}
            poster={POSTER_SRC}
            autoPlay
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
          />
          {/* Grades the footage into the site palette and hands the final
              frame off to the hero's dark environment. */}
          <div className="intro__grade" aria-hidden="true" />
          {/* Once the identity arrives the film has done its work; it steps
              back so the brand carries the frame. */}
          <div className="intro__dim" aria-hidden="true" />
          <div className="intro__vignette" aria-hidden="true" />
          <div className="grain" aria-hidden="true" />
        </div>
      )}

      {/* The abbreviated pass never fetches the film at all. */}
      {mode === "abbreviated" && (
        <div className="intro__stage intro__stage--still" aria-hidden="true" />
      )}

      {/* --------------------------------------- restrained flight-deck HUD */}
      {mode === "film" && (
        <div className="intro__hud" aria-hidden="true">
          <span className="intro__hud-tick intro__hud-tick--tl" />
          <span className="intro__hud-tick intro__hud-tick--tr" />
          <span className="intro__hud-tick intro__hud-tick--bl" />
          <span className="intro__hud-tick intro__hud-tick--br" />
          <p className="intro__hud-line">
            <span className="status-dot anim-status" /> Signal acquired
          </p>
        </div>
      )}

      {/* ---------------------------------------------------------- identity */}
      <div className="intro__content">
        <div className="intro__identity">
          <span className="intro__mark">
            <IntelligenceNode size={30} />
          </span>
          <h1 className="intro__wordmark">
            <span className="sr-only-brand">AiTroniXus</span>
            <span aria-hidden="true">
              <span className="intro__wm-ai">Ai</span>
              <span className="intro__wm-troni">Troni</span>
              <span className="intro__wm-x">X</span>
              <span className="intro__wm-us">us</span>
            </span>
          </h1>
          <p className="intro__tagline eyebrow">Enter the Intelligence Layer</p>
          <span className="intro__rule" aria-hidden="true" />
        </div>

        <p className="intro__sub">Intelligence, engineered into the foundation.</p>
      </div>

      {/* ---------------------------------------------------------- controls */}
      <div className="intro__controls" hidden={mode === "pending"}>
        <button type="button" className="intro__skip" onClick={finish}>
          Skip intro
          <span className="intro__skip-key" aria-hidden="true">
            ESC
          </span>
        </button>
        {mode === "film" && (
          <div
            className="intro__progress"
            role="progressbar"
            aria-label="Introduction progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        )}
      </div>
    </div>
  );
}
