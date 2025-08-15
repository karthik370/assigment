const base = '/api';

export const getToken = () => localStorage.getItem('hr_token') || '';
export const setToken = (t) => localStorage.setItem('hr_token', t || '');
export const clearToken = () => localStorage.removeItem('hr_token');

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${base}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export const login = (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
export const signup = (name, email, password) => request('/auth/signup', { method: 'POST', body: JSON.stringify({ name, email, password }) });
export const listEmployees = () => request('/employees', { method: 'GET' });
export const createEmployee = (payload) => request('/employees', { method: 'POST', body: JSON.stringify(payload) });
