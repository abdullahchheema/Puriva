"use client";
import { useSyncExternalStore } from "react";

declare global {
  interface Window {
    __purivaReady?: boolean;
  }
}

export function markIntroReady() {
  window.__purivaReady = true;
  window.dispatchEvent(new Event("puriva:ready"));
}

const subscribe = (cb: () => void) => {
  window.addEventListener("puriva:ready", cb);
  return () => window.removeEventListener("puriva:ready", cb);
};

/** True once the intro loader has left the screen. Hero reveals wait on it. */
export function useIntroReady() {
  return useSyncExternalStore(
    subscribe,
    () => !!window.__purivaReady,
    () => false,
  );
}
