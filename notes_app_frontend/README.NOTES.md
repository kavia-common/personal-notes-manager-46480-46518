# Ocean Notes – Frontend

A modern notes application built with Next.js App Router and the Ocean Professional theme.

## Features
- Header with branding and environment status
- Sidebar notes list with search and create
- Main editor to view, edit, and delete notes
- Client state management with in-memory fallback
- Optional backend CRUD integration via environment variables
- Feature flags via NEXT_PUBLIC_FEATURE_FLAGS (JSON or comma list)
- Responsive and accessible (labels, aria attributes, focus states)

## Environment Configuration
The app reads:
- NEXT_PUBLIC_API_BASE or NEXT_PUBLIC_BACKEND_URL – Base URL for the backend API (e.g. https://api.example.com). If not set, the app uses an in-memory store (non-persistent).
- NEXT_PUBLIC_FEATURE_FLAGS – JSON or comma-separated list of flags. Examples:
  - JSON: {"betaEditor": true, "newNav": false}
  - List: betaEditor,newNav

You can create a `.env.local` file during development:
```
NEXT_PUBLIC_API_BASE=http://localhost:4000
NEXT_PUBLIC_FEATURE_FLAGS=betaEditor
```

## API Contract (expected)
If a backend is provided, the app will call:
- GET /notes?query=... -> Note[]
- POST /notes -> Note
- PATCH /notes/:id -> Note
- DELETE /notes/:id -> 204

Note shape:
```
{
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
```

## Running locally
- Install deps: `npm install`
- Dev server: `npm run dev`
- Visit: http://localhost:3000

If no backend is configured, you’ll see an in-memory mode banner at the top. Notes will not persist across reloads.

## Accessibility
- All interactive elements are keyboard accessible with visible focus.
- Inputs have labels (sr-only where appropriate).
- Live regions and aria attributes convey loading/error states.

## Project Structure
- src/lib/theme.ts – Theme tokens and feature flags parser
- src/lib/api.ts – Backend client with in-memory fallback
- src/lib/notes-store.tsx – Notes state context and CRUD glue
- src/components/* – Header, NotesList, NoteEditor
- src/app/* – Next.js App Router pages and layout

