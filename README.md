# NSS Project Management System

A full-stack role-based Project Management System built using the MERN stack.

This application allows Admins, Employees, and Clients to manage projects, service requests, and notifications in a structured workflow.

---
## Live Demo

**Frontend (Vercel):**  
👉 https://pss-project-management-system.vercel.app/  

**Backend API (Render):**  
👉 https://pss-project-management-system.onrender.com  

**Database:** MongoDB Atlas (Cloud Hosted)

## Demo Access

For testing the live deployed application, use:

| Role     | Email              | Password   |
|----------|--------------------|------------|
| Admin    | admin@pss.com      | admin123   |
| Employee | purva@.com         | purva123   |
| Client   | rupa@.com          | rupa123    |

> These accounts are pre-seeded for demonstration purposes.

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

---

## User Roles & Features

### Admin
- Login with JWT authentication
- View dashboard statistics
- Manage users
- Create and manage projects
- View & approve service requests
- Auto project creation after approval
- Send notifications to clients

---

### Employee
- Login securely
- View assigned projects
- Update project status
  - Pending
  - In Progress
  - Completed

---

### Client
- Register & login
- Submit service requests
- View project status
- Receive approval notifications
- View assigned employees

---

## Service Request Flow

1. Client submits service request
2. Admin reviews request
3. Admin approves request
4. System:
   - Creates new project
   - Sends notification to client
5. Client sees approval in Notifications

---

## Dashboard Features

Admin Dashboard:
- Total Users
- Total Projects
- Pending Requests
- Completed Projects

Employee Dashboard:
- Assigned projects
- Status update functionality

Client Dashboard:
- Project overview
- Service request submission
- Notifications panel

---

## Notification System

- Notifications created when admin approves request
- Client can view and mark notifications as read

---

## Project Structure
```
purva-software-solutions/
│
├── backend/
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── ServiceRequest.js
│   │   └── Notification.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── employee.js
│   │   ├── client.js
│   │   ├── service.js
│   │   └── notification.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── roleCheck.js
│   │
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── nodemon.json (if used)
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── EmployeeLayout.jsx
│   │   │   └── ClientLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   │
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── AdminProjects.jsx
│   │   │   ├── AdminServices.jsx
│   │   │   │
│   │   │   ├── EmployeeDashboard.jsx
│   │   │   │
│   │   │   ├── ClientDashboard.jsx
│   │   │   ├── ClientServices.jsx
│   │   │   └── ClientNotifications.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```
