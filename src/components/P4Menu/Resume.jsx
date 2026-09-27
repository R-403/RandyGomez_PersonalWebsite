import P4Page from './P4Page';

// The actual resume file lives in /public, so it's served as-is at this path.
const RESUME_PDF = '/resume.pdf';

export default function Resume({ onBack }) {
  return (
    <P4Page title="Resume" onBack={onBack}>
      <p className="p4-links">
        <a href={RESUME_PDF} target="_blank" rel="noopener noreferrer">
          Open in new tab <span aria-hidden="true">↗</span>
        </a>
        <a href={RESUME_PDF} download="Randy_Gomez_Resume.pdf">
          Download PDF <span aria-hidden="true">↓</span>
        </a>
      </p>

      <div className="p4-resume">
        <iframe
          className="p4-resume__frame"
          src={RESUME_PDF}
          title="Randy Gomez — Resume"
        >
          {/* Some mobile browsers won't render a PDF inline at all. */}
          <p className="p4-lead">
            Your browser can't preview the PDF here. Use the "Open in new tab" link above instead.
          </p>
        </iframe>
      </div>
    </P4Page>
  );
}
