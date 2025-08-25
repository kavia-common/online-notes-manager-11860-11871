# Online Notes - Frontend (Next.js)

This is a modern, minimalistic Next.js frontend for a simple notes app. It features:
- Sidebar notes list
- Create, edit, delete notes
- Search by title and content
- Light theme with primary (#1a73e8), secondary (#fbbc05), accent (#34a853)

Data persistence is local to the browser via localStorage to keep the example self-contained. It can be adapted to call a backend REST API by swapping the storage functions in `src/lib/storage.ts`.

## Getting Started

Install dependencies and run locally:

- npm install
- npm run dev
- Open http://localhost:3000

## Code Structure

- src/lib/types.ts — shared types
- src/lib/storage.ts — localStorage CRUD helpers
- src/hooks/useNotes.ts — React hook for state and actions
- src/components/TopBar.tsx — top navigation bar with search and new note
- src/components/Sidebar.tsx — notes list and small-screen search
- src/components/NoteEditor.tsx — editor pane with Save and Delete
- src/app/page.tsx — app composition
- src/app/globals.css — global styles and theme tokens

## Switching to a REST backend

Replace the functions in `src/lib/storage.ts` with fetch calls to your API and keep the hook interface intact. For environment configuration, use Next.js environment variables via `.env.local` and `process.env.NEXT_PUBLIC_*`.
