// Typed custom event so any component can open the command palette
// without synthesizing keyboard events.
export const OPEN_PALETTE_EVENT = "portfolio:open-palette";

export function openPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT));
}
