const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

const dbPath = process.env.DB_FILE || path.join(__dirname, 'db.json');

const seedEmployees = [
  { id: uuid(), name: 'Aarav Sharma', email: 'aarav@innotech.com', role: 'Frontend Developer', department: 'Engineering', status: 'Active', joinedAt: '2025-04-05' },
  { id: uuid(), name: 'Isha Patel', email: 'isha@innotech.com', role: 'UI/UX Designer', department: 'Design', status: 'Active', joinedAt: '2025-02-18' },
  { id: uuid(), name: 'Rohan Mehta', email: 'rohan@innotech.com', role: 'HR Manager', department: 'HR', status: 'Inactive', joinedAt: '2024-11-22' },
  { id: uuid(), name: 'Neha Gupta', email: 'neha@innotech.com', role: 'QA Engineer', department: 'Engineering', status: 'Active', joinedAt: '2025-06-12' },
  { id: uuid(), name: 'Karan Verma', email: 'karan@innotech.com', role: 'Sales Executive', department: 'Sales', status: 'Active', joinedAt: '2025-03-01' }
];

function ensureDB() {
  if (!fs.existsSync(dbPath)) {
    const adminPasswordHash = bcrypt.hashSync('admin123', 10);
    const initial = {
      users: [
        { id: uuid(), name: 'Admin', email: 'admin@innotech.com', passwordHash: adminPasswordHash }
      ],
      employees: seedEmployees
    };
    fs.writeFileSync(dbPath, JSON.stringify(initial, null, 2));
  }
}

function readDB() {
  ensureDB();
  const raw = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getUserByEmail(email) {
  const db = readDB();
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

function addUser({ name, email, passwordHash }) {
  const db = readDB();
  const user = { id: uuid(), name, email, passwordHash };
  db.users.unshift(user);
  writeDB(db);
  return user;
}

function getEmployees() {
  const db = readDB();
  return db.employees;
}

function addEmployee(payload) {
  const db = readDB();
  const employee = { id: uuid(), ...payload };
  db.employees.unshift(employee);
  writeDB(db);
  return employee;
}

module.exports = {
  readDB,
  writeDB,
  getUserByEmail,
  addUser,
  getEmployees,
  addEmployee
};
