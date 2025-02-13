# Swift Courier: Courier Service Application

Swift Courier is a web application built with the PERN stack (PostgreSQL, Express, React, Node.js) and TypeScript that allows users to create, track, and manage shipments. It features user registration, login, shipment creation, tracking, a user dashboard, and an admin dashboard with the ability to manage all shipments and update their status.

## Features

- **User Registration:** Users can register with an email address and password, along with additional client information (name, address, phone number).
- **User Login:** Registered users can log in securely using their email and password.
- **Shipment Creation:** Authenticated users can create shipments, providing recipient details, shipment information (weight, dimensions, details), and sender information (derived from the user's profile).
- **Shipment Tracking:** Users can track shipments using a unique tracking number. The tracking page supports both direct URL access with the tracking number and manual entry.
- **User Dashboard:** Authenticated users have a dashboard to view and manage their shipments (list, track).
- **Admin Dashboard:** Admin users have a dashboard to view _all_ shipments, update shipment statuses, and delete shipments (soft delete).
- **Soft Delete:** Shipments are not permanently deleted; they are marked as deleted, allowing for recovery and auditing.
- **Authentication:** JWT-based authentication protects sensitive routes.
- **Authorization:** Role-based authorization (client and admin roles) restricts access to certain features.
- **Responsive UI:** Built with shadcn/ui and Tailwind CSS for a modern and responsive user interface.

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Zustand (state management)
  - React Router (routing)
  - Axios (API requests)
  - shadcn/ui (UI components)
  - Tailwind CSS (styling)
- **Backend:**
  - Node.js
  - Express.js
  - TypeScript
  - PostgreSQL (database)
  - Prisma (ORM)
  - JWT (JSON Web Tokens - authentication)
  - bcrypt (password hashing)
  - express-validator (request validation)
  - uuid (for generating unique tracking numbers)
  - dotenv (environment variables)
  - cors (Cross-Origin Resource Sharing)

## Project Structure

```
courier-app/
├── backend/  <-- Server-side logic (Node.js/Express)
│   ├── src/  <-- All backend source code
│   │   ├── controllers/  <-- Handles incoming requests, interacts with services/database, sends responses
│   │   │   ├── auth.controller.ts   <-- Authentication-related logic (login, registration, etc.)
│   │   │   ├── shipment.controller.ts <-- Shipment-related logic (creation, tracking, updating, etc.)
│   │   │   └── user.controller.ts    <-- User management logic (profile updates, etc.)
│   │   ├── routes/       <-- Defines API endpoints (URLs) and maps them to controller functions
│   │   │   ├── auth.routes.ts      <-- Routes for authentication (e.g., /api/auth/login)
│   │   │   ├── shipment.routes.ts   <-- Routes for shipments (e.g., /api/shipments)
│   │   │   └── user.routes.ts       <-- Routes for user management (e.g., /api/users)
│   │   ├── middleware/   <-- Functions that run before or after request handling (e.g., authentication, error handling)
│   │   │   ├── authMiddleware.ts    <-- Verifies user authentication (e.g., checks JWT tokens)
│   │   │   └── errorMiddleware.ts   <-- Handles errors globally (e.g., sends 404, 500 responses)
│   │   ├── config/       <-- Configuration files
│   │   │   └── prisma.ts       <-- Prisma client instance setup (database connection)
│   │   ├── utils/        <-- Helper functions used across the backend
│   │   │   └── auth.ts          <-- Authentication-related utilities (e.g., password hashing)
│   │   ├── app.ts        <-- Main Express application setup (middleware, routes, error handling)
│   │   └── server.ts     <-- Starts the server (listens for connections)
│   ├── package.json      <-- Node.js project metadata (dependencies, scripts, etc.)
│   ├── package-lock.json <-- Records exact versions of dependencies for consistent installs
│   ├── prisma/           <-- Prisma-related files (database schema, migrations)
│   │   ├── schema.prisma   <-- Defines the database schema (tables, relationships)
│   │   └── migrations/     <-- Contains database migration scripts (changes to the schema over time)
│   │       ├── ... (migration folders) ...
│   │       └── migration_lock.toml <-- Ensures migrations are applied in the correct order
│   └── .env              <-- Environment variables (e.g., database credentials, API keys)

├── frontend/ <-- Client-side logic (React application)
│   ├── public/           <-- Static assets (e.g., images, icons) served directly
│   │   └── vite.svg      <-- Example static asset (Vite logo)
│   ├── src/              <-- All frontend source code
│   │   ├── components/   <-- Reusable UI components
│   │   │   ├── common/       <-- Components used in multiple parts of the application
│   │   │   │   └── ErrorMessage.tsx  <-- Displays error messages
│   │   │   ├── dashboard/     <-- Components specific to the dashboard section
│   │   │   │    └── StatusBadge.tsx     <-- Displays the status of a shipment.
│   │   │   ├── ui/           <-- Presentational components (building blocks of the UI)
│   │   │   │   ├── ... (various UI components like buttons, inputs, etc.) ...
│   │   │   └── ProtectedRoute.tsx <-- Component to protect routes that require authentication
│   │   ├── pages/        <-- Top-level components that correspond to routes (views)
│   │   │    ├── Auth/         <-- Authentication-related pages
│   │   │    │    ├── ... (Login, SignUp components and CSS) ...
│   │   │    ├── Dashboard/    <-- Dashboard-related pages
│   │   │    │    ├── ... (AdminDashboard, CreateShipment, etc.) ...
│   │   │    ├── Home/
│   │   │    │    ├── ... (Home components and CSS)
│   │   │    ├── Tracking/
│   │   │    │    ├── ... (Tracking components and CSS)
│   │   │    └── Unauthorized.tsx <-- Shown when a user tries to access a restricted page
│   │   ├── services/     <-- Handles communication with the backend API
│   │   │   ├── authService.ts    <-- API calls for authentication
│   │   │   └── shipmentService.ts <-- API calls for shipments
│   │   ├── store/        <-- Application state management (Zustand stores)
│   │   │   ├── useAuthStore.ts   <-- Manages authentication state (user info, login status)
│   │   │   └── useShipmentStore.ts<-- Manages shipment-related state
│   │   ├── layouts/       <-- Layout components that wrap pages (e.g., navigation, headers)
│   │   │   ├── AuthLayout.tsx <-- Layout for authentication pages
│   │   │   └── DashLayout.tsx <-- Layout for dashboard pages
│   │   ├── types/         <-- TypeScript type definitions
│   │   │   └── index.ts    <-- Main file for type definitions
│   │   ├── assets/        <-- Images, SVGs, or other static assets used within components
│   │   │   ├── react.svg      <-- Example asset
│   │   │   └── ship_img.jpg   <-- Example image
│   │   ├── hooks/           <-- Custom React hooks for reusable logic
│   │   │    └── use-toast.ts    <-- Example: Hook for displaying toast notifications
│   │   ├── lib/            <-- Utility functions specific to the frontend
│   │   │    └── utils.ts       <-- Frontend utility functions
│   │   ├── App.tsx         <-- Main application component (root of the component tree)
│   │   ├── App.css         <-- Global CSS styles for the application
│   │   ├── main.tsx        <-- Entry point for the React application (renders App.tsx)
│   │   ├── index.css      <-- Global CSS (often used for resets, base styles)
│   │   └── vite-env.d.ts  <-- TypeScript definitions for Vite environment variables
│   ├── package.json         <-- Frontend project metadata
│   ├── package-lock.json    <-- Records exact frontend dependency versions
│   ├── components.json      <-- Configuration file (often used by UI libraries like Shadcn UI)
│   ├── eslint.config.js     <-- ESLint configuration for code linting
│   ├── index.html           <-- Main HTML file (entry point for the browser)
│   ├── tsconfig.*.json      <-- TypeScript configuration files
│   ├── vite.config.ts       <-- Vite configuration file (build settings, plugins, etc.)
│   ├── README.md
│   ├── Sample.md
│   └── .env                 <-- Frontend environment variables (e.g., API base URL)

└── README.md  <-- Project documentation (top-level)
```

## Setup and Installation

**Prerequisites:**

- Node.js (LTS version recommended) and npm (or yarn) installed.
- PostgreSQL installed and running. See the "PostgreSQL Setup (Ubuntu)" section below for detailed instructions.
- A code editor (VS Code recommended).

**Steps:**

1.  **Clone the Repository:**

    ```bash
    git clone <your-repository-url>
    cd courier-app
    ```

2.  **Backend Setup:**

    - **Install Dependencies:**

      ```bash
      cd backend
      npm install
      ```

    - **Configure Environment Variables:**
      Create a `.env` file in the `backend` directory and add the following, replacing the placeholder values with your actual credentials:

      ```
      DATABASE_URL="postgresql://your_app_user:your_app_password@localhost:5432/your_app_db?schema=public"
      JWT_SECRET=yourverysecretkey
      PORT=5000
      ```

      - **`DATABASE_URL`:** Your PostgreSQL connection string (see PostgreSQL setup).
      - **`JWT_SECRET`:** A strong, secret key for JWT signing (keep this _very_ secure).
      - **`PORT`:** The port the backend server will run on (default is 5000).

    - **Initialize Prisma:**

      ```bash
      npx prisma init --datasource-provider postgresql
      ```

    - **Define Prisma Schema:**
      Edit `backend/prisma/schema.prisma` to match the following schema:

      ```prisma
      // backend/prisma/schema.prisma
      generator client {
        provider = "prisma-client-js"
      }

      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }

      model User {
        id           Int      @id @default(autoincrement())
        email        String   @unique
        password     String
        name         String?
        address      String?
        phone_number String?
        role         String   @default("client")
        created_at   DateTime @default(now())
        shipments    Shipment[] // Relationship: One-to-many with Shipment
      }

      model Shipment {
        id               Int      @id @default(autoincrement())
        user             User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
        user_id          Int
        tracking_number  String   @unique
        sender_name      String?
        sender_address   String?
        recipient_name   String
        recipient_address String
        shipment_details String?
        weight           Decimal?
        dimensions       String?
        status           String   @default("Pending")
        created_at       DateTime @default(now())
        updated_at       DateTime @default(now())
        deleted_at       DateTime?
      }
      ```

    - **Run Prisma Migrations:**

      ```bash
      npx prisma migrate dev --name init
      npx prisma generate
      ```

3.  **Frontend Setup:**

    - **Install Dependencies:**

      ```bash
      cd ../frontend
      npm install
      ```

    - **Configure Environment Variables:**
      Create a `.env` file in the `frontend` directory and add the following:

      ```
      REACT_APP_API_BASE_URL=http://localhost:5000/api
      ```

      This points the frontend to your backend server. Adjust the URL if your backend runs on a different port or host.

4.  **Run the Application:**

    - **Start the Backend:**

      ```bash
      cd ../backend
      npm run dev  # Or your custom start script (e.g., using ts-node-dev)
      ```

    - **Start the Frontend:**

      ```bash
      cd ../frontend
      npm start
      ```

    The application should now be running. The frontend will typically be accessible at `http://localhost:3000`, and the backend at `http://localhost:5000`.

## PostgreSQL Setup (Ubuntu)

1.  **Install PostgreSQL:**

    ```bash
    sudo apt update
    sudo apt install postgresql postgresql-contrib
    sudo systemctl status postgresql  # Verify it's running
    ```

2.  **Change `postgres` User Password (Important):**

    ```bash
    sudo -i -u postgres
    psql
    ALTER USER postgres WITH PASSWORD 'your_strong_postgres_password';
    \q
    exit
    ```

3.  **Create Database and User:**

    ```bash
    sudo -i -u postgres
    psql
    CREATE USER your_app_user WITH PASSWORD 'your_app_password';
    CREATE DATABASE your_app_db WITH OWNER your_app_user;
    \q
    exit
    ```

    Replace `your_app_user`, `your_app_password`, and `your_app_db` with your desired values.

## API Endpoints

| Method | Endpoint                    | Description                                   | Protected | Roles         |
| ------ | --------------------------- | --------------------------------------------- | --------- | ------------- |
| POST   | `/api/auth/register`        | Register a new user.                          | No        |               |
| POST   | `/api/auth/login`           | Log in an existing user.                      | No        |               |
| POST   | `/api/shipments`            | Create a new shipment.                        | Yes       | client, admin |
| GET    | `/api/shipments/track/:id`  | Track a shipment by tracking number.          | No        |               |
| GET    | `/api/shipments/user`       | Get all shipments for the logged-in user.     | Yes       | client, admin |
| GET    | `/api/shipments/all`        | Get all shipments (admin only).               | Yes       | admin         |
| PUT    | `/api/shipments/:id/status` | Update the status of a shipment (admin only). | Yes       | admin         |
| DELETE | `/api/shipments/:id`        | Soft-delete a shipment (admin only).          | Yes       | admin         |

## Code Overview

- **`backend/`:** Contains the Node.js/Express backend.

  - **`controllers/`:** Handles request logic, interacts with Prisma, and sends responses.
  - **`routes/`:** Defines the API endpoints and maps them to controller functions.
  - **`middleware/`:** Contains middleware for authentication (`authMiddleware.ts`), error handling (`errorMiddleware.ts`), and potentially other middleware.
  - **`config/`:**
    - **`prisma.ts`:** Creates and exports the Prisma client instance.
  - **`utils/`:** Contains utility functions like password hashing (`auth.ts`).
  - **`app.ts`:** Sets up the Express application, middleware, and routes.
  - **`server.ts`:** Starts the server.
  - **`prisma/schema.prisma`:** Defines the database schema in Prisma's declarative language.

- **`frontend/`:** Contains the React frontend.
  - **`components/`:** Contains React components, organized by feature.
  - **`services/`:** Contains functions for making API requests to the backend.
  - **`store/`:** Contains Zustand stores for managing global state.
  - **`types.ts`:** Defines TypeScript interfaces.
  - **`App.tsx`:** The main application component, including routing.
  - **`ProtectedRoute.ts`:** A component for protecting routes that require authentication.
