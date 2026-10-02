import P4Page from './P4Page';
import { PROJECTS } from './projects.js';

export default function SideProjects({ onBack }) {
  return (
    <P4Page title="Projects" onBack={onBack}>
      <ul className="p4-projects">
        {PROJECTS.map((p) => (
          <li key={p.name} className={`p4-proj${p.locked ? ' p4-proj--locked' : ''}`}>
            <h2 className="p4-proj__name">
              <span>{p.name}</span>
            </h2>
            {p.kicker && <p className="p4-proj__kicker">{p.kicker}</p>}
            <p className="p4-proj__blurb">{p.blurb}</p>

            {p.tags?.length > 0 && (
              <ul className="p4-chips">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}

            {p.links?.length > 0 && (
              <p className="p4-links">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </p>
            )}
          </li>
        ))}
      </ul>
    </P4Page>
  );
}
