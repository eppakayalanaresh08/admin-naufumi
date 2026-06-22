# Naufumi - Admin Panel

A modern admin panel for the Naufumi platform, built with React, Vite, TypeScript, Tailwind CSS, and Redux Toolkit.

## Features

- **React 18 + Vite + TypeScript** — Fast development with type safety
- **Redux Toolkit** — Centralized state for auth, sidebar, and theme
- **Tailwind CSS** — Utility-first styling with dark mode support
- **Light/Dark Mode** — Theme toggle with persistence via Redux
- **Authentication** — Login and signup with protected routes and optional role-based access
- **Axios API Layer** — Token injection, global loader, and 401/403 error handling
- **Reusable UI Components** — Button, Input, Table, Badge, Card, Pagination, and more
- **Responsive Layout** — Collapsible sidebar with smooth animations
- **Dashboard** — Charts and stats powered by Recharts
- **Rich Text Editing** — TinyMCE, Quill, CKEditor, and Jodit for policy and content pages
- **SweetAlert2** — User-friendly alerts and confirmations
- **Lucide Icons** — Consistent iconography across the app

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://your-api.example.com
VITE_API_TIMEOUT=10000
VITE_TINYMCE_API_KEY=your-tinymce-api-key
VITE_APP_NAME=Naufumi
VITE_APP_VERSION=1.0.0
```

All variables are accessed through `src/utils/env.ts`.

### Development

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── assets/              # Static assets (logos, images)
├── components/
│   ├── ui/              # Reusable UI components
│   ├── Layout/          # Sidebar, Header, MainLayout
│   ├── ProtectedRoute.tsx
│   └── ThemeInitializer.tsx
├── config/              # Third-party editor configuration
├── contexts/            # React contexts (auth, theme, sidebar)
├── hooks/               # Custom hooks (useAuth, useSidebar, useTheme, useLoader)
├── pages/               # Route-level page components
├── services/            # Cross-cutting services (e.g. loader)
├── store/
│   ├── slices/          # auth, sidebar, theme
│   ├── hooks.ts         # Typed Redux hooks
│   └── store.ts
├── types/               # Shared TypeScript types
├── utils/
│   ├── api.ts           # Axios instance and API helpers
│   ├── apiError.ts      # API error parsing
│   ├── env.ts           # Environment variable helpers
│   ├── helpers.ts       # General utilities
│   ├── constants.ts     # API endpoints and app constants
│   └── swal.ts          # SweetAlert2 helpers
├── App.tsx
├── main.tsx
└── index.css
```

## Pages & Routes

| Route | Page |
|-------|------|
| `/login` | Login |
| `/signup` | Signup |
| `/dashboard` | Dashboard |
| `/user-management` | User Management |
| `/user-management/add` | Add User |
| `/user-management/edit/:userId` | Edit User |
| `/business-listings` | Business Listings |
| `/business-listings/:businessId` | Business Details |
| `/jobs` | Jobs |
| `/jobs/:jobId` | Job Details |
| `/reports` | Issue Reports |
| `/contact-us` | Contact Us |
| `/terms-and-conditions` | Terms & Conditions |
| `/privacy-policy` | Privacy Policy |
| `/refund-policy` | Refund Policy |
| `/help-and-support` | Help & Support |
| `/unauthorized` | Unauthorized access |

Additional routes (verification center, wallet & referrals, revenue subscriptions, Bizora subscriptions, content moderation, settings) are wired in `App.tsx` and can be enabled from the sidebar as needed.

## Key Concepts

### Authentication

- Token-based auth stored in `localStorage`
- `ProtectedRoute` guards all main app routes
- Optional `requiredRoles` prop for role-based access control
- Axios request interceptor attaches `Authorization: Bearer <token>`
- 401 responses clear session and redirect to `/login`

### Theme

Theme state lives in the Redux `themeSlice`. The `useTheme` hook and `ThemeInitializer` apply the active theme class to the document root. Toggle via the sun/moon icon in the header.

### API Layer

- Base URL and timeout configured in `src/utils/env.ts`
- Endpoint paths centralized in `src/utils/constants.ts`
- Global loading overlay managed by `loaderService` during API calls
- Standardized error messages via `getApiErrorMessage` in `src/utils/apiError.ts`

### Path Aliases

The `@/` alias maps to `src/` (configured in `vite.config.ts`):

```ts
import { Button } from '@/components/ui/Button'
```

## Customization

### Colors

Edit `tailwind.config.js` to adjust the color palette.

### Adding a New Page

1. Create a page component in `src/pages/`
2. Register the route in `src/App.tsx`
3. Add a menu item in `src/components/Layout/Sidebar.tsx`

## Tech Stack

| Category | Libraries |
|----------|-----------|
| Framework | React 18, React Router 6 |
| Build | Vite 5, TypeScript |
| State | Redux Toolkit, React Redux |
| Styling | Tailwind CSS |
| HTTP | Axios |
| Charts | Recharts |
| Icons | Lucide React |
| Editors | TinyMCE, Quill, CKEditor, Jodit |
| Alerts | SweetAlert2 |

## License

MIT
