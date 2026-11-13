# One portfolio

The portfolio now has a single canonical home: https://deshanfdo.github.io/Portfolio/.
The former Studio and Meta version paths are small redirect pages pointing to that home. They contain no alternate portfolio content, theme, or scene assets. The navbar offers contact instead of a version switch.

## Silverworks

The visual direction is a Mercedes-inspired engineering garage: carbon black, silver, and turquoise; condensed racing typography; fine technical borders; and short, controlled motion. Deshan is the author and subject. It is a personal F1 fan creation.

The original Spline robot remains in the hero, with pause/wake controls. The About section contains an original SVG isometric pit-garage diorama. Its Interface, APIs, and AI systems controls connect the miniature to real areas of Deshan's work. Lights and motion can be controlled. Motion stops outside the viewport, when the tab is hidden, or for reduced-motion preferences. It uses no additional WebGL renderer, model downloads, API keys, or dependencies.

## Design references

Deshan requested diorama-style ideas from GitHub without selecting a specific repository. References reviewed: [educlopez/diorama](https://github.com/educlopez/diorama) and [blendi-remade/dioramas](https://github.com/blendi-remade/dioramas). The garage is original SVG/React code; no source code or models from those repositories are bundled.

[Canvas UI](https://canvasui.dev/components) remains a preferred resource for creative components when suitable. The robot must be preserved. Keep the portfolio readable, responsive, and quick to navigate; avoid adding alternate portfolio versions or unrelated visual themes.

## Development

Use Node.js 22 or newer. Run npm ci and npm run dev from frontend, then open http://localhost:3000/Portfolio/. npm run build produces the static export in out/ for GitHub Pages.
