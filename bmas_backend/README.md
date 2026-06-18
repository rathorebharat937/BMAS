# BMAS Backend

This is the Spring Boot backend application for the BMAS project.

## Technologies Used
- **Spring Boot 3.3.5**
- **Spring Data JPA** (Hibernate)
- **Spring Security**
- **PostgreSQL**
- **Lombok**
- **Maven**

## Project Structure
- `com.bmas.controller`: REST Controllers for handling API endpoints.
- `com.bmas.service`: Service layer containing business logic.
- `com.bmas.repository`: Spring Data repositories for database operations.
- `com.bmas.entity`: JPA Entities representing database tables.
- `com.bmas.dto`: Data Transfer Objects for API request/response payloads.
- `com.bmas.security`: Configurations, filters, and providers for Authentication & Authorization.
- `com.bmas.config`: General configuration classes.
- `com.bmas.exception`: Global custom exception handlers.
- `com.bmas.util`: Helper classes and utilities.

## Setup & Run Instructions
1. Make sure PostgreSQL is running and database `bmas_db` exists.
2. Update the database password in `src/main/resources/application.properties`.
3. Run the backend application from the `bmas_backend` directory:
   ```bash
   ./mvnw spring-boot:run
   ```
   Or using standard maven:
   ```bash
   mvn spring-boot:run
   ```
