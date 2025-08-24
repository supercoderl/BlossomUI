# 🌸 Blossom UI

## Overview
**Blossom UI** is the client-side application for the **Blossom platform**, built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.  
It provides a modern, responsive, and user-friendly interface for managing bookings, services, users, and content.  

The UI communicates with **BlossomServer** via REST/gRPC APIs and integrates authentication, localization, and role-based access control.

---

## ✨ Features
- 🔐 **Authentication & Authorization** (Google OAuth, custom login, role-based access)  
- 📅 **Appointments & Booking Management**  
- 👤 **User & Profile Management**  
- 🛠️ **Service & Technician Management**  
- 📊 **Dashboard with Analytics**  
- 📰 **Blog & Content Pages**  
- 📣 **Promotions & Reviews**  
- 🌍 **Multi-language Support (i18n)**  
- 🎨 **Responsive UI with Tailwind CSS**  
- ⚡ **Optimized with Next.js 15 App Router & API routes**  

---

## 📂 Project Structure
```
src/
├── api/ # API route handlers
├── app/ # Next.js App Router pages
│ ├── [locale]/ # Multi-language routes
│ ├── appointments/ # Booking & scheduling pages
│ ├── blog/ # Blog module
│ ├── booking/ # Booking workflow
│ ├── dashboard/ # Dashboard & analytics
│ ├── profile/ # User profile management
│ ├── promotion/ # Promotions module
│ ├── service/ # Services module
│ ├── user/ # User management
│ └── ... # Other feature modules
├── components/ # Shared React components
├── data/ # Static data / mock data
├── enums/ # Enums used across app
├── hooks/ # Custom React hooks
├── libs/ # Utility libraries (e.g. googleAuth.ts, removeBackground.ts)
├── providers/ # Context providers (theme, auth, store)
├── stores/ # State management
├── tests/ # Unit / integration tests
├── types/ # TypeScript type definitions
└── utils/ # Utility functions
```
---

## 🛠️ Tech Stack
- **Next.js 15** (App Router)  
- **TypeScript**  
- **Tailwind CSS**  
- **React Query / Zustand** (state management, if applicable)  
- **NextAuth.js / OAuth** for authentication  
- **i18next** for internationalization  

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-org/blossom-ui.git
cd blossom-ui
npm install
```
### 2. Environment Variables

Create a .env.local file with the following:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```
### 3. Run Dev Server
```bash
npm run dev
```

Visit http://localhost:3000

## 🔗 Integration with BlossomServer

Blossom UI relies on **BlossomServer** as its backend:

### API Communication
- Consumes **REST APIs** for user authentication, bookings, services, and notifications.  
- Uses **gRPC endpoints** where low-latency communication is required (e.g., real-time updates).  

### Authentication
- Delegates **OAuth flows** (e.g., Google login) to **BlossomServer**.  
- UI stores and manages **JWT/session tokens** issued by the server.  

### Data Flow
- **UI requests** → **BlossomServer Application Layer (CQRS/Domain logic)** → **Infrastructure (DB, Event Sourcing)**.  
- Responses are normalized in UI state management (**React Query / Zustand**).  

### Background Jobs
- **Notifications, reminders, and analytics** are processed in BlossomServer (via **Hangfire**).  
- Results are displayed in Blossom UI (**dashboards, alerts**).  

👉 See [BlossomServer README](https://github.com/supercoderl/BlossomServer/blob/master/README.md) for backend details.


## 🖼️ Screenshots

Dashboard

Booking Flow

Profile Page

## 📌 Summary

**Blossom UI** is the frontend interface for the **Blossom platform**, designed with modularity, scalability, and great user experience in mind.
By leveraging **Next.js 15** and **TypeScript**, it delivers a maintainable and high-performance application.