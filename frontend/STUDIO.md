# Two portfolio directions

- `/Portfolio/` — the Mercedes-inspired original portfolio, with its intro and robot.
- `/Portfolio/studio` — the F1-inspired redesign, reached through **New portfolio** in the original navbar. **Classic** returns to the original.

## The Next Lap

Studio uses carbon black, racing red, condensed italic typography, circuit-line motion, numbered sections, and checkered details. Barlow Condensed is bundled through `next/font`; body text retains Geist. The robot remains the same Spline scene, presented as an interactive garage.

The page focuses on selected work, background, and contact. API Portal and LawLinkLK have prominent project panels and native expandable implementation notes. Card Swap remains as a compact experiment link. The large process section, request-flow demo, redundant project filters, and alternate light theme were removed to shorten the page and keep the racing identity consistent. Project illustrations are explicitly labeled concepts rather than product screenshots.

## Starting-grid intro and motion

The Studio intro appears on route entry and refresh. Five pairs of starting lights illuminate, then go out; the overlay exits after approximately 2.12 seconds. It is a short branded introduction, not a fabricated asset-loading percentage. **Skip intro** and Escape close it immediately. **Replay intro** in the footer opens it again.

The intro uses a native modal dialog for keyboard focus containment and restoration. It locks background scrolling, restores it on cleanup, and clears all timers on exit. The exported dialog is closed, so the content remains available without JavaScript. Reduced-motion preferences skip the intro and disable its replay button; changing that preference during the intro dismisses it. The robot begins loading after the intro, independently of the page content.

**Motion on / Motion off** controls decorative effects. Scroll reveals run once; circuit traces pause outside the viewport or while the document is hidden. **Pause / Wake** separately controls the robot. Reduced-motion visitors can explicitly wake the robot if wanted. No new JavaScript dependencies were added.

## Local development

Use Node.js 22 or later, then run `npm ci` and `npm run dev` from this folder. Open `http://localhost:3000/Portfolio/studio`. `npm run build` generates both versions in `out/` for the existing GitHub Pages workflow.

The Spline robot requires an internet connection and WebGL. It has a retry state if loading fails. The rest of the page works independently.

## Verification

Production compilation, TypeScript validation, and static export passed. Three existing unused-variable lint warnings remain in unrelated classic components. Browser checks covered desktop and 390px/320px layouts, robot loading, the five-light intro, automatic dismissal, Skip, Escape, replay, keyboard focus restoration, motion control, and expandable project notes. No overflowing headings or controls were found at those phone widths. The operating system's reduced-motion preference was not changed during browser QA; its handling was checked in source. The classic page was retained and its version-switch link checked in the export.

## Design reference

Deshan requested [Canvas UI](https://canvasui.dev/components) as a preferred resource for creative components and their provided prompts. Consult relevant component guidance when an effect suits a future change. The original portfolio already includes its FlameWrap implementation in `src/components/canvasui/FlameWrap.tsx`.

Keep the robot and use effects selectively, with attention to mobile performance, readable content, keyboard access, and reduced-motion preferences. For this version, lightweight CSS and SVG motion provide the racing details.

## Mercedes-inspired original portfolio

The original `/Portfolio/` route has its own scoped silver, carbon black, and turquoise theme. A three-pointed star, condensed silver nameplate, starting-grid intro, technical dividers, and paddock-style project panels establish the F1 identity. This is Deshan’s personal fan-inspired portfolio, not an official team website. Studio remains its separate racing-red design.

The original keeps the Spline robot, CV, project/source links, contact draft flow, and employment/education content. The navbar still links to New portfolio. The toolkit replaces self-rated percentage meters; the profile replaces coffee/learning counters with relevant background. Project implementation details use native expandable panels. Particle fields, space backgrounds, and flame shaders are no longer mounted on the original page.

The new original intro uses a native modal dialog, closes automatically in about 2.12 seconds, and supports Skip, Escape, and footer Replay. Reduced-motion preferences skip it. The robot loads separately after the intro, can be paused/woken, and defaults to standby for reduced-motion visitors. Colors and Barlow Condensed font are scoped to the original route.
