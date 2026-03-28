# Culinary Atelier

A recipe app built with **Next.js 14** (App Router) and **Supabase**, following a "Modern Classic Culinary" design system with warm parchment tones and editorial typography.

## Requirements

- Node.js 18+
- npm
- A Supabase project with the schema from `database/create_database.sql`

## Setup

```bash
npm install
```

Create a `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Running locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
/app
  page.tsx                        → Homepage (search + popular recipes)
  categoria/[slug]/               → Category listing with filters
  receta/[category]/[id]/         → Recipe detail page
/components
  Navbar.tsx                      → Glassmorphic sticky navigation
  Footer.tsx                      → Footer with newsletter
  SearchBar.tsx                   → Search input (visual, no backend yet)
  DifficultyBadge.tsx             → Difficulty indicator
/lib
  supabase.ts                     → Supabase client
  data.ts                         → Data fetching layer
  utils.ts                        → Utilities (scaling, formatting)
/database
  create_database.sql             → Supabase schema + seed data
/designs
  DESIGN.md                       → Design system documentation
/styles
  globals.css                     → Global styles & CSS variables
/types
  index.ts                        → TypeScript interfaces
```

## Features

- **Homepage**: Search bar and popular recipes grid
- **Category pages**: Search, sort by difficulty/ingredients/steps, filter by difficulty
- **Recipe detail**:
  - Recipe details card (steps, servings, difficulty)
  - Ingredient scaling by number of servings
  - Ingredient scaling by anchor ingredient quantity
  - Dotted-leader ingredient list
  - Numbered step cards
  - Recommendations section (when available)
- **Design**: Noto Serif + Work Sans typography, warm color palette, no-border sectioning, glassmorphic navigation

## Database

Run `database/create_database.sql` in the Supabase SQL Editor to create tables and seed data. Tables: `tipos_comida`, `recetas`, `ingredientes`, `pasos`.

## Notes

- Data is fetched from Supabase with ISR (`revalidate = 60`).
- Ingredient scaling is client-side only (resets on navigation).
- The search bar is visual-only for now — backend not yet implemented.
