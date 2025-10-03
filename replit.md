# replit.md

## Overview

This repository contains two Node.js applications that demonstrate unit testing, authentication, and database integration patterns for educational purposes (STSWENG course). The projects showcase:

1. **node-unit-mvc**: A minimal MVC example focused on unit testing with Jest and Sinon, demonstrating how to mock MongoDB/Mongoose connections
2. **node-unit-test**: A full-featured personal diary web application with user authentication, session management, and deployment configurations for MongoDB Atlas and Heroku (now configured for Replit)

Both applications use Express.js for the web framework and MongoDB/Mongoose for data persistence, with emphasis on testing strategies and production deployment readiness.

### Replit Setup (October 2025)
- Configured to run on port 5000 with host 0.0.0.0 for Replit environment
- MongoDB 7.0.16 installed and running via system packages
- Startup script (start.sh) manages MongoDB daemon and Node.js server
- Environment variables configured via .env file and config.js
- Deployment configured for VM deployment target (maintains MongoDB state)
- Missing bcrypt dependency added to package.json

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Structure

**MVC Pattern**: Both applications follow the Model-View-Controller architecture:
- **Models**: Define database schemas and data access methods using Mongoose ODM
- **Controllers**: Handle business logic and coordinate between models and views
- **Routes**: Map HTTP endpoints to controller methods
- **Views** (node-unit-test only): Handlebars templates for server-side rendering

**Rationale**: MVC separation provides clear organization, making code easier to test, maintain, and scale. It separates data concerns from presentation logic.

### Authentication & Session Management

**Session-based authentication** using `express-session` with MongoDB session store (`connect-mongo`):
- Sessions persist in MongoDB, allowing sessions to survive server restarts
- Password hashing with `bcrypt` (10 salt rounds)
- Middleware-based route protection (`checkAuth.js`) distinguishing public vs. private routes

**Rationale**: Session-based auth is simpler than JWT for server-rendered applications. Storing sessions in MongoDB prevents memory bloat and enables horizontal scaling.

### Testing Strategy

**Unit testing with Jest and Sinon**:
- Jest as the test runner and assertion library
- Sinon for creating stubs/mocks of database operations
- Focus on testing controllers in isolation by stubbing model methods

**Rationale**: Mocking database calls allows tests to run fast without requiring a live database, making them suitable for CI/CD pipelines. Sinon provides fine-grained control over mock behavior.

### Environment Configuration

**dotenv pattern for environment variables**:
- `.env` file for local development (not committed to version control)
- `config.js` centralizes environment variable access with fallback defaults
- Pre-loading via `-r dotenv/config` flag in npm scripts

**Rationale**: Separating configuration from code prevents accidental exposure of secrets and enables different configs per environment (dev/staging/prod).

### Form Validation

**express-validator** for server-side input validation:
- Validation rules defined in `validators.js`
- Separate validators for registration, login, and post creation
- Custom validators for password confirmation matching

**Rationale**: Centralized validation logic reduces code duplication and ensures consistent error handling across endpoints.

### View Layer (node-unit-test)

**Handlebars templating** with `express-handlebars`:
- Layouts and partials for reusable UI components
- Custom helpers for date formatting (moment.js) and text preview
- Flash messages via `connect-flash` for user feedback

**Rationale**: Server-side rendering simplifies the stack by eliminating need for a separate frontend framework, suitable for content-focused applications.

## External Dependencies

### Database

**MongoDB** with **Mongoose ODM**:
- Local MongoDB (development): `mongodb://localhost:27017/logindb`
- MongoDB Atlas (production): Connection string via environment variable
- Mongoose schemas enforce data structure and validation

**Connection Pattern**: Single connection module (`models/connection.js`) exported and reused across all models to maintain one connection pool.

### Third-party Services

**MongoDB Atlas**: Cloud-hosted MongoDB for production deployment
- Shared cluster (free tier)
- Whitelisted IP addresses for network access control
- Connection URI includes credentials and database name

**Heroku**: Platform-as-a-Service for application deployment
- Uses `Procfile` to specify startup command
- Environment variables configured via Heroku dashboard
- Automatic deployment via Git push

### Key npm Packages

**Production Dependencies**:
- `express`: Web framework
- `mongoose`: MongoDB ODM (v5.9.6 in node-unit-test, v6.0.12 in node-unit-mvc)
- `express-session`: Session middleware
- `connect-mongo`: MongoDB session store
- `bcrypt`: Password hashing
- `express-validator`: Request validation
- `express-handlebars`: Template engine
- `body-parser`: Request body parsing
- `connect-flash`: Flash message middleware
- `moment`: Date/time formatting

**Development Dependencies**:
- `jest`: Testing framework
- `sinon`: Mocking/stubbing library
- `supertest`: HTTP assertion library
- `nodemon`: Auto-restart development server
- `dotenv`: Environment variable loader

### Port Configuration

- **node-unit-mvc**: Port 9090 (hardcoded)
- **node-unit-test**: Port 5000 default, configurable via `process.env.PORT` for Heroku compatibility