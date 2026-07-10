import type Lenis from "lenis";

/**
 * Module-level handle to the active Lenis instance so any component can
 * trigger a smooth programmatic scroll without prop-drilling.
 */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Smooth-scrolls to a hash target, falling back to native scrolling. */
export function scrollToHash(hash: string) {
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (lenis) {
    lenis.scrollTo(target, { offset: -72 });
  } else {
    // Reduced-motion users get an instant jump, not an animation.
    target.scrollIntoView({ behavior: "auto" });
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "auto" });
}
