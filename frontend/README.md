# Deshan Fernando portfolio

One portfolio, one Silverworks theme: [deshanfdo.github.io/Portfolio/](https://deshanfdo.github.io/Portfolio/).

Next.js, React, and TypeScript, statically exported for GitHub Pages. The Mercedes-inspired F1 design uses carbon black, silver, and turquoise, with a retained interactive robot and a lightweight SVG garage diorama.

## Run locally

Use Node.js 22 or newer, then run npm ci and npm run dev. Open http://localhost:3000/Portfolio/. Run npm run build for the static export in out/.

## Structure

- src/app/page.tsx is the single portfolio page.
- components/GarageDiorama.js contains the original interactive isometric scene.
- components/SplineEmbed.js retains the robot, lazy loading, visibility handling, and retry state.
- components/PortfolioRedirect.tsx forwards former version URLs to the canonical portfolio.
- STUDIO.md records the consolidated design direction and references.

The Spline robot requires network access and WebGL. The SVG diorama and portfolio content work independently. Decorative motion respects reduced-motion preferences.
