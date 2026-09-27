import { useCallback, useEffect, useRef, useState } from 'react';
import './P4Menu.css'; // the .p4 frame and stage, so the artwork sits exactly where it does on the menu
import './P4Page.css';
import defaultArt from './persona4.jpg';
import { playBackSound } from './sfx.js';

/**
 * Shared frame for the sub-pages (About Me, Side Projects, ...): the same artwork as the menu,
 * with a dark slanted panel on top.
 *
 * @param {string}   title      heading on the white card. Also used for the browser tab title.
 * @param {function} [onBack]   called by the Back button, Esc and Backspace. Defaults to going to "/".
 * @param {string}   [siteName] appended to the tab title
 * @param {string}   [art]      background image URL (defaults to ./persona4.jpg)
 */
export default function P4Page({ title, children, onBack, siteName = 'Randy Gomez', art = defaultArt }) {
  const panelRef = useRef(null);
  const scrollRef = useRef(null);
  const innerRef = useRef(null);
  const [more, setMore] = useState(false); // is there more content below the fold?

  const goBack = useCallback(() => {
    playBackSound();
    if (onBack) onBack();
    else window.location.assign('/');
  }, [onBack]);

  useEffect(() => {
    const previous = document.title;
    document.title = `${title} — ${siteName}`;
    return () => {
      document.title = previous;
    };
  }, [title, siteName]);

  // Esc and Backspace go back, like the game's B button. Leave them alone while typing.
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t?.tagName ?? '')) return;
      if (e.key === 'Escape' || e.key === 'Backspace') {
        e.preventDefault();
        goBack();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [goBack]);

  // Fade the bottom edge while there is more to scroll to, so the panel never looks cut off.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return undefined;
    const check = () => setMore(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
    check();
    el.addEventListener('scroll', check, { passive: true });
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (innerRef.current) ro.observe(innerRef.current);
    return () => {
      el.removeEventListener('scroll', check);
      ro.disconnect();
    };
  }, []);

  // Land in the content, for keyboard and screen-reader users.
  useEffect(() => {
    panelRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="p4 p4--full p4--page" style={{ '--p4-art': `url("${art}")` }}>
      <div className="p4-stage" aria-hidden="true" />

      <main className="p4-panel" ref={panelRef} tabIndex={-1} aria-labelledby="p4-page-title">
        <div className="p4-panel__shape">
          <div className="p4-titlebar">
            <h1 id="p4-page-title" className="p4-title">
              <span>{title}</span>
            </h1>
          </div>

          <div className={`p4-scroll${more ? ' has-more' : ''}`} ref={scrollRef}>
            <div ref={innerRef}>{children}</div>
          </div>

          <footer className="p4-foot">
            <button type="button" className="p4-back" onClick={goBack}>
              <span>Back</span>
              <kbd>Esc</kbd>
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}