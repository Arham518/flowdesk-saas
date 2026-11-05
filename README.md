# AVENIQ

AVENIQ is a front-end prototype of a team workspace. It puts the things a small team juggles every day — tasks, notes, job openings, a shared calendar and a few key numbers — into one dashboard instead of five browser tabs.

The project has two parts:

- **Landing page** — product pitch, feature overview, a Kanban preview, pricing tiers, FAQ and footer.
- **Workspace console** — the app itself: a dashboard with charts, a task board, notes, a jobs tracker, calendar, team list, analytics and workspace settings.

All data is mock data held in React state. There is no backend or login yet.

## What's inside

- Dashboard with weekly activity and analytics charts (Recharts)
- Task board with statuses and priorities
- Notes, jobs tracker, calendar and team directory screens
- Settings screen (workspace name and preferences)
- Motion built with Framer Motion: blur-in section reveals, a cursor-following 3D tilt on the hero dashboard, drifting background glow, shimmering headline text, a scroll progress bar and smooth page transitions
- Respects the system "reduce motion" setting

## Tech stack

React 19 · Vite · Framer Motion · Recharts · lucide-react · plain CSS with design tokens

## Run it locally

```bash
git clone https://github.com/Arham518/flowdesk-saas.git
cd flowdesk-saas
npm install
npm run dev
```

Build for production with `npm run build`; the output goes to `dist/`.

## Project structure

```
src/
├── App.jsx                  # page switching + scroll progress bar
├── components/              # Navbar, Button, Card
├── pages/
│   ├── SaaSProduct.jsx      # landing page
│   └── WorkspaceConsole.jsx # dashboard app
└── index.css                # design tokens and animation styles
```

## Next steps

- Real authentication and a backend API
- Persisting tasks and notes
- Dark mode

## License

Built for learning and portfolio use.
