# Bug Management and Assignment System (BMAS)

An enterprise-grade, role-based Bug Management and Assignment System designed to streamline software quality assurance workflows, automate task assignment, and track developer workloads.

## Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.3.5**
- **Spring Security 6** (Stateless JWT Authentication & BCrypt)
- **Spring Data JPA**
- **PostgreSQL Database**
- **Maven**

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Axios** (automatic Bearer JWT interception)
- **React Router Dom v7**

---

## Folder Structure

```text
BMAS/
├── bmas_backend/               # Spring Boot Application
│   ├── src/main/java/com/bmas/
│   │   ├── config/             # App Config
│   │   ├── controller/         # REST Controllers
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── entity/             # JPA Entities (User, Role)
│   │   ├── repository/         # JPA Repositories (UserRepository)
│   │   ├── security/           # JWT & Security filters
│   │   ├── service/            # Core business logic
│   │   └── util/               # Utility classes
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml                 # Maven POM file
│
├── bmas_frontend/              # React (Vite) Application
│   ├── src/
│   │   ├── api/                # Axios Configuration
│   │   ├── components/         # Guarded Routes & Shared Components
│   │   ├── context/            # AuthContext provider
│   │   ├── hooks/              # Custom useAuth hook
│   │   ├── pages/              # Workspace Dashboards & Pages
│   │   └── services/           # Service API calls
│   ├── index.html
│   ├── vite.config.js
│   └── package.json            # NPM configuration
│
└── README.md                   # Root Documentation
```

---

## Setup & Startup Instructions

### 1. Database Setup (PostgreSQL)
Ensure that PostgreSQL is installed and running on port `5432`.
1. Create a database named `bmas_db`:
   ```sql
   CREATE DATABASE bmas_db;
   ```
2. The database user settings can be updated in `bmas_backend/src/main/resources/application.properties`:
   - `spring.datasource.url=jdbc:postgresql://localhost:5432/bmas_db`
   - `spring.datasource.username=YOUR_POSTGRES_USERNAME`
   - `spring.datasource.password=YOUR_POSTGRES_PASSWORD`

### 2. Backend Startup
From the `bmas_backend/` directory:
1. Compile and build the project:
   ```bash
   mvn clean install
   ```
2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
The backend API server will listen on `http://localhost:8080`.

### 3. Frontend Startup
From the `bmas_frontend/` directory:
1. Install node dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
The client app will launch at `http://localhost:5173`.

---

## API Endpoints

### Authentication APIs (Public)
- **POST** `/api/auth/register` - Register a new member.
- **POST** `/api/auth/login` - Authenticate user and retrieve JWT.

### User Configuration APIs (Protected - Bearer JWT required)
- **POST** `/api/users/switch-role` - Switches the user's active role. Generates a new JWT with updated role context.

### Dashboard APIs (Protected - Bearer JWT required)
- **GET** `/api/tester/dashboard` - Restricted to `TESTER` role.
- **GET** `/api/developer/dashboard` - Restricted to `DEVELOPER` role.
- **GET** `/api/pm/dashboard` - Restricted to `PROJECT_MANAGER` role.
