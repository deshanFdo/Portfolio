# Two portfolio directions

- `/Portfolio/` — the original dark portfolio, with a short intro and the robot.
- `/Portfolio/studio` — the new Studio design, reached through **New portfolio** in the original navbar. **Classic portfolio** returns to the original.

Studio uses an ivory/electric-blue palette, editorial typography, CSS project illustrations, filters, expandable project notes, a light/dark toggle, email copy, and an optional interactive robot. The project illustrations are concepts rather than product screenshots. Both versions use the existing CV and contact details.

## Motion and the building process

Studio now includes staggered headline and scroll reveals, a reading-progress line, orbiting robot accents, rotating toolbox marks, project-corner reveals, and animated project details. The sticky navigation keeps Work, Process, About, and Contact accessible on phones as well as desktop.

**How I build** introduces Understand, Design, Build, and Refine as four keyboard-accessible tabs with changing diagrams and notes. Arrow keys, Home, and End select a stage. **Follow the request** is an explicitly illustrative, browser-only demo of Interface → API → Data → Interface. It makes no API calls; **Send a request** plays the sequence and **Run it again** replays it.

**Motion on / Motion off** controls decorative effects. Reduced-motion system preferences are respected and keep the robot asleep initially; it can be explicitly awakened. The request demo shows its result immediately when motion is disabled. Scroll reveals run once, decorative loops pause offscreen or in a hidden tab, and observers/listeners/timers are cleaned up. All page content is visible in the exported HTML before animation enhancement. No new dependencies were added.

The classic intro lasts approximately 2.25 seconds, including its fade. **Skip intro** or Escape dismisses it. It is skipped for visitors who request reduced motion. The portfolio content remains in the exported HTML.

## Local development

Use Node.js 22 or later, then run `npm ci` and `npm run dev` from this folder. Open `http://localhost:3000/Portfolio/studio`. `npm run build` generates both versions in `out/` for the existing GitHub Pages deployment workflow.

The Spline robot needs an internet connection and WebGL. It has a retry state if loading fails. **Pause robot** unloads it; **Wake robot** loads it again. The rest of the page works independently.

## Review status

Production compilation, TypeScript validation, and static export passed. Three pre-existing unused-variable lint warnings remain in unrelated classic components. Browser checks covered the Studio layout at 1440px, 390px, and 320px, the loaded robot, keyboard process-tab selection, request playback/replay, instant results with motion off, project filtering/details, and dark theme. Narrow-screen checks found no overflowing headings, navigation, controls, or process panel. The motion-off control was tested; the operating system preference was not changed during QA. Classic intro behavior was not retested in this iteration.

## Design reference for future iterations

Deshan requested [Canvas UI](https://canvasui.dev/components) as a preferred resource for creative components and their provided prompts. Consult the relevant component page and its implementation guidance when a Canvas UI effect suits a future portfolio change. The repository already includes a Canvas UI FlameWrap implementation in `src/components/canvasui/FlameWrap.tsx`.

Keep the robot and use effects selectively, with attention to mobile performance, readable content, keyboard access, and reduced-motion preferences. This is a reference preference, not a request to add every effect. Potential directions to explore include Peel for project reveals and a subtle text-reveal effect.
