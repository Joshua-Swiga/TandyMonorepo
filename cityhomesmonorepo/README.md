
# City Homes

**City Homes** is a web-based platform designed to manage home and property rentals, similar to Airbnb. This system allows users to list, browse, book, and manage rental units efficiently. The platform is built using modern web technologies, including Laravel for the backend, Angular for the frontend, and PostgreSQL as the database management system.

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Structure](#system-structure)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Database Schema](#database-schema)
6. [Key Functionalities](#key-functionalities)
7. [API Endpoints](#api-endpoints)
8. [Testing](#testing)
9. [Issues Encountered & Solutions](#issues-encountered--solutions)
10. [Recommendations for Future Development](#recommendations-for-future-development)

## Project Overview

City Homes is designed to facilitate the management of rental properties by providing an easy-to-use interface for both property owners and renters. The system supports functionalities such as property listing, booking, and management, as well as handling various aspects like amenities, locations, and booking statuses.


## System Structure

The system is structured around a Model-View-Controller (MVC) architecture, with the backend and frontend being developed separately to allow for scalability and maintainability.

### Backend
- **Framework:** Laravel
- **Database:** PostgreSQL
- **APIs:** RESTful API for frontend-backend communication

### Frontend
- **Framework:** Angular
- **UI Components:** Bootstrap for responsive design

### Deployment
- **Environment:** Ubuntu server with Nginx for web server and PM2 for process management

## Technologies Used

- **Laravel:** PHP framework for the backend
- **Angular:** JavaScript framework for the frontend
- **PostgreSQL:** Relational database management system
- **Bootstrap:** Frontend framework for responsive design
- **Docker:** Containerization for development and deployment
- **Nginx:** Web server for serving the application
- **PM2:** Process manager for Node.js applications, used to keep the server running

## Installation

### Prerequisites

- PHP 8.x
- Node.js 16.x
- PostgreSQL 13.x
- Composer
- Angular CLI
- Docker (Optional)

### Backend (Laravel)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cityhomes-backend.git
   cd cityhomes-backend
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Set up the environment:**
   - Copy `.env.example` to `.env` and configure your environment variables (e.g., database connection).

4. **Run migrations:**
   ```bash
   php artisan migrate
   ```

5. **Serve the application:**
   ```bash
   php artisan serve
   ```

### Frontend (Angular)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cityhomes-frontend.git
   cd cityhomes-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Serve the application:**
   ```bash
   ng serve
   ```

### Docker (Optional)

For a more streamlined development environment, you can use Docker to containerize the application.

1. **Build and run the containers:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Backend: `http://localhost:8000`
   - Frontend: `http://localhost:4200`

## Database Schema

The database is designed to handle various aspects of property management, including users, units, images, amenities, booking statuses, locations, and queries. The `name` field serves as a foreign key across multiple tables to maintain data integrity.

### Key Tables

1. **Users**
   - `id`, `name`, `email`, `password`, `role`, etc.

2. **Units**
   - `id`, `name`, `description`, `price`, `location_id`, etc.

3. **Unit Images**
   - `id`, `unit_id`, `image_path`

4. **Amenities**
   - `id`, `unit_id`, `amenity_name`

5. **Booking Status**
   - `id`, `unit_id`, `status`, `booking_date`

6. **Locations**
   - `id`, `name`, `description`

7. **Queries**
   - `id`, `user_id`, `unit_id`, `query_text`

## Key Functionalities

1. **User Authentication**
   - User registration and login
   - Role-based access control

2. **Property Management**
   - Listing of units with details like price, amenities, and images
   - CRUD operations for managing properties

3. **Booking Management**
   - Users can book available units
   - Owners can approve or reject bookings

4. **Search and Filter**
   - Search units by location, price, and amenities
   - Advanced filtering options

5. **Query Management**
   - Users can submit queries related to units
   - Admin can manage and respond to queries

## API Endpoints

Here are some of the essential API endpoints provided by the backend:

- **User Registration:** `POST /api/register`
- **User Login:** `POST /api/login`
- **Get All Units:** `GET /api/units`
- **Create a Unit:** `POST /api/units`
- **Update a Unit:** `PUT /api/units/{id}`
- **Delete a Unit:** `DELETE /api/units/{id}`
- **Booking a Unit:** `POST /api/bookings`
- **Get Booking Status:** `GET /api/bookings/{id}`
- **Submit a Query:** `POST /api/queries`

## Testing

### Unit Tests

Laravel comes with PHPUnit for testing backend logic. To run tests, use:

```bash
php artisan test
```

### End-to-End Tests

End-to-end tests can be performed using tools like Protractor for Angular. To run tests, use:

```bash
ng e2e
```

## Issues Encountered & Solutions

1. **Database Relationships:**
   - **Issue:** Complex relationships between units, images, and amenities.
   - **Solution:** Implemented cascading deletes and proper foreign key constraints to ensure data integrity.

2. **API Performance:**
   - **Issue:** Slow response times due to complex queries.
   - **Solution:** Optimized queries and added indexes to critical fields in the PostgreSQL database.

3. **Frontend Integration:**
   - **Issue:** Integration issues between Angular and Laravel APIs.
   - **Solution:** Standardized API responses and utilized Angular services for smooth communication.

## Recommendations for Future Development

1. **Mobile Application:**
   - Develop a mobile application using Kotlin or Flutter, leveraging the existing backend.

2. **Payment Gateway Integration:**
   - Integrate payment gateways such as M-Pesa or Stripe for handling bookings and payments.

3. **Advanced Search Filters:**
   - Implement more advanced filters for users to find properties that meet specific criteria.

4. **Review and Rating System:**
   - Allow users to leave reviews and ratings for properties to enhance trust and transparency.

5. **Automated Testing:**
   - Increase test coverage by implementing more unit and integration tests, especially for critical features.

---

This README provides a detailed overview of the City Homes project, covering its structure, functionalities, and future recommendations. It serves as a guide for developers and contributors to understand and enhance the system effectively.
