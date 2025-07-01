# Blog Personal API - Express.js | Test

Welcome to the **Blog Personal** project developed with Express.js. This API is designed to manage blog article publishing, user management, categories, and comments, providing a complete and modern blogging system.

## Project Goals

* Allow users to create, read, update, and delete blog articles
* Manage users and their roles
* Organize articles by category
* Enable visitors to comment on articles
* Deliver a clean, maintainable, and high-performance API

## Main Features

* User authentication (JWT)
* CRUD operations for **Articles**
* CRUD operations for **Users**
* CRUD operations for **Comments**
* CRUD operations for **Categories**
* Server-side input validation
* Centralized error handling
* Pagination and filtering for articles
* Basic security (CORS, rate limiting, helmet, etc.)

## Database Tables

The API uses the following relational database tables:

* **User**

  * id
  * email
  * password (hashed)
  * name
  * role
  * created\_at

* **Article**

  * id
  * title
  * content
  * image
  * created\_at
  * updated\_at
  * category\_id (foreign key)
  * user\_id (foreign key, author)

* **Category**

  * id
  * name
  * description

* **Comment**

  * id
  * content
  * created\_at
  * user\_id (author)
  * article\_id (target)

## Technologies Used

* Node.js
* Express.js
* PostgreSQL (or another relational database)
* JWT for authentication
* bcrypt for password hashing
* dotenv for configuration
* (no ORM, manual SQL queries)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-user/blog-personal-expressjs.git
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
JWT_SECRET=...
```

4. Start the project:

```bash
npm run dev
```

## Testing

Unit and integration tests are planned using:

* Jest or Vitest
* Supertest

To run tests:

```bash
npm test
```

## Notes

* The Express.js backend does **not** use any ORM; all SQL queries are handled manually.
* Input validation and security are a priority to prevent XSS, SQL injection, and other vulnerabilities.
* This project is one of three separate repositories:

  * Laravel (PHP)
  * Express.js (Node)
  * Spring Boot (Java)

---
