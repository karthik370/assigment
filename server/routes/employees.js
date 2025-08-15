const express = require('express');
const jwt = require('jsonwebtoken');
const { getEmployees, addEmployee } = require('../storage');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

router.get('/', authMiddleware, (req, res) => {
  res.json(getEmployees());
});

router.post('/', authMiddleware, (req, res) => {
  const { name, email, role, department, status, joinedAt } = req.body || {};
  if (!name || !email || !role || !department || !status) return res.status(400).json({ message: 'Missing fields' });
  const employee = addEmployee({ name, email, role, department, status, joinedAt });
  res.status(201).json(employee);
});

module.exports = router;
