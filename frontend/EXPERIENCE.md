# Silverworks: the engineering paddock

The main portfolio at `/Portfolio/` is the single active experience. The previous `/studio` and `/meta-version` routes remain redirects to the main page.

## The journey

- Grid: an original silver/turquoise vector chassis, pointer tilt and scroll parallax. Race-trim and blueprint controls work with touch and keyboard.
- Work: four project tabs with distinct interactive previews. API responses use clearly labelled sample data; the task interaction is browser-local; the floorplan is an illustrative research visual.
- Garage: the existing Spline robot, loaded only after the visitor selects Meet the robot. It retains visibility-based playback and a retry path. Story, toolbox and track record share the space without adding duplicate sections.
- Next lap: direct email, clipboard copy with failure feedback, verified social links and the existing public CV download.

The ignition intro plays once per browser session and is skippable. Reduced-motion visitors bypass the automatic intro and pointer/scroll scene motion. Explicit Replay ignition remains available. Ctrl/Cmd+K opens searchable native-dialog navigation. Escape closes the dialog and native focus containment is retained.

## Implementation

Entry point: `src/app/page.tsx`. Experience: `components/RaceExperience.js`, `RaceExperience.module.css`, and `RaceCar.js`. The chassis uses original SVG artwork, without a model or external texture. Existing React, Framer Motion and Lucide dependencies are reused. No new dependency is required. Old presentation components remain in Git history/source but are no longer mounted by the entry point.

The initial route exported at approximately 166 KB first-load JavaScript during local validation. The large Spline scene/runtime is separate and is not requested by the default opening.

## Validation

Production static export passed. Browser checks covered the default desktop viewport and 390px/320px viewport overrides, with no document horizontal overflow. Checked blueprint state, API sample response/replay, task progress, LawLink node selection, floorplan raise/lower control, garage tabs, robot load/pause/unmount, mobile navigation, Ctrl+K/Escape and email copy. Reduced-motion guards were inspected in source; OS-level media emulation was not performed. External TaskFlow and three project repository URLs returned HTTP 200. The older API Portal Render demo timed out and its live link was removed from the new UI.

## Deployment

GitHub Pages deployment continues through the existing main-branch workflow. Existing public CV files are preserved unchanged. The newly redesigned application PDFs include third-party referee contacts and remain separate local artifacts; they are excluded from this public deployment after automatic approval review rejected that upload.

Visual references considered: https://canvasui.dev/components and https://magicui.design/docs/components/animated-beam. The new vector graphics and beam implementation are original; no component source was copied.
