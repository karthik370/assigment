# HR SaaS Platform

A full‑stack HR management web application. Frontend: React. Backend: Express with JSON storage and JWT authentication.

## Tech
- React 18, react-router-dom, Recharts
- Express, JWT, bcryptjs, uuid
- Plain CSS

## Screens
- Login, Sign Up, Dashboard, Employee List, Add Employee

## API
- POST `/api/auth/login` { email, password }
- POST `/api/auth/signup` { name, email, password }
- GET `/api/employees` (Bearer token)
- POST `/api/employees` (Bearer token)

Default admin account: `admin@innotech.com` / `admin123`

## Run Locally
```bash
npm install
npm run dev
```
This runs client (CRA) and server (Express) together. The client proxies `/api` to `http://localhost:5000`.

## Structure
```
server/
  index.js
  storage.js
  routes/
    auth.js
    employees.js
src/
  api.js
  context/
    AppContext.js
  components/
    AddNewEmployee.js
    DashboardHome.js
    DashboardLayout.js
    EmployeeListPage.js
    LoginScreen.js
    SignUp.js
  App.js
  App.css
  index.js
```

## Notes
- Database file `server/db.json` is auto-created on first run.
- Responsive styling.
