# 🚀 Nexora — Full Stack Job Portal

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

A modern **full-stack job portal** built using **React, Supabase, Clerk Authentication, Tailwind CSS, and shadcn/ui**, enabling recruiters to seamlessly post and manage job listings while allowing candidates to discover, save, and apply for opportunities through a clean, responsive, and role-based interface.

---

## 🌐 Live Demo

🔗 **Live Website:** https://your-vercel-url.vercel.app

---

# 📸 Project Showcase

> Replace the placeholders below with screenshots after deployment.

### 🏠 Landing Page

![Landing Page](./screenshots/landing-page.png)

---

### 💼 Job Listings

![Job Listings](./screenshots/job-listings.png)

---

### 📄 Job Details

![Job Details](./screenshots/job-details.png)

---

### 📝 Apply for a Job

![Apply Job](./screenshots/apply-job.png)

---

### 🏢 Recruiter Dashboard

![Recruiter Dashboard](./screenshots/recruiter-dashboard.png)

---

### ➕ Post a Job

![Post Job](./screenshots/post-job.png)

---

### 🏢 Add Company

![Add Company](./screenshots/add-company.png)

---

# ✨ Features

## 🔐 Authentication & Authorization

- Secure authentication using Clerk
- Candidate & Recruiter role-based onboarding
- Protected routes
- Persistent user sessions
- Role-based navigation

---

## 👨‍💻 Candidate Features

- Browse all available jobs
- Search jobs by title
- Filter jobs by company
- Filter jobs by city
- Save & unsave jobs
- Apply for jobs
- Upload resume while applying
- Track submitted applications
- View application status

---

## 🏢 Recruiter Features

- Post new jobs
- Add new companies
- Upload company logos
- View posted jobs
- Delete jobs
- Open / Close hiring
- View applicants
- Manage hiring status

---

## 🎨 User Experience

- Responsive design
- Dark & Light mode
- Modern landing page
- Markdown support for job requirements
- Form validation with React Hook Form + Zod
- Dynamic city filtering
- Loading states
- Clean recruiter dashboard
- Professional card-based UI

---

# 🛠 Tech Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Tailwind CSS v4
- shadcn/ui
- Radix UI
- Lucide React
- React Hook Form
- Zod
- React Spinners
- Embla Carousel
- @uiw/react-md-editor

---

## Backend (Backend as a Service)

### Supabase

- PostgreSQL Database
- Row Level Security (RLS)
- File Storage
- Relational Database
- REST APIs

---

## Authentication

### Clerk

- Authentication
- User Management
- Role Management
- Protected Routes
- User Metadata

---

# 📂 Project Structure

```
src
│
├── api
│
├── components
│   ├── ui
│   ├── ApplicationCard.jsx
│   ├── ApplyJobDrawer.jsx
│   ├── Header.jsx
│   ├── JobCard.jsx
│   ├── AddCompanyDrawer.jsx
│   └── ...
│
├── hooks
│
├── lib
│
├── pages
│   ├── LandingPage.jsx
│   ├── JobListing.jsx
│   ├── JobPage.jsx
│   ├── PostJob.jsx
│   ├── MyJobs.jsx
│   ├── SavedJobs.jsx
│   ├── Onboarding.jsx
│   └── ...
│
├── data
│
└── main.jsx
```

---

# 🗄 Database Schema

## Companies

| Field    | Type    |
| -------- | ------- |
| id       | Integer |
| name     | Text    |
| logo_url | Text    |

---

## Jobs

| Field        | Type      |
| ------------ | --------- |
| id           | Integer   |
| title        | Text      |
| description  | Text      |
| requirements | Markdown  |
| location     | Text      |
| recruiter_id | UUID      |
| company_id   | Integer   |
| isOpen       | Boolean   |
| created_at   | Timestamp |

---

## Applications

| Field        | Type     |
| ------------ | -------- |
| id           | Integer  |
| candidate_id | UUID     |
| job_id       | Integer  |
| experience   | Text     |
| education    | Text     |
| skills       | Text     |
| resume       | File URL |
| status       | Text     |

---

## Saved Jobs

| Field   | Type    |
| ------- | ------- |
| id      | Integer |
| user_id | UUID    |
| job_id  | Integer |

---

# 🔒 Role-Based Access

## 👨‍💻 Candidate

- Browse jobs
- Save & unsave jobs
- Apply for jobs
- Upload resume
- Track submitted applications

---

## 🏢 Recruiter

- Post jobs
- Add companies
- Upload company logos
- Manage hiring status
- View applicants
- Delete jobs

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/ADITISHARMA-22/nexora.git
```

## Navigate into the project

```bash
cd nexora
```

## Install dependencies

```bash
npm install
```

## Create a `.env` file

```env
VITE_CLERK_PUBLISHABLE_KEY=

VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=
```

## Start the development server

```bash
npm run dev
```

---

# 💡 What I Learned

Building **Nexora** helped me gain practical experience with:

- Building scalable React applications
- Creating reusable UI components
- Authentication & authorization with Clerk
- PostgreSQL database design using Supabase
- CRUD operations
- File uploads with Supabase Storage
- Role-based access control
- Form validation using React Hook Form + Zod
- Markdown editor integration
- Custom React Hooks
- Responsive UI development
- Designing production-ready user flows

---

# 🛣️ Roadmap

- [ ] Recruiter analytics dashboard
- [ ] Company profile pages
- [ ] Advanced search & sorting
- [ ] Pagination
- [ ] Job expiry & auto close
- [ ] Email notifications

---

# 🤝 Contributing

Contributions, ideas, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 👩‍💻 Author

**Aditi Sharma**

Frontend Developer

- GitHub: https://github.com/ADITISHARMA-22
- LinkedIn: https://linkedin.com/in/your-linkedin-profile

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

It helps the project reach more developers and is greatly appreciated.
