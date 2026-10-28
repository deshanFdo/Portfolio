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

## Design reference for future iterations

Deshan requested [Canvas UI](https://canvasui.dev/components) as a preferred resource for creative components and their provided prompts. Consult the relevant component page and its implementation guidance when a Canvas UI effect suits a future portfolio change. The repository already includes a Canvas UI FlameWrap implementation in `src/components/canvasui/FlameWrap.tsx`.

Keep the robot and use effects selectively, with attention to mobile performance, readable content, keyboard access, and reduced-motion preferences. This is a reference preference, not a request to add every effect. Potential directions to explore include Peel for project reveals and a subtle text-reveal effect.
