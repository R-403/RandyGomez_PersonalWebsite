// Menu sound effects. Real recorded clips, swapped in for the earlier
// synthesized placeholders — nothing here is generated anymore.

import hoverUrl from './audio/hover.wav';   // moving between menu items
import selectUrl from './audio/select.wav'; // activating an item
import backUrl from './audio/back.wav';     // leaving a page

const STORAGE_KEY = 'p4-sfx-enabled';

export function isSfxEnabled() {
  if (typeof window === 'undefined') return true;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === null ? true : saved === '1';
}

export function setSfxEnabled(on) {
  window.localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
}

// A fresh Audio() per call, rather than one shared/reused element, so a rapid
// run of hovers plays each clip in full instead of cutting the last one off.
function play(url) {
  if (!isSfxEnabled()) return;
  try {
    const audio = new Audio(url);
    // Browsers block audio before the very first click/keydown on the page;
    // that rejected promise is expected and safe to ignore.
    audio.play().catch(() => {});
  } catch {
    // no Audio support — fail silently, this is a nice-to-have
  }
}

export function playHoverSound() {
  play(hoverUrl);
}

export function playSelectSound() {
  play(selectUrl);
}

export function playBackSound() {
  play(backUrl);
}
