# D.J. Trust – Official Web Application

<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/.NET-10.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET" />
  <img src="https://img.shields.io/badge/SQL_Server-Database-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white" alt="SQL Server" />
  <img src="https://img.shields.io/badge/IIS-10.0-0078D7?style=for-the-badge&logo=windows&logoColor=white" alt="IIS" />
</p>

## Overview

**D.J. Trust – Official Web Application** is a modern corporate web platform developed to establish and strengthen the company's digital presence.

Formerly known as **D.J. Batapola**, D.J. Trust traces its corporate history back to 1931. The platform brings together financial services, vehicle leasing information, authorized dealer network management, corporate information, plantation operations, career opportunities, and company news through a responsive and user-friendly interface.

The application is built using **React, TypeScript, ASP.NET Core Web API, and Microsoft SQL Server**, with production deployment designed around Microsoft Internet Information Services (IIS).

## Key Features

### 1. Financial Services & Loan Calculator
- Interactive motorcycle and three-wheeler leasing installment calculator.
- Loan and leasing information presentation.
- Online loan inquiry and application submission.
- Dynamic vehicle make and model selection.
- Responsive loan application interface.

### 2. Authorized Dealer Network
- Interactive authorized dealer directory across Sri Lanka.
- Dealer search and filtering by province, district, and town.
- Dealer and showroom information presentation.
- Online dealer application facilities.
- Location-based dealer information.

### 3. Corporate Profile & Heritage
- Company history and corporate milestones dating back to 1931.
- Corporate information and leadership profiles.
- Presentation of D.J. Trust's business operations.
- Plantation portfolio covering tea, rubber, cinnamon, and coconut.
- Company expertise and business development information.

### 4. News, Events & Media Gallery
- Database-driven news and company event management.
- Branch opening ceremonies and corporate announcements.
- Dynamic event information.
- Responsive image gallery.
- Full-screen image preview using Lightbox functionality.

### 5. Careers & Recruitment
- Dynamic job vacancy listings.
- English and Sinhala job title support.
- Online job application submission.
- CV document upload functionality.
- Career opportunity information.

### 6. Responsive User Experience
- Modern and responsive corporate interface.
- Desktop, tablet, and mobile compatibility.
- Interactive navigation and reusable UI components.
- Scroll-based animations.
- Optimized frontend production build.

### 7. Production Infrastructure
- Microsoft IIS 10 web server deployment.
- React Single Page Application (SPA) routing.
- IIS URL Rewrite configuration.
- Application Request Routing (ARR) reverse proxy.
- Internal API routing between IIS and ASP.NET Core Kestrel.
- Environment-specific frontend configuration.
- Configurable browser caching policies.

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | User interface development |
| TypeScript 5 | Static typing and maintainable code |
| Vite 6 | Development server and production build |
| Tailwind CSS 3 | Responsive UI styling |
| Lucide Icons | Interface icons |
| AOS | Scroll-based animations |
| Axios | HTTP requests and API integration |
| React Router v7 | Client-side navigation |

### Backend

| Technology | Purpose |
|---|---|
| ASP.NET Core Web API (.NET 10) | Backend application and REST APIs |
| C# | Backend development |
| Dapper | Lightweight data access |
| Microsoft SQL Server | Relational database |
| Swagger / OpenAPI | API documentation and testing |
| Kestrel | ASP.NET Core web server |

### Infrastructure & Deployment

| Technology | Purpose |
|---|---|
| Microsoft IIS 10 | Web server and application hosting |
| IIS URL Rewrite 2.1 | SPA routing and URL rewriting |
| Application Request Routing 3.0 | Reverse proxy |
| Windows Server | Production hosting environment |
| Git & GitHub | Source code management |

---

## Project Structure

The following represents the intended application structure. Folder names should match the actual repository.

```text
DjTrust_Website/
│
├── Backend/
│   ├── Controllers/
│   │   ├── EventsController.cs
│   │   ├── LoansController.cs
│   │   ├── CareersController.cs
│   │   ├── DealersController.cs
│   │   └── ...
│   │
│   ├── Data/
│   │   └── DbConnectionFactory.cs
│   │
│   ├── Models/
│   │
│   ├── Properties/
│   │   └── launchSettings.json
│   │
│   ├── Program.cs
│   ├── appsettings.json
│   ├── DjTrust.Api.csproj
│   └── web.config
│
├── Frontend/
│   ├── public/
│   │   ├── images/
│   │   └── web.config
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

## Getting Started

Follow these instructions to configure and run the application in a local development environment.

### Prerequisites

Make sure the following tools are installed:

- [Node.js](https://nodejs.org/) – Version 20 or later recommended.
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Microsoft SQL Server](https://www.microsoft.com/sql-server)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) or Visual Studio.

### 1. Clone the Repository

```bash
git clone https://github.com/Techwolf-d/DjTrust_Website.git
```

Navigate to the project directory:

```bash
cd DjTrust_Website
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd Backend
```

Restore the required NuGet packages:

```bash
dotnet restore
```

#### Configure Database Connection

Configure the SQL Server connection using the configuration keys and environment variables supported by `DbConnectionFactory`.

Example configuration values:

```env
DB_SERVER=YOUR_SQL_SERVER
DB_DATABASE=YOUR_DATABASE_NAME
DB_USER=YOUR_USERNAME
DB_PASSWORD=YOUR_PASSWORD
```

Keep actual database credentials outside source control.

**Important:** ASP.NET Core does not automatically load `.env` files. A custom dotenv loader must be implemented for that approach. Otherwise, use supported system environment variables, .NET User Secrets, or local configuration files excluded from Git.

#### Run the Backend API

```bash
dotnet run --urls http://127.0.0.1:5000
```

The API will be available at:

```text
http://localhost:5000
```

Swagger API documentation (when enabled):

```text
http://localhost:5000/swagger
```

### 3. Frontend Setup

Open a separate terminal and navigate to the frontend directory:

```bash
cd Frontend
```

Install the required dependencies:

```bash
npm install
```

Create a local development environment configuration file named `.env.development.local`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Make sure the API base URL matches the running backend configuration.

Start the development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

---

## Production Build & Deployment

The application is designed for deployment on a Windows Server environment using Microsoft IIS and Application Request Routing.

### 1. Build the Frontend

Navigate to the frontend directory:

```bash
cd Frontend
```

Install dependencies and generate the production build:

```bash
npm install
npm run build
```

The optimized production files will be generated inside:

```text
Frontend/dist/
```

### 2. IIS Prerequisites

Install the following components on the Windows Server:

- Microsoft IIS 10.
- IIS URL Rewrite Module 2.1.
- Application Request Routing (ARR) 3.0.
- ASP.NET Core .NET 10 Hosting Bundle.

### 3. Configure ARR Reverse Proxy

1. Open IIS Manager.
2. Select the server node.
3. Open **Application Request Routing Cache**.
4. Select **Server Proxy Settings**.
5. Enable the proxy option.
6. Apply the configuration.

### 4. Deploy the Frontend

Copy the contents of `Frontend/dist/` into the IIS website root directory.

Example deployment path:

```text
C:\inetpub\wwwroot\djtrust\
```

The frontend `web.config` should configure:

- SPA fallback routing to `index.html`.
- API reverse proxy routing for `/api/*`.
- Appropriate cache headers for HTML, API responses, and static assets.

### 5. Configure Backend Hosting

Run the ASP.NET Core backend using Kestrel on the internal application port.

Example:

```text
http://127.0.0.1:5000
```

Configure IIS ARR to forward API requests internally:

```text
/api/*  →  http://127.0.0.1:5000/api/*
```

The backend can be managed as a Windows Service or through an appropriate service-management solution.

Keep the internal backend port inaccessible from the public internet unless external access is explicitly required.

### 6. Production URL Routing

The intended request flow is:

```text
             Website Visitors
                    |
                    v
             HTTPS / IIS 10
                    |
           +--------+--------+
           |                 |
           v                 v
      Frontend SPA       /api/*
           |                 |
           v                 v
       index.html       IIS ARR Proxy
                             |
                             v
                       ASP.NET Core
                         Kestrel
                             |
                             v
                      SQL Server
```

---

## Security & Best Practices

Security is an important consideration for both the frontend and backend infrastructure.

- **Environment Configuration:** Keep database credentials, API secrets, and sensitive configuration outside version control.
- **HTTPS:** Use a valid SSL/TLS certificate for production website communication.
- **Database Security:** Restrict database access to authorized application services and trusted network connections.
- **CORS Configuration:** Allow only trusted frontend origins in production. Avoid unrestricted origins when credentials are enabled.
- **API Protection:** Validate incoming requests and apply suitable authorization and input-validation rules.
- **File Upload Security:** Validate document types, file sizes, and uploaded file content.
- **Reverse Proxy:** Keep the internal Kestrel port private and route external API requests through IIS.
- **Caching:** Use appropriate cache-control policies for HTML documents, API responses, and static resources.
- **Version Control:** Exclude `.env` files, private keys, certificates, database backups, and other sensitive files using `.gitignore`.

---

## Development & Maintenance

Recommended practices for maintaining the application:

- Follow reusable component-based frontend architecture.
- Maintain consistent API response structures.
- Keep frontend and backend configuration environment-specific.
- Use Git branches and meaningful commit messages.
- Test API endpoints using Swagger.
- Verify production builds before deployment.
- Review dependency updates and security advisories regularly.

---

## License & Copyright

Copyright © 2026 **D.J. Trust**. All rights reserved.

This is a proprietary corporate application. Unauthorized copying, redistribution, modification, or commercial use of this source code without prior written permission from D.J. Trust is strictly prohibited.