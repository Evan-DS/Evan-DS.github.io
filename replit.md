# Portfolio Website

## Overview

This is a modern portfolio website built to showcase professional software engineering projects and skills. The application features a full-stack architecture with a React frontend displaying project demonstrations, an Express.js backend for contact form handling, and PostgreSQL database integration for data persistence. The portfolio includes interactive demos of various technical projects including algorithm visualizations, 3D graphics rendering, database administration tools, system monitoring dashboards, and Active Directory management interfaces.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built with React and TypeScript, using Vite as the build tool and development server. The UI framework leverages shadcn/ui components built on top of Radix UI primitives for accessibility and consistency. Tailwind CSS provides utility-first styling with a custom design system using CSS variables for theming. The application uses wouter for client-side routing and TanStack Query for server state management and API data fetching.

### Backend Architecture
The server is built with Express.js and TypeScript, providing RESTful API endpoints for contact form submissions and potential future data operations. The application uses a modular route registration system for clean API organization. Email functionality is implemented using Nodemailer for contact form notifications, supporting both development logging and production email delivery.

### Component Architecture
The frontend follows a component-based architecture with reusable UI components organized in a design system pattern. Interactive project demonstrations are built as self-contained components showcasing various technical implementations including algorithm visualizations, 3D graphics rendering, database management interfaces, and system monitoring dashboards.

### Data Storage
The application uses Drizzle ORM with PostgreSQL for type-safe database operations. Database migrations are managed through Drizzle Kit with schema definitions stored in a shared directory for type consistency between frontend and backend. The contact form submissions are persisted to demonstrate full-stack data flow.

### Build and Development
Vite handles frontend bundling and development with React Fast Refresh for optimal developer experience. The backend uses tsx for TypeScript execution in development and esbuild for production bundling. The application is configured for deployment with separate client and server build processes.

## External Dependencies

### Database Services
- **PostgreSQL**: Primary database using Neon serverless PostgreSQL for cloud deployment
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Drizzle Kit**: Database migration management and schema generation

### UI Framework
- **React**: Frontend framework with TypeScript support
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Accessible component primitives for form controls, dialogs, and navigation

### State Management
- **TanStack Query**: Server state management and API data fetching
- **wouter**: Lightweight client-side routing

### Email Services
- **Nodemailer**: Email sending for contact form notifications
- Supports various email providers (Gmail, SMTP, cloud services)

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Integration**: Development environment with runtime error handling