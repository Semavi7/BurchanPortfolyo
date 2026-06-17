# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server
npm run build    # Production build (uses webpack, not Turbopack)
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16 (App Router) with `@/` path alias → `src/`
- **Runtime**: Node.js (not Edge) — `serverExternalPackages` configured for LanceDB
- **Styling**: Tailwind CSS v4 with `@tailwindcss/postcss` plugin, custom `@theme` tokens in `globals.css`
- **UI**: React 19, Framer Motion, Lucide React icons, Chart.js
- **AI/RAG**: LangChain with DeepSeek (via OpenAI-compatible endpoint), Google Generative AI embeddings, LanceDB vector store

## Project Architecture

This is a personal portfolio site with an industrial/brutalist dark theme (sharp borders, monospace accents, terminal aesthetic).

### Page Routes (App Router)

| Route | File | Description |
|---|---|---|
| `/` | [src/app/page.tsx](src/app/page.tsx) | Single-page portfolio — vertically composed of all section components |
| `/ml` | [src/app/ml/page.tsx](src/app/ml/page.tsx) | Interactive ML algorithm guide (client-side table/cards with search) |
| `/algorithms` | [src/app/algorithms/page.tsx](src/app/algorithms/page.tsx) | Interactive DS&A learning module (Big O, Stack/Queue sim, search algo race) |
| `/go` | [src/app/go/page.tsx](src/app/go/page.tsx) | Interactive Go learning bootcamp with code playground & quizzes |
| `/rust` | [src/app/rust/page.tsx](src/app/rust/page.tsx) | Interactive Rust learning bootcamp with code playground & quizzes |
| `/privacy-policy` | [src/app/privacy-policy/page.tsx](src/app/privacy-policy/page.tsx) | Static privacy policy page |
| `/account-deletion` | [src/app/account-deletion/page.tsx](src/app/account-deletion/page.tsx) | Static account deletion page |

### API Route

- **`/api/chat`** ([src/app/api/chat/route.ts](src/app/api/chat/route.ts)) — POST endpoint for the AI portfolio assistant. Uses RAG pipeline: retrieves relevant docs from LanceDB vector store → constructs prompt → streams response from DeepSeek (`deepseek-v4-flash`) via SSE. The vector store indexes `cv.pdf` (root) + GitHub repos.

### Key Libraries

- **[src/lib/data.ts](src/lib/data.ts)** — All static portfolio content (personal info, experience, education, skills, projects, certifications). Single source of truth consumed by all display components.
- **[src/lib/rag.ts](src/lib/rag.ts)** — RAG pipeline: initializes LanceDB vector store from `cv.pdf` + GitHub repos, splits documents, creates embeddings via Google Generative AI (`gemini-embedding-001`). Called on server startup via instrumentation and per API request.
- **[src/lib/github.ts](src/lib/github.ts)** — Fetches repos from GitHub API (non-fork, sorted by stars, top 40). Requires `GITHUB_USERNAME` (default: `semavi7`) and optionally `GITHUB_TOKEN` for rate limits.
- **[src/lib/utils.ts](src/lib/utils.ts)** — Standard `cn()` utility using `clsx` + `tailwind-merge`.
- **[src/instrumentation.ts](src/instrumentation.ts)** — Next.js instrumentation hook that warms up the vector store on server startup (Node.js runtime only).

### Component Architecture

The home page ([src/app/page.tsx](src/app/page.tsx)) is a vertical composition of independent `"use client"` section components:

`Header` → `Hero` (wraps `ChatInterface`) → `Projects` → `MachineLearning` (CTA card) → `Algorithms` (CTA card) → `GoLang` (CTA card) → `RustLang` (CTA card) → `Skills` → `Timeline` → `Certifications` → `Footer`

All presentational components read from `personalData` in [src/lib/data.ts](src/lib/data.ts).

### Theme Tokens (Tailwind v4 `@theme`)

Defined in [src/app/globals.css](src/app/globals.css): `--color-background: #050505`, `--color-foreground: #fafafa`, `--color-primary: #10b981` (emerald), `--color-secondary: #3b82f6` (blue), `--color-accent: #f59e0b` (amber), all radii at `0px` (sharp industrial edges), fonts: Outfit (sans) + JetBrains Mono (mono).

### Chat/RAG Flow

1. `ChatInterface` (client component in `Hero`) sends POST to `/api/chat` with conversation messages
2. API route loads vector store, creates retriever (top 8 docs), builds a LangChain `RunnableSequence`
3. Sequence: retrieve context from LanceDB → populate prompt template → stream via DeepSeek → SSE response
4. Client reads SSE stream, appending tokens to the last assistant message

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DEEPSEEK_API_KEY` | Yes | DeepSeek API key for chat model |
| `GOOGLE_API_KEY` | Yes | Google Generative AI API key for embeddings |
| `GITHUB_USERNAME` | No | GitHub username for repo fetching (defaults to `semavi7`) |
| `GITHUB_TOKEN` | No | GitHub PAT for higher API rate limits |

## Webpack Configuration

`next.config.ts` uses webpack aliases to disable `sharp` and `onnxruntime-node` (native modules not needed), and excludes non-Windows LanceDB binaries from deployment tracing.
