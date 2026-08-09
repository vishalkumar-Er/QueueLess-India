# QueueLess India 🇮🇳

## 📌 Project Overview

QueueLess India is a smart digital queue management platform designed to reduce
waiting time and eliminate long physical queues.

The platform allows users to book a virtual queue token, track their queue
status in real time, and check their position without waiting physically at
the service location.

Administrators can manage queues, call the next token, update queue status,
and monitor queue activity through an admin dashboard.

The project is being developed as a full-stack web application.

---

## 🎯 Objectives

- Reduce waiting time for users
- Eliminate long physical queues
- Provide real-time queue tracking
- Allow users to book virtual queue tokens
- Help organizations manage queues efficiently
- Provide administrators with an easy queue management system
- Improve overall user experience

---

## 🚀 Features

### 👤 User Features

- User Registration and Login
- Secure Authentication
- Book a Queue
- Select Department
- Generate Queue Token
- View Current Queue
- Track People Ahead
- View Estimated Waiting Time
- View Queue Status
- View Queue History
- User Dashboard
- Responsive UI
- AI/Query Chatbot

### 👨‍💼 Admin Features

- Admin Login
- Admin Dashboard
- View Total Users
- View Total Queues
- View Waiting Queues
- View Completed Queues
- View Recent Queues
- Queue Management
- Search Queues
- Filter Queues by Department
- Call Next Token
- Complete Queue
- Skip Queue
- Cancel Queue
- Delete Queue
- Pagination
- Queue Status Management

### 🤖 Chatbot

QueueLess India also includes a chatbot interface that allows users to
interact with the platform and get answers to supported queries.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- TypeScript
- React Router
- CSS
- Recharts
- React Toastify

### Backend

- Node.js
- Express.js
- JavaScript

### Database

- MongoDB
- Mongoose

### Authentication

- JWT Authentication
- Password Hashing

### Additional Technologies

- REST API
- Nodemailer
- Git
- GitHub

---

## 📂 Project Structure

```text
QueueLess India/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Chatbot/
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard/
│   │   │   ├── QueueManagement/
│   │   │   ├── UserDashboard/
│   │   │   ├── BookQueue/
│   │   │   ├── Login/
│   │   │   ├── Signup/
│   │   │   └── Landing/
│   │   │
│   │   ├── services/
│   │   └── routes/
│   │
│   └── package.json
│
├── database/
├── admin/
├── api/
├── design/
├── docs/
├── mobile/
├── .gitignore
└── README.md
