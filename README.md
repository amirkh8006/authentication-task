# 📱 NestJS OTP Authentication Service

A secure and scalable authentication microservice built with **NestJS**, supporting phone number verification via **OTP (One-Time Password)**. The service is fully Dockerized, uses **Redis** for temporary OTP storage, and **MongoDB** for user data persistence. All API routes are documented using **Swagger**.

---

## 🚀 Features

- ✅ Phone-based authentication using OTP
- ✅ JWT-based session handling
- ✅ OTPs stored securely in Redis with expiration
- ✅ Swagger documentation for all routes
- ✅ Dockerized with Docker Compose
- ✅ MongoDB for persistent user storage

---

## 📦 Tech Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Cache / OTP Store**: [Redis](https://redis.io/)
- **API Docs**: [Swagger](https://swagger.io/)
- **Containerization**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)

---

### 📑 API Docs

Access all available routes via Swagger:

    http://localhost:3000/api-doc

---

## 🧠 Why MongoDB?

MongoDB provides a flexible document structure ideal for storing user-related data like phone numbers, preferences, login metadata, and future profile extensions. It’s a great fit for authentication services that may evolve and scale without strict relational constraints.

---

## 🐳 Docker Usage

### 🔧 Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### ▶️ Run the Application

```bash
docker-compose up --build
```