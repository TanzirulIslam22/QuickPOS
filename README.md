# QuickPOS — Super Shop POS System

A Minimum Viable Product (MVP) for a Super Shop Point of Sale (POS) system built for **CSE 3206 – Software Engineering Sessional, Lab 2**.

**Team:** Group#08 (Section-A 2nd 30) — Tanzirul Islam, Shuvo, Ruan
**Process Model:** Incremental Development
**Suggested Model from assignment:** Incremental ✓

---

## Project Overview

QuickPOS helps a small super shop manage its everyday billing and stock.

Core features:

- **Login** — staff authentication (`admin` / `1234`)
- **Products** — add, view, delete products with price & stock
- **Billing (POS)** — add items to cart, compute total
- **Cash handling** — record amount paid by customer and calculate change to return
- **Sales history** — every past bill with total, paid & change
- **Demo seed data** — one-click sample products

## Tech Stack

| Layer    | Technology                     |
| -------- | ------------------------------ |
| Frontend | React + Vite + Tailwind CSS    |
| Backend  | Node.js + Express              |
| Database | MongoDB (Mongoose)             |
| Git      | GitHub, feature branches + PRs |

## Project Structure

```
QuickPOS/
├── client/            # React frontend (src/)
├── server/            # Express + MongoDB backend
├── docs/              # Reports, workflow & todo
├── assets/            # Design assets
├── screenshots/       # App screenshots for report
└── README.md
```

## How to Run

### Backend

```bash
cd server
npm install
cp .env.example .env        # set MONGO_URI
npm run seed-data           # optional: GET /api/seed
npm run dev                 # http://localhost:5000
```

### Frontend

```bash
cd client
npm install
npm run dev                 # http://localhost:5173
```

Login with `admin` / `1234`.

## API Endpoints

| Method | Endpoint          | Purpose                        |
| ------ | ----------------- | ------------------------------ |
| GET    | /api/products     | List all products              |
| POST   | /api/products     | Add product                    |
| PUT    | /api/products/:id | Update product                 |
| DELETE | /api/products/:id | Delete product                 |
| GET    | /api/sales        | Sales history (latest 50)      |
| POST   | /api/sales        | Checkout `{items, paidAmount}` |

## Lab 2 Deliverables

- Source code (this repo)
- Feature branches + Pull Requests (see `docs/TEAM_WORKFLOW.md`)
- Project Design Report → `docs/Project_Design_Report.tex` ➜ `docs/Requirement_Report.pdf`
- MVP demonstration

## Team

- Tanzirul Islam
- Shuvo
- Ruan

## Module

CSE 3206 Lab 2 — QuickPOS
