# Airtel Payment Bank Quiz Application

## Overview

This is a full-stack quiz application built for Airtel Payment Bank certification training. The application features a React frontend with TypeScript, an Express.js backend, and uses Drizzle ORM for database management. The system allows users to take practice quizzes and administrators to manage questions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle Kit for migrations
- **Validation**: Zod for request/response validation
- **Development**: Hot reload with Vite middleware integration

## Key Components

### Database Schema (shared/schema.ts)
- **Users Table**: Basic user management with username/password
- **Questions Table**: Quiz questions with multiple choice options, categories, and explanations
- **Validation**: Zod schemas for type-safe data validation

### Backend Services (server/)
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **API Routes**: RESTful endpoints for question CRUD operations
- **Error Handling**: Centralized error handling middleware
- **Request Logging**: Custom logging middleware for API requests

### Frontend Pages (client/src/pages/)
- **Home**: Question browsing with search and filter capabilities
- **Quiz**: Interactive quiz interface with timer and scoring
- **Admin**: Question management interface for administrators
- **Not Found**: 404 error page

### UI Components (client/src/components/)
- **Layout**: Main application layout with navigation
- **Admin Form**: Form for creating/editing questions
- **Question Card**: Reusable question display component
- **Quiz Timer**: Timer and progress tracking for quizzes
- **Search Filter**: Search and category filtering functionality

## Data Flow

1. **Question Management**: Admin creates/updates questions through the admin interface
2. **Quiz Taking**: Users browse questions, start quizzes, and receive immediate feedback
3. **Search & Filter**: Users can search questions by keyword or filter by category
4. **Validation**: All data is validated on both client and server using Zod schemas

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **wouter**: Lightweight React router
- **zod**: Runtime type validation
- **tailwindcss**: Utility-first CSS framework

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **eslint**: Code linting

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with hot reload
- **Backend**: tsx with automatic restart on file changes
- **Database**: Development database with push migrations

### Production
- **Build Process**: 
  - Frontend: Vite build to `dist/public`
  - Backend: esbuild bundle to `dist/index.js`
- **Deployment**: Single Node.js process serving both API and static files
- **Database**: PostgreSQL with connection pooling via Neon

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NODE_ENV**: Environment detection for development/production modes
- **REPL_ID**: Replit-specific development features

The application uses a monorepo structure with shared TypeScript types and schemas, enabling type safety across the entire stack. The architecture supports both development and production environments with appropriate build processes and environment-specific configurations.