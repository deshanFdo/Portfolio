# Silverworks: the engineering paddock

The portfolio has two explicitly requested editions: Silverworks at `/Portfolio/` and the separate Ferrari-inspired Rosso Works experience at `/Portfolio/ferrari`. The header buttons switch between them. The previous `/studio` and `/meta-version` routes remain redirects to the main page.

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

## Rosso Works / Ferrari edition

Added 14 November 2026 at the user's request for a new edition and a navigation button. Its distinct red, cream and yellow presentation uses original side-profile racing artwork, an ignition intro, explicit launch and airflow controls, project illustrations, native-dialog case studies and a co-driver garage retaining the same interactive robot. No new dependencies, models or external textures were added. It is an independent Ferrari-inspired fan design.

Entry point: `src/app/ferrari/page.tsx`. Components: `FerrariExperience.js`, `FerrariCar.js`, and `FerrariExperience.module.css`. The exported route initially measured approximately 163 KB first-load JavaScript. Reduced-motion guards skip the automatic intro and scroll parallax, and CSS disables continuous wheel/airflow effects for that preference.

Browser checks covered the default desktop viewport plus 1280px, 390px and 320px viewport overrides. Verified reciprocal edition navigation, launch/airflow state, all four project dialogs, sample API output, task progress, LawLink channel selection, floorplan structure control, Escape dismissal, keyboard setup tabs, email copy and robot load/pause/unmount. No document horizontal overflow was observed. OS-level reduced-motion emulation was not performed. A stalled browser inspection connection was recovered with a normal reload. Public CV files remain unchanged.

## Credentials and Beyond the Code

Added 16 November 2026 to both editions. `CareerCollection.js` supplies theme-aware Credentials and Beyond the Code sections, including category filters, illustrative certificate placeholders, selected competition participation from the supplied CV, and a native-details build playbook. Both navigation menus include a Credentials anchor; Silverworks quick navigation inherits it automatically.

`credentialsData.js` is the single source for the three planned credential cards. Their titles/issuers come from the supplied CV. The artwork is decorative and prominently labelled as a placeholder. No original certificate, issue date, credential ID, verification badge or download is fabricated. With `document` and `verificationUrl` set to null, the cards show Awaiting certificate file and have no dead document links.

When Deshan supplies the actual certificates, reconcile the exact titles, issuers and public sharing preferences, add approved assets, and populate only the corresponding document/verification fields. Both editions will update from the shared data. No CV PDFs or referee contact data are part of this change.

Validation for the new sections: production export passed; category filtering, reset-to-All, placeholder counts, keyboard activation, playbook expansion, both Credentials navigation anchors and 320px/390px/800px layouts were checked in the browser. No horizontal document overflow or placeholder document links were found. The new section anchors use the existing document scroll padding without adding a second sticky-header offset.
