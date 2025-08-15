const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'hr-saas-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

if (process.env.NODE_ENV === 'production') {
  const clientPath = path.join(__dirname, '..', 'build');
  if (fs.existsSync(clientPath)) {
    app.use(express.static(clientPath));
    app.get('*', (_, res) => res.sendFile(path.join(clientPath, 'index.html')));
  } else {
    app.get('/', (_, res) => res.json({ ok: true, service: 'hr-saas-backend', ui: 'not-included' }));
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
