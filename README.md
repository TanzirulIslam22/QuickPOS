# QuickPOS — Super Shop POS System

A Minimum Viable Product (MVP) for a Super Shop Point of Sale (POS) system built for **CSE 3206 – Software Engineering Sessional, Lab 2**.

**Team:** Group#08 (Section-A 2nd 30) — Tanzirul Islam, Shuvo, Ruan
**Process Model:** Incremental Development
**Suggested Model from assignment:** Incremental ✓
**Assignment Scenario:** 18 — Super Shop POS System

---

## Project Overview

QuickPOS helps a small super shop manage its everyday billing and stock. The MVP was
delivered in four increments; the last one is this documentation set.

Core features actually present in `main`:
- **Login** — staff gate (`admin` / `1234`), session kept in `localStorage`
- **Products** — list, add and delete products with price and stock
- **Billing (POS)** — add items to the cart, change quantity, automatic total
- **Cash handling** — record the cash received, compute change to return, refuse the sale when cash is insufficient
- **Stock control** — the server re-validates stock and deducts it on a successful sale
- **Invoice** — printable itemised receipt (contributed by Shuvo in PR #3)
- **Sales history** — the most recent 50 completed sales
- **Demo seed data** — `GET /api/seed` populates the catalogue

Not built in this lab (carried in the report backlog): sales-summary dashboard, product
edit screen in the UI, and stock thresholds.

## Tech Stack

| Layer    | Technology                         |
|----------|------------------------------------|
| Frontend | React 18 + Vite + Tailwind CSS     |
| Backend  | Node.js + Express (port 5000)      |
| Database | MongoDB (Mongoose)                 |
| Git      | GitHub, feature branches + PRs     |

## Project Structure

The lab manual suggests a flat `src/` layout. QuickPOS keeps a frontend/backend split
instead, so the two deployable units can be run and reviewed independently.

```
QuickPOS/
├── client/            # React frontend (client/src/)
├── server/            # Express + MongoDB backend (server/)
│   ├── models/        # Product, Sale
│   ├── routes/        # productRoutes.js, saleRoutes.js
│   └── server.js      # app entry, /api/seed
├── docs/              # Requirement_Report.pdf, Project_Design_Report.tex, TEAM_WORKFLOW.md
├── assets/            # Design assets
├── screenshots/       # MVP screen captures used in the report
└── README.md
```

## How to Run

Run the two terminals side by side.

### Backend
```bash
cd server
npm install
cp .env.example .env        # set MONGO_URI
npm run dev                 # http://localhost:5000
```

Optional demo data, after the server is running:
```bash
curl http://localhost:5000/api/seed
```

### Frontend
```bash
cd client
npm install
npm run dev                 # http://localhost:5173
```

Login with `admin` / `1234`.

## API Endpoints

| Method | Endpoint           | Purpose                        |
|--------|--------------------|--------------------------------|
| GET    | /api/products      | List all products              |
| POST   | /api/products      | Add product                    |
| PUT    | /api/products/:id  | Update product (API only so far)|
| DELETE | /api/products/:id  | Delete product                 |
| GET    | /api/sales         | Sales history (latest 50)      |
| POST   | /api/sales         | Checkout `{items, paidAmount}` |
| GET    | /api/seed          | Populate the catalogue with demo products |

## Team Ownership

| Member                     | Branch                       | Delivered                                                        |
|----------------------------|------------------------------|------------------------------------------------------------------|
| Tanzirul Islam (Team Lead) | `tanzirul/mvp-base`, `tanzirul/report-lab2` | Server, models, routes, app shell, Login, Products, POS, cash/stock logic, sales history, documentation |
| Shuvo                      | `shuvo/category-receipt`     | Printable invoice module and checkout integration (PR #3)         |
| Ruan                       | `ruan/dashboard`             | Sales-summary increment, merged partially (PR #2); summary widget still in the backlog |

Full detail, including the PR table and commit history, is in the report.

## Collaboration

Branch naming, the pull-request review protocol and the merge rules the team followed are
documented in [`docs/TEAM_WORKFLOW.md`](docs/TEAM_WORKFLOW.md).

## Lab 2 Deliverables

- Source code (this repo)
- Feature branches + Pull Requests (see `docs/TEAM_WORKFLOW.md`)
- Project Design Report → `docs/Requirement_Report.pdf`
  (LaTeX source: `docs/Project_Design_Report.tex`)
- MVP demonstration → `screenshots/`