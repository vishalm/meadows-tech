# Meadows Tech

AI-powered learning platform for students. Vite + React + TypeScript, with a Vercel serverless function that proxies the AI tutor chat to Anthropic.

## Local development

```bash
npm install
npm run dev
```

The site runs at http://localhost:5173. The AI tutor chat calls `/api/chat`, which only works when you run the project through Vercel locally:

```bash
npm i -g vercel
vercel dev
```

For `vercel dev` to talk to Anthropic, set the API key:

```bash
cp .env.example .env
# edit .env and paste your key into ANTHROPIC_API_KEY
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serves the production build
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, click "Add New, Project" and import the repo.
3. Framework preset is auto-detected as Vite.
4. Add an environment variable: `ANTHROPIC_API_KEY` (Production + Preview).
5. Click Deploy.

`vercel.json` already configures:
- Build command, output directory, and clean URLs.
- SPA rewrite so client-side anchors keep working.
- The `/api/chat` function is auto-detected from `api/chat.ts`.

## Project structure

```
api/chat.ts             Serverless function that proxies to Anthropic
src/
  components/           One file per section
  hooks/                Scroll-reveal hook
  content.ts            All user-visible strings, in one place
  index.css             Global styles and CSS variables
  main.tsx, App.tsx     Entry points
public/favicon.svg      Brand mark
index.html              Document shell, fonts, OG tags
```

## Project conventions

- No emoji and no icon fonts. Every glyph is an inline SVG in `src/components/icons.tsx`.
- No em-dashes or en-dashes. Plain ASCII punctuation only.
- User-visible strings live in `src/content.ts`, not inside components.
