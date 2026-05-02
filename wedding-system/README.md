# 💍 Wedding Management System

A beautiful Next.js frontend for managing weddings, guests, and gift tracking.

## Tech Stack
- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS v4 — elegant cream & rose gold palette
- **Icons:** Lucide React
- **State:** React Context API (in-memory mock data)

## Features
- 📋 **Dashboard** — Grid of wedding cards with search
- ➕ **Register Wedding** — Form with validation
- 👥 **Guest Ledger** — Add/remove guests per wedding
- 💰 **Gift Tracking** — Dual currency support (USD & KHR)
- 📊 **Summary Stats** — Real-time totals by side and currency

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /layout.tsx             — Global layout & Navbar
  /page.tsx               — Wedding Dashboard
  /register/page.tsx      — Wedding Registration Form
  /wedding/[id]/page.tsx  — Guest List & Gift Ledger
/components
  Navbar.tsx
  WeddingCard.tsx
  GuestTable.tsx
  SummaryCard.tsx
/context
  WeddingContext.tsx      — Global state (weddings & guests)
/types
  index.ts                — TypeScript interfaces
```

## Notes
- Data is stored in-memory (React state). Refreshing the page resets to mock data.
- To persist data, connect to a backend API or localStorage.
- Sample weddings and guests are pre-loaded for demonstration.
