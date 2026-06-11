# Muhammad Abdullah — Portfolio

> Full-stack developer portfolio with a **Next.js 14** frontend, **NestJS** backend, and **MongoDB** database.
> Admin panel styled after the DevPortal cinematic design system.

---

## Architecture

```
portfolio/
├── frontend/          # Next.js 14 + TypeScript + Tailwind CSS
└── backend/           # NestJS + MongoDB + Mongoose + JWT
```

---

## Quick Start

### 1 — Prerequisites

| Tool     | Version  |
|----------|----------|
| Node.js  | ≥ 18.x   |
| npm      | ≥ 9.x    |
| MongoDB  | local **or** Atlas URI |

---

### 2 — Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Edit .env — set your MongoDB URI and a strong JWT_SECRET
# MONGODB_URI=mongodb://localhost:27017/portfolio
# JWT_SECRET=change-this-in-production
# ADMIN_EMAIL=admin@portfolio.com
# ADMIN_PASSWORD=Admin@123

# Start dev server
npm run start:dev
# → API running at http://localhost:5000/api/v1
# → Swagger docs at http://localhost:5000/api/docs
```

An admin account is **automatically seeded** from `.env` values on first run.

---

### 3 — Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy env file
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# Start dev server
npm run dev
# → Portfolio at http://localhost:3000
# → Admin panel at http://localhost:3000/admin/login
```

---

## API Endpoints

### Public (no auth required)
| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | /projects                   | All projects (paginated) |
| GET    | /projects/featured          | Featured projects        |
| GET    | /projects/slug/:slug        | Project by slug          |
| GET    | /about                      | Portfolio about data     |
| POST   | /messages                   | Submit contact form      |

### Admin (Bearer JWT required)
| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| POST   | /auth/login                 | Get JWT token            |
| GET    | /auth/me                    | Current admin profile    |
| POST   | /projects                   | Create project           |
| PUT    | /projects/:id               | Update project           |
| DELETE | /projects/:id               | Delete project           |
| GET    | /messages                   | All messages             |
| PATCH  | /messages/:id/status        | Update message status    |
| DELETE | /messages/:id               | Delete message           |
| PUT    | /about                      | Update about data        |
| GET    | /admin/dashboard            | Dashboard stats          |

---

## Design System

| Token          | Value       |
|----------------|-------------|
| Background     | `#0D0D0D`   |
| Card           | `#171717`   |
| Border         | `#2A2A2A`   |
| Text Primary   | `#FFFFFF`   |
| Text Secondary | `#A3A3A3`   |
| Accent         | `#8B5CF6`   |
| Font Display   | Syne        |
| Font Body      | DM Sans     |
| Font Mono      | JetBrains Mono |

---

## Content Management

All portfolio content lives in one file:

```
frontend/lib/data/portfolio.ts
```

Edit it to update your name, bio, projects, skills, experience, certifications, and testimonials — no code changes needed elsewhere.

---

## Deployment

### Frontend → Vercel
```bash
# In Vercel dashboard:
# Root directory: frontend
# Build command: npm run build
# Environment variable: NEXT_PUBLIC_API_URL=https://your-api.com/api/v1
```

### Backend → Railway / Render / VPS
```bash
cd backend
npm run build
npm run start:prod
# Set environment variables in your hosting dashboard
```

---

## Admin Panel

| URL                          | Description      |
|------------------------------|------------------|
| `/admin/login`               | Login screen     |
| `/admin/dashboard`           | Stats overview   |
| `/admin/projects`            | Manage projects  |
| `/admin/messages`            | Read messages    |
| `/admin/about`               | Edit profile     |
| `/admin/settings`            | Change password  |

Default credentials (from `.env`):
- Email: `admin@portfolio.com`
- Password: `Admin@123`

**Change these immediately in production.**
"# PORTFOLIO-ABDULLAH" 
