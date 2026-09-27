// The cards on the Side Projects page. Add, remove or reorder them here.
//   name, kicker (one-line label), blurb, tags: ['...'], links: [{ label, href }]
//   locked: true draws a greyed-out "???" card, like a locked slot in the game. Delete it when you don't need it.

export const PROJECTS = [
    {
      name: 'PMKS+',
      kicker: 'Planar mechanism kinematics simulator',
      blurb:
        "A web-based simulator for planar mechanisms, used in the engineering classroom. As an undergraduate researcher in WPI's EREE program (June–July 2025) I built new features and interface updates, and worked on simulation accuracy and visualization.",
      tags: ['Angular', 'TypeScript', 'Research'],
      links: [
        { label: 'Code', href: 'https://github.com/PMKS-Web/PMKS-Refactor' },
        { label: 'My commits', href: 'https://github.com/PMKS-Web/PMKS-Refactor/commits?author=R-403' },
      ],
    },
    {
      name: 'This portfolio',
      kicker: 'A Persona 4 style menu',
      blurb:
        "The site you're on. The artwork, the font and the tilted staircase of labels are matched to Persona 4's menu, built as a React component.",
      tags: ['React', 'Vite', 'CSS'],
      links: [], // add the repo link here, e.g. { label: 'Code', href: 'https://github.com/R-403/...' }
    },
    {
      name: '???',
      blurb: 'The next project unlocks soon.',
      locked: true,
    },
  ];