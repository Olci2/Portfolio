# 🧠 Oldzhay Ahmed — Portfolio Website

🌐 **Live Site:** [portfolio-two-sage-54.vercel.app](https://portfolio-two-sage-54.vercel.app/)

> This portfolio is continuously updated as I build new projects, learn new skills, and grow as a developer. Check back regularly for new additions.

---

## 🚀 Overview

A full-stack personal portfolio website built from scratch — featuring a React frontend, a custom Node.js/Express backend, MongoDB database, JWT-protected admin dashboard, Cloudinary image uploads, and a working contact form. Deployed on Vercel (frontend) and Railway (backend).

This project has evolved significantly from its initial commit and now represents a complete, production-ready full-stack application.

---

## ⚙️ Tech Stack

### Frontend
- **React 19** (Vite)
- **Tailwind CSS v4**
- **React Router DOM v7**
- **Lucide React** — icons
- **Radix UI** — accessible toast notifications
- **clsx / tailwind-merge** — conditional styling utilities

### Backend (`/portfolio-backend`)
- **Node.js + Express 5**
- **MongoDB + Mongoose**
- **JWT Authentication** — protected admin routes
- **Cloudinary** — image & screenshot uploads
- **Multer** — file handling (5MB limit, images only)
- **Resend** — contact form email delivery
- **dotenv, cors, bcryptjs**

### DevOps & Tools
- **Vercel** — frontend deployment
- **Railway** — backend deployment
- **Git & GitHub** — version control
- **VS Code** — development environment
- **Proxmox / VMware / UTM** — home lab & virtualisation
- **Tailscale** (WireGuard-based VPN) — secure remote access
- **Adobe Photoshop** — design assets
- **Docker** — containerisation (learning & experimenting)

---

## 💡 Features

### Public Site
- ✅ Responsive layout — mobile, tablet, desktop
- ✅ Dark / Light mode toggle (system preference aware)
- ✅ Animated star & meteor background in dark mode
- ✅ Hero section with fade-in animations
- ✅ About section with downloadable CV
- ✅ Skills section with filterable categories and animated progress bars
- ✅ Journey / Timeline section — education, work, and milestones
- ✅ Currently Learning section
- ✅ Projects section — fetched live from MongoDB backend
- ✅ Expandable project cards with screenshot gallery, tech stack, learned & challenges
- ✅ Contact form — sends emails via Resend API
- ✅ 404 Not Found page

### Admin Dashboard (`/admin`)
- ✅ JWT-protected login
- ✅ Add projects with title, short description, full write-up, status, tech stack, what I learned, challenges, demo URL, GitHub URL
- ✅ Cover image upload via Cloudinary
- ✅ Multiple screenshot uploads (up to 6) via Cloudinary
- ✅ Delete projects
- ✅ Live project list with thumbnails and screenshot count

---

## 🗂️ Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── AboutSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── StarBackground.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── TimelineSection.jsx
│   │   └── ui/ (Toast components)
│   ├── hooks/
│   │   └── use-toast.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── NotFound.jsx
│   ├── assets/
│   │   └── Oldzhay_Ahmed_CV.pdf
│   ├── App.jsx
│   └── main.jsx
├── portfolio-backend/
│   ├── middleware/auth.js
│   ├── models/Project.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── contact.js
│   │   ├── projects.js
│   │   └── upload.js
│   └── server.js
└── public/
    └── assets/projects/
```

---

## 🧰 Run Locally

### Frontend
```bash
git clone https://github.com/Olci2/Portfolio.git
cd Portfolio
npm install
npm run dev
```
Open: [http://localhost:5173](http://localhost:5173)

### Backend
```bash
cd portfolio-backend
npm install
```

Create a `.env` file:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=your_email
PORT=5001
```

```bash
npm run dev
```

---

## 🌍 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | [portfolio-two-sage-54.vercel.app](https://portfolio-two-sage-54.vercel.app/) |
| Backend | Railway | `portfolio-backend-production-1584.up.railway.app` |
| Database | MongoDB Atlas | — |
| Images | Cloudinary | — |

---

## 👤 Author

**Oldzhay Ahmed**
- 📧 [oldzhay.ahmed.work@gmail.com](mailto:oldzhay.ahmed.work@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/oldzhay-ahmed-it-/)
- 🐙 [GitHub](https://github.com/Olc2)

---

> 🔄 This portfolio is actively maintained and continuously updated with new projects, skills, and features as I progress in my development journey.
