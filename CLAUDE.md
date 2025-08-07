# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WorkOut is a workspace booking platform that connects remote workers with venues offering workspace. It allows users to discover, book, and pay for workspaces in cafes, restaurants, hotels, and other venues. The platform also provides in-app food and beverage ordering and a comprehensive venue management system. Built with Next.js 15, TypeScript, and Tailwind CSS, the application features a responsive design optimized for both mobile and desktop use.

## User Roles

The application supports four primary user roles:

1. **Regular User** - People who use the app to find and book workspaces
2. **Venue Owner** - Businesses that list their spaces on the platform
3. **Admin** - Platform administrators who manage the system
4. **Public/Unauthenticated User** - Users browsing the site without signing in

## Commands

### Development

```bash
# Start the development server with Turbopack
npm run dev

# Build the application for production
npm run build

# Start the production server
npm start

# Lint the codebase
npm run lint
```

## Architecture

### Project Structure

- **App Router Structure**: The application uses Next.js 15's App Router pattern
- **TypeScript**: Full TypeScript support is enabled
- **Styling**: Uses Tailwind CSS for styling with a customized theme
- **Component-Based Architecture**: Reusable components organized by feature

### Key Files and Directories

- `/src/app/`: Contains the main application pages and layouts
  - `layout.tsx`: Root layout component that sets up fonts and metadata
  - `page.tsx`: Main landing page
  - `globals.css`: Global CSS with Tailwind directives and CSS variables
  - `/find-workspace/`: Workspace search functionality
  - `/venues/[id]/`: Venue details and booking
  - `/venues/[id]/order/`: Food and beverage ordering system
  - `/venues/[id]/order/track/`: Real-time order tracking
  - `/venues/[id]/credit/`: Credit system (activate, status, receipt)
  - `/user/`: User dashboard and profile management
  - `/venue/`: Venue management portal (dashboard, bookings, menu, orders)
  - `/venue-enrollment/`: Venue onboarding process
  - `/admin/`: Admin system (dashboard, users, venues, approval system)
  - `/about/`, `/contact/`, `/get-involved/`, `/list-your-venue/`: Informational pages
  - `/login/`, `/signup/`: Authentication pages
  - `/terms-of-service/`, `/privacy-policy/`, `/terms-of-use/`: Legal pages

- `/src/components/`: Reusable UI components
  - `Navigation.tsx`: Main navigation bar
  - `Footer.tsx`: Site-wide footer
  - `/venue-details/`: Components for venue detail page
  - `/ordering/`: Components for food ordering
  - `/venue-enrollment/`: Components for venue signup process
  - `/user-dashboard/`: User account components
  - `/venue-dashboard/`: Venue management components
  - `/admin/`: Admin interface components
  - `/find-workspace/`: Search and filtering components
  - `/dashboard/`: Dashboard-specific components for different user roles

- `/src/data/`: Mock data and utilities
  - `venues.ts`: Mock venue data and retrieval functions
  - `image-placeholders.ts`: Image placeholder URLs and utility functions

### Design System

The project implements the WorkOut brand design system defined in `tailwind.config.ts` with:

- Brand color palette: Coral red primary, navy blue secondary
- Custom component styling with utility classes
- Typography system with consistent sizing and weights
- Responsive breakpoints for mobile, tablet, and desktop
- Dark mode support with theme switching
- Custom animations and transitions

### Implemented Features

- **Core Platform**
  - Landing page with search functionality
  - Workspace search with map and list views
  - Venue details with amenities, photos, and booking widget
  - User authentication (login/signup)
  - User dashboard with bookings and profile management
  - Comprehensive venue enrollment flow

- **Food & Beverage Ordering**
  - Menu browsing interface
  - Order customization
  - Checkout process
  - Order confirmation
  - Real-time order tracking
  - Live order management for venues

- **Credit System**
  - Credit activation at venues
  - Credit status checking
  - Transaction receipts

- **Admin System**
  - Admin dashboard with statistics
  - User directory and management
  - Venue directory and management
  - Venue approval workflow

- **Content Pages**
  - About/Our Story
  - Get Involved (Ambassador and Corporate programs)
  - List Your Venue landing page
  - Contact page
  - Legal pages (Terms of Service, Privacy Policy, Terms of Use)

## Technical Considerations

- The project uses Turbopack for faster development compilation
- Fonts are loaded using the Next.js font system with Geist as the primary font
- Dark mode support is configured in the Tailwind setup
- Mock data is used in place of actual API integration
- Responsive design is implemented for all pages

## Recent Improvements

1. **Enhanced Authentication UI**
   - Improved login and signup forms with better spacing and layout
   - Responsive design for all authentication forms
   - Consistent styling for form elements

2. **Dashboard-Specific Navigation**
   - Created separate navigation components for dashboard interfaces
   - Custom headers for User, Venue, and Admin dashboards
   - Improved user experience with role-specific layouts

3. **Image Management**
   - Implemented comprehensive image placeholders system
   - Created utility functions for random image selection
   - Category-specific image collections (hero, venue, workspace, user, food)

4. **Booking UI Improvements**
   - Enhanced booking item displays with status indicators
   - Visual cues for different booking states (upcoming, completed, cancelled)
   - Improved venue image presentation

## In Progress

1. **Login/Signup Page Refinement**
   - Continue improving authentication pages for better user experience
   - Fix spacing and alignment issues

2. **Dashboard Navigation Refinement**
   - Test and refine dashboard-specific navigation components
   - Ensure proper responsive behavior

3. **Menu Page Improvements**
   - Enhance food and beverage item display
   - Fix image loading issues for menu items

## Next Steps

1. **Notifications System**
   - Implement comprehensive notifications center
   - Create notification types for different events
   - Build real-time notification indicators

2. **Payment Integration**
   - Add payment method management UI
   - Create checkout flow for workspace bookings
   - Implement invoice generation and receipts

3. **User Profile Enhancements**
   - Add profile photo upload functionality
   - Implement settings and preferences page
   - Create user activity history view