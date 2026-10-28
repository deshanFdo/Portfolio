# Two portfolio directions

- `/Portfolio/` — the original dark portfolio, with a short intro and the robot.
- `/Portfolio/studio` — the new Studio design, reached through **New portfolio** in the original navbar. **Classic portfolio** returns to the original.

Studio uses an ivory/electric-blue palette, editorial typography, CSS project illustrations, filters, expandable project notes, a light/dark toggle, email copy, and an optional interactive robot. The project illustrations are concepts rather than product screenshots. Both versions use the existing CV and contact details.

The classic intro lasts approximately 2.25 seconds, including its fade. **Skip intro** or Escape dismisses it. It is skipped for visitors who request reduced motion. The portfolio content remains in the exported HTML.

## Local development

Use Node.js 22 or later, then run `npm ci` and `npm run dev` from this folder. Open `http://localhost:3000/Portfolio/studio`. `npm run build` generates both versions in `out/` for the existing GitHub Pages deployment workflow.

The Spline robot needs an internet connection and WebGL. It has a retry state if loading fails. **Pause robot** unloads it; **Wake robot** loads it again. The rest of the page works independently.

## Review status

Production compilation, TypeScript validation, static export and exported-link checks passed. Three pre-existing unused-variable lint warnings remain in unrelated classic components. Browser visual and interaction testing was unavailable in the authoring environment. Check desktop and phone layouts, the robot, project filters, intro skip, and navigation before treating the design as visually approved.
