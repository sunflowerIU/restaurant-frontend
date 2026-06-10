# Restaurant Frontend

A modern restaurant frontend application built with Next.js, TypeScript, React, Tailwind CSS, and shadcn/Radix UI.  
The project includes a restaurant landing page, menu page, authentication pages, checkout flow, orders page, profile page, payment status page, and responsive UI components.

## Live Demo

[View Live Project](https://restaurant-frontend-xi-five.vercel.app)

## Overview

This project is the frontend part of a full-stack restaurant ordering application. It focuses on creating a clean, responsive, and user-friendly interface for browsing food items, managing user authentication, handling checkout, viewing orders, and displaying payment status.

The project uses the Next.js App Router structure with reusable components, custom hooks, server/client utility functions, and modern UI libraries.

## Features

- Restaurant landing page
- Hero section with animated food UI
- Responsive navigation bar
- Mobile-friendly menu
- Login page
- Signup form
- Google login button UI
- Forgot password page
- Reset password page
- Menu page
- Checkout page
- Orders page
- User profile page
- Contact page
- Payment status page
- Protected route component
- Reusable UI components
- Toast notifications using Sonner
- Icons using Lucide React and React Icons
- Theme support using next-themes
- Animation support using GSAP
- Type-safe development using TypeScript

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js |
| Language | TypeScript |
| UI Library | React |
| Styling | Tailwind CSS |
| Components | shadcn, Radix UI |
| Animation | GSAP |
| Icons | Lucide React, React Icons |
| Notifications | Sonner |
| Theme | next-themes |
| Deployment | Vercel |
| Linting | ESLint |

## Project Structure

```bash
restaurant-frontend/
├── app/                    # Next.js App Router pages
│   ├── _providers/          # App-level providers
│   ├── auth/reset-password/ # Reset password route
│   ├── checkout/            # Checkout page
│   ├── contact/             # Contact page
│   ├── forgot/              # Forgot password page
│   ├── login/               # Login page
│   ├── menu/                # Menu page
│   ├── orders/              # Orders page
│   ├── payment/             # Payment status route
│   ├── profile/             # User profile page
│   ├── layout.tsx           # Root layout
│   ├── loading.tsx          # Loading UI
│   ├── not-found.tsx        # 404 page
│   └── page.tsx             # Homepage
├── components/              # Reusable UI and page components
│   ├── checkout/            # Checkout components
│   ├── payment/             # Payment components
│   ├── profile/             # Profile components
│   ├── ui/                  # shadcn/Radix UI components
│   ├── HeroSection.tsx
│   ├── LoginForm.tsx
│   ├── MenuTable.tsx
│   ├── Navigation.tsx
│   ├── ProtectedRoute.tsx
│   └── SignupForm.tsx
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities, auth helpers, validators, and types
├── public/                  # Static assets
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Main pages
| Page            | Route                              | Description                 |
| --------------- | ---------------------------------- | --------------------------- |
| Home            | `/`                                | Restaurant landing page     |
| Menu            | `/menu`                            | Food/menu listing page      |
| Login           | `/login`                           | User login page             |
| Forgot Password | `/forgot`                          | Forgot password page        |
| Reset Password  | `/auth/reset-password`             | Reset password page         |
| Checkout        | `/checkout`                        | Checkout page               |
| Orders          | `/orders`                          | User orders page            |
| Profile         | `/profile`                         | User profile page           |
| Contact         | `/contact`                         | Contact page                |
| Payment Status  | `/payment/[gateway]/[status]/[id]` | Dynamic payment result page |


## Important components
| Component                  | Purpose                      |
| -------------------------- | ---------------------------- |
| `HeroSection.tsx`          | Main homepage hero section   |
| `HeroBackground.tsx`       | Hero background design       |
| `HeroFloatingFoods.tsx`    | Floating food animation/UI   |
| `Navigation.tsx`           | Main navigation bar          |
| `NavigationMobileMenu.tsx` | Mobile menu navigation       |
| `LoginForm.tsx`            | Login form UI                |
| `SignupForm.tsx`           | Signup form UI               |
| `ResetPasswordForm.tsx`    | Reset password form UI       |
| `MenuTable.tsx`            | Menu display/table component |
| `ProtectedRoute.tsx`       | Protects private pages       |
| `DropdownMenuUser.tsx`     | User dropdown menu           |
| `GoogleButton.tsx`         | Google login button          |
| `Spinner.tsx`              | Loading spinner              |


## Available Scripts
| Script          | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Build the project for production |
| `npm run start` | Start the production server      |
| `npm run lint`  | Run ESLint                       |


## What I Learned
Building a frontend project with Next.js App Router
-Creating reusable React components
-Using TypeScript in a real project
-Structuring a scalable frontend folder structure
-Creating responsive navigation and pages
-Using shadcn/Radix UI components
-Adding animations with GSAP
-Handling authentication-related frontend pages
-Building checkout, orders, profile, and payment status UI
-Deploying a Next.js project to Vercel

## Future Improvements
-Connect all pages fully with the backend API
-Add real menu data from the database
-Add cart state management
-Add order tracking
-Add payment gateway integration UI improvements
-Add form validation with better user feedback
-Add loading skeletons
-Add automated tests
-Improve SEO metadata
-Add screenshots to this README
-Improve accessibility
