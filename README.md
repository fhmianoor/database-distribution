# 🛒 Distributed E-Commerce System with PostgreSQL, MongoDB, and Redis

This project is a **small-scale distributed database system** that integrates multiple database technologies to handle structured, semi-structured, and fast-access data. Built using **Node.js (Express)** and **Docker**, the system simulates an e-commerce backend with products, metadata, and stock info.

## 📌 Features

- ✅ Structured data with **PostgreSQL (Citus)**
- ✅ Semi-structured product metadata with **MongoDB**
- ✅ Fast-access stock data using **Redis**
- ✅ REST API with **Express**
- ✅ Seed script to populate sample data
- ✅ Dockerized environment with `docker-compose`

---

## 📦 Tech Stack

| Component     | Description                                      |
|---------------|--------------------------------------------------|
| PostgreSQL    | Relational DB with Citus for sharding & scaling |
| MongoDB       | Document-based DB for product metadata           |
| Redis         | In-memory store for stock quantity               |
| Express.js    | Backend API                                       |
| Docker        | Containerization                                 |

---

## 📂 Folder Structure
database-distribution/
├── src/
│ ├── db/ # Database configs (Postgres, Mongo, Redis)
│ ├── routes/ # Express routes
│ ├── seed/ # Seeder scripts
│ └── index.js # Main server file
├── .env # Environment variables
├── docker-compose.yml # Docker setup
└── README.md

## 🚀 Getting Started

### 1. Clone & Setup

```bash
git clone https://github.com/fhmianoor/database-distribution.git
cd distributed-ecommerce
cp .env.example .env
```

### 2. Run with Docker

```bash
docker-compose up --build
```
**Check running containers**
```bash
docker ps
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Seeder

```bash
node src/seed/seed.js
```


## 🌐 API Endpoints
**GET /api/products**
🌐 API Endpoints
GET /api/products
**Returns full product list with:**
**1. Basic info (from PostgreSQL)**
**2. Metadata (from MongoDB)**
**3. Stock (from Redis)**
 ```json
[
  {
    "id": 1,
    "name": "Laptop A",
    "price": "1200",
    "metadata": {
      "description": "High-performance laptop",
      "tags": ["electronics", "laptop"],
      "specifications": { "ram": "16GB", "cpu": "Intel i7" }
    },
    "stock": "15"
  },
  ...
]
```
## Accessing Databases via CLI
**PostgreSQL**
```bash
docker exec -it database-distribution-postgres-1 psql -U postgres -d ecommerce
```
***MongoDB**
```bash
docker exec -it database-distribution-mongo-1 mongosh
use ecommerce
db.productmetas.find().pretty()
```
**Redis**
```bash
docker exec -it database-distribution-redis-1 redis-cli
GET stock:1
```

## 💡 Notes on FDW
*This project implements manual data integration via the app layer. FDW (mongo_fdw) is not included because it's not supported by default in the citusdata/citus:11.3 image.*

## 📑 Objective Checklist

| Objective                                                    | Status |
| ------------------------------------------------------------ | ------ |
| Distributed data storage and retrieval                       | ✅ Yes  |
| Integration of multiple database technologies                | ✅ Yes  |
| Redis used for fast-access data                              | ✅ Yes  |
| Handling structured (PostgreSQL) & semi-structured (MongoDB) | ✅ Yes  |

## 👨‍💻 Author
**Muhamad Fahmi Aulia Noor**
*Distributed Data Processing - Final Project*
*June 2025*
