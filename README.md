# Algorithm Visualizer

Interactive, TypeScript-ready React workspace for exploring classic data structures and algorithms. The app ships with rich visualizations, a control panel for stepping through executions, pseudocode snippets, and a scratch code editor so you can reason about each operation without leaving the page.

## Features

- Step-by-step playback for sorting, searching, tree rotations, stacks, queues, and more, powered by deterministic step generators in `application/src/components/visualization-area.jsx`.
- Multi-pane layout (`application/src/App.jsx`) combines a sticky algorithm catalog, visualization canvas, transport controls, pseudocode viewer, and embeddable editor so every artifact stays in sync with the active algorithm.
- Pseudocode library (`application/src/components/code-view-panel.jsx`) mirrors the sidebar taxonomy, making it simple to contrast the visualization with reference logic.
- Sandbox editor (`application/src/components/code-editor-panel.jsx`) gives you a local scratch pad with React state for quick experiments.
- Radix UI primitives, Geist fonts, and Lucide icons create a consistent dark theme while staying accessible and keyboard friendly.
- TypeScript toolchain (Vite + `tsc` + ESLint) is prewired for strict checking even though the UI ships in `.jsx`—migrate files incrementally without reconfiguring the stack.

## Tech Stack

- React 18 + Vite 6 with Fast Refresh
- TypeScript 5 (via `tsc --noEmit` for type checking)
- ESLint flat config with strict rules
- Radix UI, class-variance-authority, clsx, Geist font, Lucide icons
- Vercel Analytics (optional drop-in)

## Getting Started

> All application code lives in the `application` directory. Run every command from there.

### Prerequisites

- Node.js 18.18+ (or any version supported by the current Vite release)
- npm 9+ (comes with newer Node installers)

### Installation

```bash
git clone <repo-url>
cd Algorithm-Visualizer/application
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server (default http://localhost:5173) with HMR.

### Quality Checks

```bash
npm run lint   # ESLint (TS + JSX) with maxWarnings=0
npm run build  # Type-checks via tsc and produces a production bundle
npm run preview  # Serves the build output locally
```

The `build` script runs `tsc --noEmit` before Vite to ensure the codebase stays TypeScript-safe even when files are authored in JavaScript.

## Project Structure

```
Algorithm-Visualizer/
├── README.md
└── application/
    ├── public/                   # Static assets served as-is
    ├── src/
    │   ├── components/           # Visualization UI, panels, shadcn/Radix wrappers
    │   ├── lib/                  # Shared helpers and layout utilities
    │   ├── assets/               # Images / data blobs
    │   ├── App.jsx               # Root layout + pane orchestration
    │   └── main.jsx              # Vite entry point
    ├── eslint.config.js
    ├── jsconfig.json             # Path aliases (@/*) + TS compiler options
    ├── vite.config.js
    └── package.json
```

## Customizing Algorithms

1. **Add the menu item** – extend the appropriate category in `application/src/components/sidebar.jsx` so users can select it.
2. **Provide pseudocode** – add a matching key/value entry in `application/src/components/code-view-panel.jsx` so reference code appears alongside the visualization.
3. **Describe the visualization** – implement a new step generator (or reuse an existing one) in `application/src/components/visualization-area.jsx` and hook it into the `useMemo` that selects steps based on `algorithm`.
4. **Tune the UI (optional)** – adjust layout or add bespoke controls inside `application/src/App.jsx` or dedicated components under `application/src/components/`.

Because the build already enforces strict TypeScript settings, you can convert any `.jsx` file to `.tsx` as you go—just update the import paths and benefit from typed props immediately.

## Troubleshooting

- **Type errors during `npm run build`** – run `npx tsc --noEmit` inside `application` to see the exact diagnostics. The repo uses `@/*` aliases configured in `jsconfig.json`; ensure editors respect that setting.
- **Broken layout or visualization** – inspect the data emitted by your step generator and confirm it matches the shape consumed in `VisualizationArea`. The control panel expects `onPlayPause`, `onStep`, `onReset`, and `onSpeedChange` props to be wired (see `App.jsx`).
- **Port conflicts** – set a custom port via `npm run dev -- --port 3000` or define `VITE_PORT` in an `.env` file (Vite auto-loads env vars prefixed with `VITE_`).

## License

No explicit license has been published yet. If you intend to open-source or distribute the project, add a LICENSE file (MIT is a common choice for educational tooling).
