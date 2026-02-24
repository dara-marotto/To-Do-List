#  To-Do List API

![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![Docker](https://img.shields.io/badge/docker-enabled-blue)
![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 📌 About the Project
This project was built to put into practice my recent studies in API development.

It demonstrates a complete backend setup with modern tools and best practices, including authentication, caching, and containerization.

## ✨ Features
-  Containerization with Docker  
-  Database integration using TypeORM  
-  Authentication with JWT tokens  
-  Password hashing using bcrypt  
-  Data caching with Redis  
-  Logging interceptor using NestJS native logger  
-  Email validation using custom decorators  
-  Data filtering via query parameters  

## 🛠️ Technologies Used
- [NestJS](https://docs.nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/current/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)
- [TypeORM](https://docs.nestjs.com/techniques/database#typeorm-integration)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## 📋 Requirements
- Docker (version 29.2.1 or higher)

## ▶️ Starting de project 

### 1. Clone the repository
```bash
git clone https://github.com/vegetats/To-Do-List.git
```
### 2. Navigate to the project folder
```bash
cd To-Do-List
```
### 3. Run the project
```bash
docker compose up
```

## 🧪 API Testing

You can test all endpoints using my [Postman collection](https://dara-m-8555036.postman.co/workspace/Dara's-Workspace~10043cbe-dfd9-4c36-80bb-facc0a8a6b35/collection/48146023-8f1e3055-e31b-4e5e-9f76-40928189acd5?action=share&creator=48146023).

## Diagrama de Fluxo da API

```mermaid
flowchart TD

A[Request] --> B{Route}

B -->|POST, PATCH /users| U1[Validate DTO]
B -->|DELETE, GET /users| U6[Controller -> Service]

U1 --> U2[Validate unique email]
U2 --> |Yes| U3[Validate password]
U2 --> |No| J1[Mismatch message]
U3 --> U4[Hash password]
U4 --> U6
U6 --> |GET| G2[Search in Cache]
U6 --> |POST, PATCH, DELETE| U7[Save on DB]
U7 --> U8[Clean Cache]
U8 --> R1[Response]

B -->|HTTP req. /tasks| T1[Auth Guard]

T1 --> T2{Validate JWT Token}
T2 -->|No| E1[401 - Unauthorized]
T2 -->|Yes| T3[Controller -> Service]
T3 --> |GET| TG4[Search in Cache]
T3 --> |POST,PATCH,DELETE|T4[Save on DB]
T4 --> T5[Clean Cache]
T5 --> R2[Response]


G2 --> G3{Cache}
G3 -->|Yes| G4[Return cache]
G3 -->|No| G5[Search on DB]
G5 --> G6[Save Cache]
G6 --> G7[Return data]



TG4 --> TG5{Cache}
TG5 -->|Yes| TG6[Return cache]
TG5 -->|No| TG7[Search on DB]
TG7 --> TG8[Save Cache]
TG8 --> TG9[Return data]
```

