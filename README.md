# 📝 Notes App — OTP & Google Login with React + Node.js

A full-stack notes app that supports secure login using Email OTP or Google OAuth, allowing users to manage their personal notes. Built with **React**, **Node.js**, **Express**, and **MongoDB** — and deployed with **Vercel** (frontend) and **Render** (backend).

![App Screenshot](https://your-screenshot-link-if-any.com)

---

## 🔗 Live Demo

**Frontend**: [https://notes-app-cyan-omega.vercel.app](https://notes-app-cyan-omega.vercel.app)  
**Backend**: [https://notes-backend-7je9.onrender.com](https://notes-backend-7je9.onrender.com)

---

## 🚀 Features

- ✅ Email OTP-based Login (with name and date of birth)
- ✅ Google OAuth Login
- ✅ JWT-based authentication
- ✅ View, Create, and Delete Notes
- ✅ Responsive Dashboard UI
- ✅ Welcome message with name & email
- ✅ CORS-secured API integration

---

## ⚙️ Tech Stack

**Frontend**:

- React.js
- React Router
- Axios

**Backend**:

- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js (Google Strategy)
- Nodemailer
- JWT Authentication
- Dotenv

**Dev & Deployment**:

- Vercel (frontend)
- Render (backend)
- Git & GitHub

---

## 🛠️ Setup Instructions

Clone the Repository

```bash
git clone https://github.com/tallha-khan/notes-app.git
cd notes-app
```

Setup Backend

cd note-app-server
npm install

Create a .env file with the following:

MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail
EMAIL_PASS=your_app_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
FRONTEND_URL=https://your-frontend-url
BASE_URL=https://your-backend-url

npm start

Setup Frontend

cd ../note-app-client
npm install
npm start

Folder Structure

note-app/
├── note-app-client/ # React frontend
│ └── pages/ # Login, Dashboard, GoogleSuccess
│
├── note-app-server/ # Node.js backend
│ ├── routes/ # authRoutes.js, noteRoutes.js
│ ├── models/ # User, Note, Otp
│ ├── middleware/ # passport.js, authMiddleware.js
│ └── server.js

Author
Talha Khan
📧 Email: tallhakhan5432@gmail.com
🌐 GitHub: tallha-khan
