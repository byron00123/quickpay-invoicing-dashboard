# QuickPay Invoicing Dashboard

A modern invoicing and payments dashboard inspired by the QuickPay Dribbble design. Built as part of a front-end coding challenge.

## Tech Stack
- **Next.js (App Router)** – React framework with server-side rendering and file-based routing  
- **TypeScript** – Type-safe development  
- **Tailwind CSS** – Utility-first styling  
- **Redux Toolkit** – State management for invoices, payments, and settings  
- **Supabase** – Backend-as-a-Service for authentication and data persistence (optional)  
- **Sonner** – Toast notifications  

## Features Implemented
- **Dashboard Layout** – Sidebar with main links and top bar with notifications & profile dropdown  
- **Payments & Invoices Table** – Searchable, filterable, with status badges and totals  
- **New Invoice Drawer** – Slide-over form to create a new invoice  
- **Payment Detail Modal** – Clickable invoice rows open detailed view  
- **Settings Page** – Company branding: name, logo upload, brand color with live preview  
- **Login & Register Pages** – Password toggle, placeholders, validation, gradient backgrounds  
- **Responsive Design** – Mobile-friendly layout  

## Features Planned / Optional
- **Invoice Preview Modal** – Visual invoice rendering for print or PDF  
- **Zod Validation** – Form validation schemas for invoices and authentication  
- **Animated / Dynamic Backgrounds** – For a more visually engaging experience  
- **Live Backend Persistence** – Currently using Supabase for fetching, could persist new invoices fully  

## Project Structure
/app - Next.js app router pages
/components - Reusable UI components
/store - Redux slices for payments, invoices, settings
/lib - Supabase client and utility functions
/public/logos - Store company logo images



## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quickpay-dashboard.git
cd quickpay-dashboard

2.Install dependencies:
pnpm install
# or
yarn

3.Configure environment variables (Supabase URL & anon key) in .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4.Run the development server:
pnpm run dev
# or
yarn dev

5.Open in your browser.
