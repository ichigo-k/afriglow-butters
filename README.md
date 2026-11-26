# AfriGlow Butters

A full-stack online shop for AfriGlow, a natural body-butter brand. Customers browse products, manage a cart, check out and pay with Paystack, then track their orders. Admins manage the catalogue and move orders through fulfilment.

## Features

**Customers**
- Sign up, log in and log out. JWT is kept in an HTTP-only cookie.
- Forgot and reset password by email link.
- Shop with product cards, a persistent cart and checkout.
- Pay with **Paystack**, with server-side payment verification.
- Order history, order detail and cancellation.
- Profile, address and password management.

**Admins**
- Create, update and delete products, and set product status.
- View all orders, filter them by status, and move each order through `PROCESSING → SHIPPED → COMPLETED`.
- Role-based route guards (`adminOnly`, `ownerOnly`, `ownerAndAdminOnly`).

## Architecture

```
client/   React + Vite SPA (Zustand stores, React Router, Tailwind, Framer Motion)
server/   Express REST API (Prisma + PostgreSQL, JWT auth, Nodemailer, Paystack)
docker-compose*.yml   API + Postgres + client for dev and prod
```

### API

| Prefix | Routes |
| --- | --- |
| `/api/v1/auth` | `signup`, `login`, `logout`, `forgot-password`, `reset-password/:token`, `check-auth` |
| `/api/v1/products` | list and get (public); create, update and delete (admin) |
| `/api/v1/order` | create, get, cancel, `pay/:id`, `verify_payment`; list, filter by status, change status (admin) |
| `/api/v1/user` | `profile`, `edit`, `change-password`; get user (admin) |

Data model: `User`, `Address`, `Product`, `Order`, `OrderItem`.

## Running locally

### With Docker

```bash
cp .env.example server/.env   # fill in the values below
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

This starts Postgres, runs the Prisma migrations, then starts the API and the React dev server.

### Without Docker

```bash
cd server && npm install && npx prisma migrate deploy && npm run dev
cd client && npm install && npm run dev
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Signs auth tokens |
| `CLIENT_URL`, `PORT`, `CLIENT_PORT` | CORS origin and ports |
| `EMAIL_ACCOUNT`, `GOOGLE_APP_PASSWORD` | Gmail account for password-reset emails |
| `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY` | Paystack payments |

## Tech stack

React · Vite · Zustand · Tailwind CSS · Express · Prisma · PostgreSQL · JWT · Nodemailer · Paystack · Docker
