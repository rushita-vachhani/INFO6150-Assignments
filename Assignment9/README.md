# React Job Portal (Assignment 9)

This project is a React-based Job Portal developed as part of Assignment 9. It connects to the Node.js + MongoDB backend from Assignment 8 to authenticate existing users and display company data with images. The frontend uses React Router, Axios, and Material UI for navigation, API requests, and responsive UI components.
- The Job Portal allows job seekers to:
- Log in using existing Assignment 8 credentials (no signup).
- Browse dynamic Job Listings stored on the frontend.
- Explore the Company Showcase, where company images are fetched from the backend.
- Learn more about the site in the Home, About, and Contact pages.
- Use consistent Material UI design across all pages.

## Tech Stack
---
| Category         | Tools / Libraries               |
| ---------------- | ------------------------------- |
| Framework        | React 18 (Create React App)     |
| Routing          | React Router v6                 |
| HTTP Requests    | Axios                           |
| UI Library       | Material UI (MUI)               |
| Icons            | @mui/icons-material             |
| Backend API      | Assignment 8 Node.js + MongoDB  |
| State Management | React Context API (AuthContext) |

## Folder Structure

```
Assignment9/
├── public/
│   └── index.html
│
├── src/
│   ├── assets/                # Images and illustrations
│   ├── components/            # Reusable components (NavBar, PrimaryButton)
│   ├── pages/                 # Individual route pages
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Jobs.jsx
│   │   ├── Contact.jsx
│   │   ├── Companies.jsx
│   │   └── Login.jsx
│   ├── pages/                 # Individual route pages (Home, About, Jobs, etc.)
│   ├── seed/                  # Static frontend data (jobPosts.js)
│   ├── services/              # Axios setup (api.js)
│   ├── state/                 # Auth context (login/logout/session)
│   ├── App.css                
│   ├── App.jsx                # App routes and layout
│   └── index.css 
│   ├── index.js               # React entry file
├── .env                       # Backend API base URL
├── .gitignore
├── package.json
└── README.md
```

## Setup & Installation

**1. Clone and Install**
```bash
git clone <repo-url>
cd Assignment9
npm install
```

**2. Set Environment Variable**

Create a `.env` file in the project root and add backend API URL:
```
REACT_APP_API_BASE_URL=http://localhost:4000
```

**3. Run the Application**
```bash
npm start
```
Open http://localhost:3000 in your browser.

## Navigation and Pages
----
| Page                 | Path         | Description                                                |
| -------------------- | ------------ | ---------------------------------------------------------- |
| **Home**             | `/`          | Hero banner with job search and quick info.                |
| **About**            | `/about`     | Mission statement and founder details.                     |
| **Job Listings**     | `/jobs`      | Displays jobs (title, skills, salary) from `jobPosts.js`.  |
| **Contact**          | `/contact`   | Contact form with left-side image.                         |
| **Company Showcase** | `/companies` | Protected route; shows companies with images from backend. |
| **Login**            | `/login`     | Uses existing Assignment 8 credentials; sets JWT token.    |


## Login & Session Management

- The login form authenticates users via an Axios `POST` request to `/auth/login`.
- On success, a JWT token is stored in `localStorage`.
- The token is attached to every protected request through an Axios interceptor.
- Clicking "Logout" removes the token and redirects the user to the Home page.

## Key Functionalities

- **Routing & Navigation**: All pages are handled by React Router v6.
- **Material UI Design**: Uses `AppBar`, `Card`, `Button`, and `TextField` for a consistent and responsive UI.
- **Dynamic Rendering**: Jobs are mapped from a local data file, while company data is fetched dynamically via Axios.
- **Responsive Layout**: The UI is built with a Grid system that adapts to desktop, tablet, and mobile screens.
- **Session Security**: Implements a token-based login/logout flow to protect routes.
- **Version Control**: The project is maintained under Git, with a `.gitignore` file to exclude unnecessary files.

---

*Developed By Rushitaben Vachhani*
