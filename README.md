# Keshav Mittal — Dynamic Full-Stack Portfolio Application

[![Java 17](https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=java&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot 3.2.5](https://img.shields.io/badge/Spring_Boot-3.2.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-Backend-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)

A dynamic full-stack portfolio application with a secure, JWT-authenticated administrator dashboard to manage all portfolio content (Projects, Certifications, Internships, Skills, Profile Photo, and Resume PDF) dynamically in real-time without requiring code redeployments.

---

## 🚀 Live Application & API Endpoints

* **Live Application:** [https://keshav-dynamic-portfolio.vercel.app/](https://keshav-dynamic-portfolio.vercel.app/)
* **API Keep-Alive Strategy:** Backends hosted on Render's free tier enter sleep mode after 15 minutes of inactivity. To prevent a cold-start latency lag for recruiters, an automated keep-alive strategy pings the public `/api/projects` endpoint to maintain active server readiness.

---

## 🛠 Technology Stack

### Frontend (`portfolio-frontend`)
* **Core Framework:** React.js (v19.2)
* **Build Engine:** Vite (v8.0)
* **Routing:** React Router DOM (v7.15)
* **Animations:** Framer Motion (v12.38)
* **HTTP Client:** Axios (v1.16)
* **Styling:** Tailwind CSS (v3.4) & Custom Glassmorphism CSS variables
* **Icons:** React Icons (v5.6)

### Backend (`portfolio-backend`)
* **Core Framework:** Spring Boot (v3.2.5)
* **Java Version:** Java 17
* **Database Connector:** MySQL Connector (`mysql-connector-j`)
* **ORM & Persistence:** Spring Data JPA (Hibernate)
* **Security:** Spring Security (Stateless JWT token validation with `jjwt 0.12.3`)
* **Third-Party Services:** Cloudinary Java SDK (`1.36.0`) for media streaming, JavaMailSender (Gmail SMTP) for automated contact notifications
* **Configuration:** `spring-dotenv` (v4.0.0) for `.env` management
* **Build System:** Maven

### Database & Hosting Platform
* **Database:** MySQL 8.0 Relational Database
* **Media & Resume CDN:** Cloudinary Registry (Profile Avatar, PDF Resume, and Project Cover Images)
* **Frontend Hosting:** Vercel
* **Backend Hosting:** Render (Dockerized Web Service)

---

## 📈 Key Application Features

### 🌟 Public Recruiter Portfolio
* **Dynamic Content Hydration:** Renders all portfolio data dynamically from MySQL backend database records (Profile Settings, Projects, Certifications, Internships, Skills).
* **Interactive Document Viewer:** Recruiter-friendly modal overlay allowing visitors to view and download the PDF Resume inside the browser.
* **Search & Categorization:** Real-time client-side search filtering by project titles, descriptions, and technology tags with clean pagination support.
* **Instant Contact Engine:** Input-validated contact form that saves incoming messages to the database and dispatches instant email notifications to the admin via Gmail SMTP.

### 🛡 Admin Control Panel (`/admin/dashboard`)
* **JWT-Protected Portal:** Secured by a client-side React route guard and backend `JwtAuthFilter` validation.
* **Real-Time Analytics Counters:** Visual statistics dashboard tracking counts of active projects, certifications, experiences, and incoming contact messages.
* **Profile & Media Synchronization:** One-click replacement of profile avatar and PDF resume with automatic remote Cloudinary CDN upload.
* **Full CRUD Management:** Create, edit, and delete entries across Projects, Certifications, Internships, and Skills modules.
* **Message Management:** Read and delete incoming contact inquiries.

---

## 📂 Codebase Folder Architecture

```text
dynamic-portfolio/
├── portfolio-backend/              # Java 17 Spring Boot Backend Service
│   ├── src/main/java/com/keshav/portfolio/
│   │   ├── config/                 # SecurityConfig, CorsConfig, PasswordEncoder
│   │   ├── controller/             # REST Controllers (Auth, Projects, Certifications, etc.)
│   │   ├── dto/                    # Data Transfer Objects (LoginRequest, ProjectDto, etc.)
│   │   ├── entity/                 # JPA Entities (Project, Certification, User, ProfileSettings)
│   │   ├── exception/              # GlobalExceptionHandler & ResourceNotFoundException
│   │   ├── repository/             # Spring Data JPA Repositories
│   │   ├── security/               # JwtAuthFilter, JwtTokenProvider, CustomUserDetailsService
│   │   ├── service/                # Business Logic Services (ProjectService, AuthService, CloudinaryService)
│   │   └── util/                   # HTMLSanitizer (XSS Protection)
│   ├── .env                        # Local & Production Environment Variables
│   ├── application.properties      # Spring Boot Properties Setup
│   ├── Dockerfile                  # Backend Container Build Spec
│   └── pom.xml                     # Maven Dependencies Setup
│
└── portfolio-frontend/             # React 19 Single Page Application (Vite)
    ├── src/
    │   ├── api/                    # Axios Configuration & API Service Routes
    │   ├── components/             # Reusable UI Widgets (Navbar, Footer, Modals, Toast Alerts)
    │   ├── pages/                  # Public Portfolio Landing & Protected Admin Dashboard
    │   ├── App.jsx                 # Lazy-loaded Router & Route Guards
    │   └── index.css               # Glassmorphism Theme & Custom Styling
    ├── package.json                # Dependencies Specs (React 19, Vite 8, Tailwind)
    └── vercel.json                 # Vercel SPA Rewrite Rules
```

---

## 🔑 Environment Variables Setup (`portfolio-backend/.env`)

Create a `.env` file inside the `portfolio-backend/` root directory:

```env
# Database Credentials (MySQL)
DB_URL=jdbc:mysql://localhost:3306/keshav_portfolio_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
DB_USERNAME=root
DB_PASSWORD=your_mysql_password

# JWT Security Configuration
JWT_SECRET=your_super_secret_signing_key_minimum_256_bits_long

# Cloudinary Media CDN Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173

# JavaMailSender (Gmail SMTP Configuration)
SPRING_MAIL_USERNAME=keshavmittal1207@gmail.com
SPRING_MAIL_PASSWORD=your_gmail_app_password

# Default Admin Account Initialization
ADMIN_DEFAULT_USERNAME=Keshav
ADMIN_DEFAULT_PASSWORD=YourAdminPassword123
ADMIN_DEFAULT_EMAIL=keshavmittal1207@gmail.com
```

---

## 🛠 Local Setup & Installation Guide

### Prerequisites
* **JDK 17** installed and configured in `PATH`.
* **Node.js 18+** & **npm**.
* **MySQL 8.0** database running locally.

---

### Step 1: Run Backend API Service
```bash
cd portfolio-backend

# Package and build JAR file
./mvnw clean package -DskipTests

# Run Spring Boot Application
./mvnw spring-boot:run
```
*Backend server will start on `http://localhost:8080`.*

---

### Step 2: Run Frontend Application
```bash
cd portfolio-frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
*Frontend application will start on `http://localhost:5173`.*

---

## 📡 API Routing Reference

### 🌐 Public Endpoints (No Authentication Required)
- `POST /api/auth/login` — Validate admin credentials and return JWT bearer token.
- `GET /api/public/portfolio` — Fetch consolidated portfolio details in a single request.
- `GET /api/projects` — Fetch paginated and searchable projects (`page`, `size`, `sort`, `search`).
- `GET /api/projects/{id}` — Fetch details for a specific project.
- `GET /api/certifications` — Fetch list of certifications.
- `GET /api/internships` — Fetch list of internships/experiences.
- `GET /api/skills` — Fetch skills catalog.
- `GET /api/profile` — Fetch active profile settings (photo URL, resume PDF URL).
- `POST /api/contact` — Submit a contact message and send an email notification to the administrator.

### 🛡 Protected Admin Endpoints (JWT Bearer Token Required)
- `POST /api/projects` — Create a new project entry.
- `PUT /api/projects/{id}` — Update an existing project.
- `DELETE /api/projects/{id}` — Delete a project.
- `POST /api/projects/upload-image` — Upload a project cover image directly to Cloudinary.
- `POST /api/certifications` — Create a certification entry.
- `PUT /api/certifications/{id}` — Update a certification entry.
- `DELETE /api/certifications/{id}` — Delete a certification entry.
- `POST /api/internships` — Create an internship entry.
- `PUT /api/internships/{id}` — Update an internship entry.
- `DELETE /api/internships/{id}` — Delete an internship entry.
- `POST /api/skills` — Create a skill entry.
- `PUT /api/skills/{id}` — Update a skill entry.
- `DELETE /api/skills/{id}` — Delete a skill entry.
- `POST /api/profile/update` — Update profile settings (bio, titles, resume/photo links).
- `POST /api/profile/upload` — Upload a profile photo or resume PDF directly to Cloudinary.
- `GET /api/contact` — View all incoming contact messages.
- `DELETE /api/contact/{id}` — Delete a contact message.

---

## 💻 Developer & Contact

- **Developer:** Keshav Mittal
- **GitHub:** [KeshavMittal1207](https://github.com/KeshavMittal1207)
- **LinkedIn:** [Keshav Mittal](https://linkedin.com/in/keshav-mittal-8b2b81284/)
- **Email:** `keshavmittal1207@gmail.com`

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
