# BMAS Frontend

This is the React frontend application for the BMAS project, scaffolded with Vite and Tailwind CSS.

## Technologies Used
- **React 19**
- **Vite** (Build tool and dev server)
- **Tailwind CSS v4** (Utility-first CSS styling)
- **Axios** (HTTP client for API requests)
- **React Router Dom** (Client-side routing)

## Project Structure
- `src/components/`: Reusable global UI components.
- `src/pages/`: Main page views (e.g., Dashboard, Login, Admin Panel).
- `src/services/`: API client and services (using Axios) to communicate with the backend.
- `src/hooks/`: Custom React hooks.
- `src/context/`: Context APIs for global state management (e.g., AuthContext).
- `src/utils/`: Helper functions and utilities.
- `src/assets/`: Static assets (images, icons, styles).

## Setup & Run Instructions
1. Make sure Node.js is installed.
2. Navigate to `bmas_frontend` directory and install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build the application for production:
   ```bash
   npm run build
   ```
