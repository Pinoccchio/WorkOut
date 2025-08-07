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

## Recent Major Implementations (Current State)

### **1. Modern Authentication Modal System (Latest Update)**
   - **Modal-Based Authentication**: Replaced traditional login/signup pages with a sleek modal dialog
   - **Context-Based State Management**: Global auth modal state using AuthModalContext
   - **Smooth Animations**: Fade-in backdrop and slide-up modal animations
   - **Seamless Navigation Integration**: All auth buttons trigger modal instead of page navigation
   - **Form Type Switching**: Users can switch between login/signup without closing modal
   - **Google-Only Social Login**: Streamlined to only show Google authentication
   - **Demo Mode Messaging**: Clear instructions to use dashboard switcher for exploring features
   - **Responsive Design**: Works perfectly on all screen sizes with proper mobile handling

### **2. Comprehensive Multi-Role Dashboard System**
   - **Complete User Dashboard**: 8 feature pages (Bookings, Orders, Favorites, Reviews, Credits, Payment Methods, Payment History, Profile)
   - **Full Venue Management**: 8 management sections (Dashboard, Bookings, Live Orders, Menu, Reports, Staff, Inventory, Profile)
   - **Admin System**: 6 comprehensive areas (Dashboard, Users, Venues with approval workflow, Settings, Content, Analytics)
   - **Role-Specific Navigation**: Custom navigation components (UserNavigation, VenueNavigation, AdminNavigation)
   - **Unified Dashboard Layouts**: DashboardHeader and DashboardFooter components supporting all user types

### **3. Advanced UI Component System**
   - **Enhanced Authentication**: AuthModal component with validation, error handling, context integration
   - **Notifications Center**: Complete notification system with different types and real-time mockup
   - **UserRoleMenu**: Dashboard switcher for accessing different role views
   - **Booking Enhancements**: BookingItem with status-specific visual indicators and overlays
   - **Advanced Navigation**: Primary navigation with mobile responsiveness and user role switching

### **4. Comprehensive Image Management System**
   - **5 Image Categories**: Hero, venue, workspace, user, and food image collections
   - **Utility Functions**: `getRandomImage()`, `getImageByIndex()`, `getImageById()` for consistent handling
   - **Placeholder Integration**: All components now use proper image placeholders with fallbacks
   - **Visual Enhancement**: Consistent image presentation across the entire platform

### **5. Enhanced Data Architecture**
   - **Rich Venue Model**: 44+ properties including location, amenities, features, operational hours
   - **Comprehensive Booking System**: Complete booking interface with status tracking and mock data generation
   - **Sample Data**: 6 fully-featured venues with real Unsplash images and complete details

### **6. Technical Infrastructure**
   - **Next.js 15 + Turbopack**: Latest Next.js with Turbopack for faster development
   - **Radix UI Components**: Full integration of Radix UI primitives for accessibility
   - **Modern TypeScript**: Complete TypeScript implementation with proper interfaces
   - **Tailwind + CVA**: Advanced styling with class-variance-authority for component variants
   - **React Context API**: For global state management (auth modal, user preferences)

## Current Implementation Status

### **Fully Implemented Features**
- ✅ **Core Platform**: Landing page, venue search, individual venue pages
- ✅ **User System**: Complete 8-page user dashboard with all core features
- ✅ **Venue System**: Complete 8-section venue management portal
- ✅ **Admin System**: Full administrative interface with user/venue management
- ✅ **Authentication**: Login/signup with form validation and social login UI
- ✅ **Booking System**: Advanced booking widgets with price calculation
- ✅ **Ordering System**: Food and beverage ordering with menu management
- ✅ **Credit System**: Venue credit activation and tracking
- ✅ **Venue Enrollment**: Complete multi-step onboarding process
- ✅ **Content Pages**: About, Contact, Get Involved, List Your Venue, Legal pages
- ✅ **Notifications**: Comprehensive notification center with different types

### **Architecture Maturity**
- **Production-Ready Components**: Well-architected, reusable component system
- **Proper State Management**: Modern React patterns with TypeScript interfaces
- **Responsive Design**: Mobile-first approach with comprehensive breakpoints
- **SEO Optimization**: Next.js App Router with proper metadata and structure
- **Developer Experience**: ESLint, TypeScript, and modern tooling configuration

## Next Phase Development Priorities

### **1. Backend Integration**
   - Implement real API integration replacing mock data
   - Add database schema design and implementation
   - Implement authentication backend (NextAuth.js or similar)
   - Create real-time features for order tracking and notifications

### **2. Payment System Implementation**
   - Integrate payment processors (Stripe, PayPal, etc.)
   - Implement secure checkout flows
   - Add invoice generation and receipt management
   - Build subscription and credit system backend

### **3. Advanced Features**
   - Real-time chat system for venue communication
   - Advanced search with geolocation and filters
   - Document verification system for venue enrollment
   - Analytics and reporting dashboard implementation
   - Mobile app development (React Native)

### **4. Production Deployment**
   - Set up CI/CD pipeline
   - Configure production hosting (Vercel, AWS, etc.)
   - Implement monitoring and error tracking
   - Add performance optimization and caching
   - Security audit and penetration testing