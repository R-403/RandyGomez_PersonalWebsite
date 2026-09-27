import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import './P4Menu.css';
import defaultArt from './persona4.jpg';
import { DEFAULT_ITEMS } from './items.js';
import { playHoverSound, playSelectSound } from './sfx.js';

// Oswald Bold's baseline sits this far (in em) below the top of a line box at line-height: 1.
// Labels are pinned by their baseline, so this must match --p4-base in P4Menu.css.
const BASE = 0.78;

/**
 * Shapes for the white card behind the selected label and the little blue wedge at its corner.
 * `deg` is the label's rotation and `w` its width in em. Coordinates are in em, in the card's
 * own frame, which is rotated so the card's top edge sits nearly level (about 8 degrees) while
 * the text runs steeply across it. That is what makes the highlight look like a tag the word is
 * written through, the way it does in the game.
 */
function cardShapes(deg, w) {
  const a = ((deg - 8) * Math.PI) / 180; // angle of the text baseline relative to the card
  const ta = Math.max(Math.tan(a), 0.004);
  const top = -1.05; // card's top and left edges, measured from the label's baseline-left corner
  const left = -0.42;
  const extent = w * Math.cos(a); // how far the word reaches right, in the card's frame
  const cross = (-top + 0.12) / ta; // where the baseline would climb out through the top edge
  const reach = Math.min(0.9 * extent, 0.9 * cross);
  const bottomRight = -reach * ta + 0.12; // the lower edge follows the baseline, a bit below it

  const ox = 1; // the card box starts 1em left of and 1.5em above the label box
  const oy = 1.5 + BASE;
  const pt = (x, y) => `${(ox + x).toFixed(3)}em ${(oy + y).toFixed(3)}em`;

  return {
    cardDeg: deg - 8,
    card: `polygon(${[pt(left, top), pt(reach, top), pt(reach, bottomRight), pt(left, 0.3)].join(', ')})`,
    wedge: `polygon(${[pt(left, 0.26), pt(left - 0.05, 0.62), pt(0.02, 0.32)].join(', ')})`,
  };
}

/**
 * Persona 4 style portfolio menu.
 *
 * @param {object[]} [items]      labels, destinations and positions (see items.js)
 * @param {string}   [art]        background image URL (defaults to ./persona4.jpg)
 * @param {string}   [title]      visually hidden <h1>, for screen readers
 * @param {function} [onNavigate] called with an item's `to` path, e.g. react-router's navigate
 * @param {boolean}  [fullscreen] true: cover the viewport. false: fill the parent, which then
 *                                needs a height of its own.
 */
export default function P4Menu({
  items = DEFAULT_ITEMS,
  art = defaultArt,
  title = 'Randy Gomez — Portfolio',
  onNavigate,
  fullscreen = true,
}) {
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState({ text: '', on: false });
  const [widths, setWidths] = useState([]); // each label's width in em, measured in the browser

  const linkRefs = useRef([]);
  const labelRefs = useRef([]);
  const selectedRef = useRef(0);
  const toastTimer = useRef(0);

  // The card's shape depends on how wide its label is, so measure the labels. Do it again once
  // the web font has loaded, because the fallback font is a different width.
  useLayoutEffect(() => {
    let live = true;
    const measure = () => {
      if (!live) return;
      setWidths(
        items.map((_, i) => {
          const el = labelRefs.current[i];
          return el ? el.offsetWidth / parseFloat(getComputedStyle(el).fontSize) : 0;
        }),
      );
    };
    measure();
    document.fonts?.ready.then(measure);
    return () => {
      live = false;
    };
  }, [items]);

  // Selection = which label wears the white card. Hover, focus and the arrow keys all use this.
  const select = useCallback(
    (i, focus = false) => {
      const next = (i + items.length) % items.length;
      if (next !== selectedRef.current) playHoverSound();
      selectedRef.current = next;
      setSelected(next);
      if (focus) linkRefs.current[next]?.focus({ preventScroll: true });
    },
    [items.length],
  );

  // The small "coming soon" pill.
  const say = useCallback((text) => {
    setToast({ text, on: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, on: false })), 2200);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // Keyboard: arrows / Home / End move the selection, Enter opens it.
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const cur = selectedRef.current;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        select(cur + 1, true);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        select(cur - 1, true);
      } else if (e.key === 'Home') {
        e.preventDefault();
        select(0, true);
      } else if (e.key === 'End') {
        e.preventDefault();
        select(items.length - 1, true);
      } else if (e.key === 'Enter' && document.activeElement === document.body) {
        linkRefs.current[cur]?.click();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [select, items.length]);

  return (
    <div className={`p4${fullscreen ? ' p4--full' : ''}`} style={{ '--p4-art': `url("${art}")` }}>
      <h1 className="p4-sr">{title}</h1>

      <div className="p4-stage">
        <nav aria-label="Portfolio menu">
          <ul className="p4-list">
            {items.map((it, i) => {
              const { card, wedge, cardDeg } = cardShapes(it.deg, widths[i] || it.label.length * 0.6);

              // The label's position and shape, handed to the CSS as custom properties.
              const style = {
                '--p4-i': i,
                '--p4-x': it.x,
                '--p4-y': it.y,
                '--p4-r': it.deg,
                '--p4-fs': it.size,
                '--p4-ss': it.grow ?? 1.3,
                '--p4-cr': `${cardDeg}deg`,
                '--p4-card': card,
                '--p4-wedge': wedge,
              };

              const setLinkRef = (el) => {
                linkRefs.current[i] = el;
              };
              const common = {
                className: 'p4-a',
                onMouseEnter: () => select(i, true),
                onFocus: () => select(i),
                'aria-current': i === selected ? 'true' : undefined,
              };
              const inner = (
                <>
                  <span className="p4-t" ref={(el) => (labelRefs.current[i] = el)}>
                    {it.label}
                  </span>
                  <span className="p4-wedge" aria-hidden="true" />
                  <span className="p4-card" aria-hidden="true">
                    <span className="p4-g">{it.label}</span>
                  </span>
                </>
              );

              let control;
              if (it.href) {
                control = (
                  <a
                    {...common}
                    ref={setLinkRef}
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSelectSound()}
                  >
                    {inner}
                  </a>
                );
              } else if (it.to) {
                control = (
                  <a
                    {...common}
                    ref={setLinkRef}
                    href={it.to}
                    onClick={(e) => {
                      playSelectSound();
                      // Let ctrl/cmd/shift-click, middle-click, etc. behave like a normal link.
                      if (!onNavigate || e.defaultPrevented || e.button !== 0) return;
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      onNavigate(it.to);
                    }}
                  >
                    {inner}
                  </a>
                );
              } else {
                control = (
                  <button
                    {...common}
                    ref={setLinkRef}
                    type="button"
                    onClick={() => {
                      playSelectSound();
                      say(it.soon ?? `${it.label} — coming soon`);
                    }}
                  >
                    {inner}
                  </button>
                );
              }

              return (
                <li key={it.label} className={`p4-mi${i === selected ? ' is-selected' : ''}`} style={style}>
                  {control}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={`p4-toast${toast.on ? ' on' : ''}`} role="status" aria-live="polite">
          {toast.text}
        </div>
      </div>
    </div>
  );
}