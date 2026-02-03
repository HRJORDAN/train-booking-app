# Train Booking App (MERN + MySQL + Docker)

A simple, containerized Train Booking System. It uses **React** for the frontend, **Node.js/Express** for the backend, and **MySQL** for the database. Everything runs inside **Docker**, so you don't need to install MySQL or Node locally.

---

## Prerequisites

Before starting, make sure you have:

1. **Docker Desktop** installed and running → [Download here](https://www.docker.com/products/docker-desktop/)
2. **Git** installed

---

## How to Run

### 1. Clone the Repository

Open your terminal (or VS Code terminal) and run:

```bash
git clone https://github.com/HRJORDAN/train-booking-app.git
```

### 2. Enter the Project Folder

```bash
cd train-booking-app
```

### 3. Start the App

This single command builds and starts the **Frontend**, **Backend**, and **Database** all at once:

```bash
docker-compose up --build
```

### 4. Open the Application

Once you see `Server running...` or `ready for connections` in the terminal, open your browser:

| Service       | URL                      |
|---------------|--------------------------|
| Frontend   | http://localhost:5173     |
| Backend API| http://localhost:5000     |

---

## Database Access (Optional)

The database is **automatically created** on startup. If you want to inspect the data using a tool like **MySQL Workbench** use these credentials:

| Setting  | Value           |
|----------|-----------------|
| Host     | `127.0.0.1`     |
| Port     | `3307`          |
| Username | `root`          |
| Password | `password`      |
| Database | `train_db`      |

> Port `3307` is used to avoid conflicts if MySQL is already running on your machine.

---

## How to Stop

**Pause the app:**
```bash
Ctrl + C
```

**Remove containers completely:**
```bash
docker-compose down
```

---