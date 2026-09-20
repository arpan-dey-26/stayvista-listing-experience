# StayVista Listing Experience

A high-fidelity StayVista-inspired vacation-rental listing experience built with Next.js, React and TypeScript.

## Highlights

- Responsive listing page composition
- Photo mosaic, photo tour and lightbox interactions
- Booking rail and stay calendar
- Amenities, reviews, host, location and policy sections
- Keyboard-friendly interactions and accessibility considerations
- Centralised design tokens and reusable UI primitives
- Dedicated verification scripts for geometry, accessibility, interactions, tour, lightbox and release checks

## Stack

- Next.js 15
- React 19
- TypeScript
- CSS
- ESLint + Prettier

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Verification

```bash
npm run verify
```

The project also includes focused verification commands under `scripts/verify-geometry`.

## Repository structure

- `src/app` — application entry and global styles
- `src/components` — layout, listing, booking, gallery and UI components
- `src/data` — listing and photo data
- `src/hooks` — interaction/state hooks
- `src/lib` — types and utility functions
- `src/styles` — component style sheets
- `docs` — requirements, measurements, architecture and verification notes
- `scripts` — architecture and verification tooling

This repository contains an independently implemented reconstruction for a skills-test style project; it is not an official StayVista or Airbnb application.