# Makeup E-Commerce Platform

Full-stack e-commerce application built with Spring Boot and React.
The platform supports secure user authentication, product browsing, and order management.

## Tech Stack

Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- MySQL

Frontend
- React
- TypeScript

## Features

- Secure user registration and login using JWT authentication
- Product catalog with REST API integration
- Role-based authorization for protected endpoints
- Structured backend architecture (Controller → Service → Repository)
- API communication between React frontend and Spring Boot backend

## Architecture

```mermaid
flowchart TD

A[React Client]
B[Spring Boot REST API]
C[Authentication Layer - Spring Security + JWT]
D[Controller Layer - Product / User / Order Controllers]
E[Service Layer - Business Logic]
F[Repository Layer - JPA / Hibernate]
G[MySQL Database]

A --> B
B --> C
C --> D
D --> E
E --> F
F --> G
```

Authentication is handled using Spring Security with JWT tokens.

## API Examples

POST /api/auth/login  
Authenticates the user and returns a JWT token.

GET /api/makeup/getAll 
Returns the list of available products.

POST /api/makeup/addComment
Updates the database adding a comment to the specified makeup id.

POST /shoppingBag/addToBag
Updates the database adding the product to the shopping bag with the provided id.

## Screenshots

Login Page
<img width="1919" height="842" alt="Screenshot 2026-03-10 184008" src="https://github.com/user-attachments/assets/2d56d042-cfcf-4afe-b017-de587893ea6c" />

Home Page
<img width="1919" height="833" alt="Screenshot 2026-03-10 184026" src="https://github.com/user-attachments/assets/00514e05-5ca8-441c-83a9-4cecd4d567ad" />

Product Page
<img width="1919" height="826" alt="Screenshot 2026-03-10 184044" src="https://github.com/user-attachments/assets/5259d023-a23f-4b48-99ea-f3f273182fb7" />

Review Section
<img width="1477" height="344" alt="Screenshot 2026-03-10 184113" src="https://github.com/user-attachments/assets/87f5de32-3b78-47e2-9558-aa366791297b" />

Shopping Cart Section
<img width="530" height="636" alt="Screenshot 2026-03-10 184133" src="https://github.com/user-attachments/assets/82ef7faa-470c-430a-bd16-2ff426ff264f" />

## Future Improvements

- Payment integration
- Order tracking
- Product search and filtering
