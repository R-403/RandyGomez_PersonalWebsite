import P4Page from './P4Page';

// Everything on this page comes from your résumé. Edit freely.
const FACTS = [
  ['School', 'Worcester Polytechnic Institute — B.S. in Computer Science, expected May 2028'],
  ['Research', 'EREE Program, June–July 2025: new features and interface updates for PMKS+, in Angular and TypeScript'],
  ['Work', 'Mailroom Assistant at WPI, since August 2024'],
  ['Languages', 'Spanish (native), English (native), Japanese (intermediate)'],
];
const STRENGTHS = ['Strong communication', 'Attention to detail', 'Problem-solving', 'Leadership'];
const TECH = ['JavaScript', 'TypeScript', 'Angular', 'HTML & CSS', 'Java', 'C', 'C++', 'SQL', 'R', 'Functional programming'];
const TOOLS = ['VS Code', 'GitHub', 'IntelliJ', 'DrRacket', 'Oracle', 'WireShark', 'MATLAB', 'RStudio'];
// href = opens outside the app. to = an internal route (handled by onNavigate below).
const LINKS = [
  { label: 'Email', href: 'mailto:rgomezvj@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rjgomezv' },
  { label: 'GitHub', href: 'https://github.com/R-403' },
  { label: 'Résumé', to: '/resume' },
];

export default function AboutMe({ onBack, onNavigate }) {
  return (
    <P4Page title="About Me" onBack={onBack}>
      <p className="p4-lead">
        Computer science student at Worcester Polytechnic Institute, focused on making simulation tools easier to use.
        Most recently I improved PMKS+, a planar mechanism kinematics simulator, for the engineering classroom. I'm
        also part of PASS-CS, an NSF S-STEM grant program.
      </p>

      {/* the links come first so they are never below the fold */}
      <p className="p4-links">
        {LINKS.map((l) => {
          const external = Boolean(l.href);
          return (
            <a
              key={l.label}
              href={external ? l.href : l.to}
              target={external && !l.href.startsWith('mailto:') ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              onClick={
                external
                  ? undefined
                  : (e) => {
                      // Let ctrl/cmd/shift-click, middle-click, etc. behave like a normal link.
                      if (!onNavigate || e.defaultPrevented || e.button !== 0) return;
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                      e.preventDefault();
                      onNavigate(l.to);
                    }
              }
            >
              {l.label} <span aria-hidden="true">{external ? '↗' : '→'}</span>
            </a>
          );
        })}
      </p>

      <dl className="p4-facts">
        {FACTS.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>

      <h2 className="p4-sub">Strengths</h2>
      <ul className="p4-chips p4-chips--light">
        {STRENGTHS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <h2 className="p4-sub">Tech</h2>
      <ul className="p4-chips">
        {TECH.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>

      <h2 className="p4-sub">Tools</h2>
      <ul className="p4-chips">
        {TOOLS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </P4Page>
  );
}