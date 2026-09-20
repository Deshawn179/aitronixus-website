"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type IntroState = {
  /**
   * Increments each time a replay is requested. The intro overlay keys off
   * this value, so re-running the film is a remount rather than a pile of
   * imperative resets.
   */
  replayToken: number;
  requestReplay: () => void;
};

const IntroCtx = createContext<IntroState | null>(null);

/**
 * Visibility of the chrome during the intro is driven by a data attribute on
 * <html> (written by the overlay, read by CSS) rather than by React state.
 * That keeps the server and first client paint identical — no hydration
 * mismatch, and pages without an intro (404) are unaffected.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [replayToken, setReplayToken] = useState(0);

  const requestReplay = useCallback(() => {
    setReplayToken((t) => t + 1);
  }, []);

  const value = useMemo(() => ({ replayToken, requestReplay }), [replayToken, requestReplay]);

  return <IntroCtx.Provider value={value}>{children}</IntroCtx.Provider>;
}

export function useIntro(): IntroState {
  const ctx = useContext(IntroCtx);
  if (!ctx) throw new Error("useIntro must be used inside <IntroProvider>");
  return ctx;
}
