# D.J. Trust - Official Web Application

[![React](https://img.shields.io/badge/React-19.x-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![.NET](https://img.shields.io/badge/.NET-10.0-512bd4?style=for-the-badge&logo=dotnet)](https://dotnet.microsoft.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-2019%2B-cc292b?style=for-the-badge&logo=microsoftsqlserver)](https://www.microsoft.com/sql-server)
[![IIS](https://img.shields.io/badge/IIS-10.0_ARR-0078d7?style=for-the-badge&logo=windows)](https://www.iis.net/)

The official corporate web platform for **D.J. Trust** (formerly D.J. Batapola, established in 1931). The application provides an interactive motorcycle & vehicle loan calculator, online loan applications, an authorized dealer network locator with district filtering, corporate history & milestones, plantation operations portfolio, career job postings, and interactive photo galleries.

---

## 🚀 Key Features

* **Financial Services & Loan Calculator:**
  * Real-time motorcycle & three-wheeler lease installment calculation.
  * Direct online loan inquiry and instant application submission.
* **Authorized Dealer Network:**
  * Interactive directory of 500+ dealer showrooms across all 25 districts of Sri Lanka.
  * Search, filtering by province, district, and town, and dealer application forms.
* **Corporate Heritage & Plantations:**
  * Corporate milestones tracing 90+ years from D.J. Batapola to the D.J. Trust rebrand.
  * Agricultural portfolio showcase covering tea, rubber, cinnamon, and coconut estates.
* **Events & Media Gallery:**
  * Dynamic, database-driven news and branch opening ceremonies.
  * Responsive 3-column / 2-column image gallery with full-screen Lightbox preview.
* **Careers & Job Portal:**
  * Open vacancies display with bilingual title support (English / Sinhala).
  * Direct online application with CV document upload.
* **Enterprise-Ready Infrastructure:**
  * Microsoft IIS 10 Single Page Application (SPA) routing with URL Rewrite.
  * Application Request Routing (ARR 3.0) Reverse Proxy (`/api/*` internally routed to backend Kestrel).
  * Auto-busting browser caching rules preventing stale client updates while accelerating static assets.

---

## 🛠️ Technology Stack

### Frontend
* **Framework:** React 19 (TypeScript)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS & Lucide Icons
* **Animations:** AOS (Animate On Scroll)
* **HTTP Client:** Axios (configured with automated HTTPS mixed-content protection & cache-busting)
* **Routing:** React Router v7

### Backend
* **Runtime:** ASP.NET Core Web API (.NET 10)
* **Data Access:** Dapper Micro-ORM
* **Database:** Microsoft SQL Server
* **API Documentation:** Swagger / OpenAPI UI
* **CORS:** Pre-configured for local dev and live domain environments
* **Configuration:** Centralized `.env` support across environments

---

## 📁 Project Structure

```plaintext
DjTrust_Website/
├── Backend/                    # ASP.NET Core Web API Service
│   ├── Controllers/            # API Endpoints (Events, Loans, Careers, Dealers, Contact)
│   ├── Data/                   # DbConnectionFactory & SQL Server utilities
│   ├── Models/                 # DTOs & Domain Models
│   ├── Properties/             # launchSettings.json
│   ├── Program.cs              # Dependency injection, middleware & routing
│   ├── appsettings.json        # Base ASP.NET configuration
│   └── web.config              # IIS ASP.NET Core hosting module config
│
├── Frontend/                   # React + TypeScript + Vite Client
│   ├── public/                 # Static assets, logos & production web.config
│   │   └── web.config          # IIS SPA rewrite rules & ARR reverse proxy config
│   ├── src/
│   │   ├── components/         # Reusable UI components (Navbar, Footer, Modals)
│   │   ├── pages/              # Route views (Home, About, Events, Careers, etc.)
│   │   ├── services/           # Axios API client & backend service adapters
│   │   └── index.css           # Global Tailwind & brand styling
│   ├── .env                    # Default environment variables
│   ├── .env.development        # Development environment variables
│   ├── .env.production         # Production build environment variables
│   ├── package.json            # Node.js dependencies & build scripts
│   └── vite.config.ts          # Vite build & bundler configuration
│
├── .gitignore                  # Git ignore rules for .NET, Node, and environments
└── README.md                   # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.x or newer recommended)
* [.NET 10 SDK](https://dotnet.microsoft.com/download)
* [Microsoft SQL Server](https://www.microsoft.com/sql-server)
* [Git](https://git-scm.com/)

---

### 1. Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```

2. Configure your environment variables in `Backend/.env`:
   ```env
   DB_SERVER=YOUR_SQL_SERVER
   DB_DATABASE=YOUR_DATABASE_NAME
   DB_USER=YOUR_USERNAME
   DB_PASSWORD=YOUR_PASSWORD
   ASPNETCORE_URLS=http://0.0.0.0:5000
   ```

3. Restore packages and run the API:
   ```bash
   dotnet restore
   dotnet run
   ```

4. Verify Swagger UI by opening:
   ```plaintext
   http://localhost:5000/swagger
   ```

---

### 2. Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment settings in `Frontend/.env.development`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the local Vite development server:
   ```bash
   npm run dev
   ```

5. Open your browser at `http://localhost:5173`.

---

## 🚢 Production Build & Deployment (IIS)

### Building the Frontend
To compile the production-optimized static bundle:
```bash
cd Frontend
npm run build
```
The compiled files will be output to `Frontend/dist/`.

### Hosting on IIS with ARR Reverse Proxy
1. **Prerequisites on Windows Server:**
   * Install **IIS** with the **URL Rewrite Module 2.1**.
   * Install **Application Request Routing (ARR 3.0)**.
2. **Enable Proxy in ARR:**
   * Open **IIS Manager** -> Select Server Node -> **Application Request Routing Cache**.
   * On the right panel, click **Server Proxy Settings...**.
   * Check **Enable proxy** -> Click **Apply**.
3. **Deploy Files:**
   * Copy all contents of `Frontend/dist/` (including `web.config`) into your IIS Website root folder (e.g., `C:\inetpub\wwwroot\djtrust`).
   * The included `web.config` will automatically route:
     * `https://yourdomain.lk/*` -> React SPA Routes (`index.html`)
     * `https://yourdomain.lk/api/*` -> Reverse Proxies internally to backend `http://127.0.0.1:5000/api/*`
4. **Run Backend Service:**
   * Run the ASP.NET Core backend as a Windows Service or via NSSM on port `5000`.

---

## 🔒 Security & Best Practices

* **Zero Mixed-Content Issues:** All API calls from the browser utilize relative `/api` paths over HTTPS.
* **No Cache Leaks:** `index.html` and `/api/*` are configured with `no-cache, no-store, must-revalidate` so production changes appear immediately to visitors.
* **Secrets Sanitization:** All sensitive credentials, connection strings, and server IPs are excluded via `.gitignore` using `.env` files.

---

## 📄 License
Copyright © 2026 **D.J. Trust**. All rights reserved.  
Unauthorized copying, modification, or distribution is strictly prohibited.

