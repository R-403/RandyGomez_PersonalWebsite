import { useState } from 'react';
import { isSfxEnabled, setSfxEnabled } from './sfx.js';
import './SfxToggle.css';

/** Small persistent pill, shown on every screen, to mute the menu blips. */
export default function SfxToggle() {
  const [on, setOn] = useState(isSfxEnabled);

  return (
    <button
      type="button"
      className={`p4-sfx${on ? ' is-on' : ''}`}
      onClick={() => {
        const next = !on;
        setSfxEnabled(next);
        setOn(next);
      }}
      aria-pressed={on}
    >
      <span className="p4-sfx__dot" aria-hidden="true" />
      SFX {on ? 'ON' : 'OFF'}
    </button>
  );
}
