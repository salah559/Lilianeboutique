# Lilian Boutique - Replit Project

## Overview
Lilian Boutique is an Arabic e-commerce website for women's clothing, built with Next.js and Supabase. This project was successfully migrated from Vercel to Replit on October 15, 2025.

## Project Architecture
- **Framework**: Next.js 14.2.5 (Pages Router)
- **Styling**: Tailwind CSS 3.4.1
- **Database**: Supabase (PostgreSQL)
- **Animation**: Framer Motion 10.12.16
- **Language**: Arabic (RTL interface)

## Key Features
- Product catalog with sample data
- Shopping cart functionality
- Checkout system with Algerian wilaya/commune selection
- Admin authentication panel
- Order management via Supabase

## Recent Changes (Vercel → Replit Migration)

### Security Improvements
- **Server-side Admin Authentication**: Moved admin password verification from client-side to secure API route (`/api/admin-auth`)
- **No Hardcoded Fallbacks**: Admin authentication now requires `ADMIN_PASSWORD` environment variable and fails closed for security

### Replit Configuration
- **Port Configuration**: Development and production servers configured to run on port 5000 with host 0.0.0.0
- **Pinned Dependencies**: All package versions pinned to prevent version drift and maintain compatibility
- **Next.js 14 Compatibility**: Updated Link components to use modern Next.js 14 API (removed nested `<a>` tags)

### File Structure
```
├── components/
│   ├── AdminModal.js       # Admin login modal (uses server-side auth)
│   ├── CartContext.js      # Shopping cart state management
│   └── Header.js           # Main navigation header
├── pages/
│   ├── api/
│   │   ├── admin-auth.js   # Secure admin authentication endpoint
│   │   └── checkout.js     # Order submission to Supabase
│   ├── products/
│   │   └── index.js        # Product listing page
│   ├── _app.js            # Next.js app wrapper
│   ├── about.js           # About page
│   ├── admin.js           # Admin dashboard (secure)
│   ├── cart.js            # Shopping cart page
│   ├── checkout.js        # Checkout form
│   ├── contact.js         # Contact page
│   └── index.js           # Homepage
├── data/
│   └── algeria-communes.json  # Algerian location data
├── supabase/
│   └── schema.sql         # Database schema
└── styles/
    └── globals.css        # Global styles and Tailwind config
```

## Required Environment Variables

The following secrets must be configured in Replit Secrets:

1. **NEXT_PUBLIC_SUPABASE_URL** - Your Supabase project URL
2. **SUPABASE_SERVICE_ROLE_KEY** - Supabase service role secret key (server-side only)
3. **ADMIN_PASSWORD** - Secure password for admin panel access

⚠️ All environment variables are required for the application to function properly.

## Development

**Start Development Server:**
```bash
npm run dev
```
Server runs on http://0.0.0.0:5000

**Build for Production:**
```bash
npm run build
```

**Start Production Server:**
```bash
npm run start
```

## Deployment

The project is configured for Replit Autoscale deployment:
- **Build Command**: `npm run build`
- **Run Command**: `npm run start`
- **Port**: 5000

Environment variables from Replit Secrets are automatically available in deployed environments.

## Next Steps / Future Enhancements

1. **Product Management**: Connect admin panel to Supabase for full product CRUD operations
2. **Image Hosting**: Configure Cloudinary or Supabase Storage for product images
3. **Order Management**: Build admin order viewing and status management
4. **Payment Integration**: Add payment gateway for online transactions
5. **Email Notifications**: Send order confirmations to customers

## Notes

- The application uses Arabic text throughout (RTL layout)
- Admin access is protected by server-side authentication
- All dependencies are pinned to specific versions for stability
- Supabase handles all data persistence (orders, products, etc.)

Last Updated: October 15, 2025
