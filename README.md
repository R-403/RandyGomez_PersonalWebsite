# Randy Gomez — Portfolio

A React + Vite portfolio styled after Persona 4's menu screen.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build, output in dist/
npm run preview  # preview the production build
```

## Where to edit things

- **Menu items** (labels, links, position on the screen) — `src/components/P4Menu/items.js`
- **About Me page** (facts, strengths, tech, tools, contact links) — `src/components/P4Menu/AboutMe.jsx`
- **Side Projects page** (project cards) — `src/components/P4Menu/projects.js`
- **Background artwork** — replace `src/components/P4Menu/persona4.jpg`
- **Menu blips / back sound** — real clips in `src/components/P4Menu/audio/` (`hover.wav`, `select.wav`,
  `back.wav`), played by `src/components/P4Menu/sfx.js`. Turn them off from the "SFX" pill in the corner
  of any screen. To swap a sound, just replace the matching `.wav` file — the filenames are what `sfx.js`
  imports.


## Structure

```
index.html
src/
  main.jsx          entry point, loads the Gelasio font once for the whole app
  App.jsx           routes: "/" (menu), "/about", "/projects"
  index.css
  components/P4Menu/
    P4Menu.jsx / .css   the menu screen
    P4Page.jsx / .css   shared sub-page frame (title card, scroll area, back button)
    AboutMe.jsx         content for /about
    SideProjects.jsx    content for /projects
    items.js            menu item data
    projects.js         project card data
    persona4.jpg         background artwork
```
