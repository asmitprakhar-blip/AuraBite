# AuraBite - Premium Food Ordering Website

## Overview
AuraBite is a premium multi-page food ordering website with subscription-based meal delivery. The site features a white/light theme, location-based ordering, user authentication via Replit Auth, and four subscription meal plans.

## Key Features
- **Multi-page Application**: Home, Menu, Cart, Customize Meal, Checkout, Reviews, About, Contact, Subscriptions
- **Subscription Plans**: 4 meal plans priced in Indian Rupees (₹)
  - Dinner Only: ₹2,499/30 days
  - Lunch + Dinner: ₹3,999/30 days  
  - Lunch Only: ₹2,299/30 days
  - Mega Plan (All 3 meals): ₹5,999/30 days
- **Authentication**: Replit Auth (OpenID Connect) for sign in/sign up
- **Location System**: Browser geolocation with saved addresses (Home, Work)
- **Auto-scrolling Offers Carousel**: Displays promotions and subscription plans
- **WhatsApp Integration**: Floating chat button (+91 7277775111)

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + Framer Motion
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (Neon-backed via Replit)
- **ORM**: Drizzle ORM
- **Auth**: Replit Auth (OpenID Connect)

## Project Structure
```
client/
├── src/
│   ├── components/     # Reusable UI components (Navbar, Footer, MenuCard, LocationModal, OffersCarousel)
│   ├── pages/          # Page components
│   ├── hooks/          # Custom hooks (use-auth, use-cart, use-location, use-menu)
│   └── lib/            # Utility functions
server/
├── routes.ts           # API routes
├── storage.ts          # Data access layer
├── replit_integrations/auth/  # Replit Auth integration
shared/
├── schema.ts           # Drizzle schema + Zod validation
└── models/auth.ts      # Auth schema (users, sessions)
```

## Branding
- **Name**: AuraBite (singular, not AuraBites)
- **Logo**: Located at `client/public/logo.png`
- **Theme**: White/light with slate backgrounds and orange/amber primary colors
- **Contact**: +91 7277775111 | info@aurabiteofficial.com

## User Preferences
- Currency: Indian Rupees (₹), not dollars
- Theme: White/light (user requested change from dark theme)
- Static navbar (no movement effects)
- No "Visit Us" in contact - only phone and email

## Recent Changes
- Integrated Replit Auth for user authentication
- Updated branding from AuraBites to AuraBite
- Added subscription plans page with 4 meal options
- Implemented location modal with geolocation
- Added offers carousel on home page
- Changed all pricing to Indian Rupees (₹)
- Applied light theme styling across all pages
- Added WhatsApp floating button
- Updated contact details

## Running the Application
The app runs via `npm run dev` which starts both Express backend and Vite frontend on port 5000.

## Database
Uses PostgreSQL with tables for:
- users, sessions (auth)
- menu_items, orders, reviews, messages
