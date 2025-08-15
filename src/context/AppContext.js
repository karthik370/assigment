import React, { createContext, useEffect, useMemo, useState } from 'react';
import { listEmployees, createEmployee } from '../api';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  const refreshEmployees = () =>
    listEmployees()
      .then((data) => setEmployees(Array.isArray(data) ? data : []))
      .catch(() => setEmployees([]));

  useEffect(() => {
    refreshEmployees();
  }, []);

  const addEmployee = async (payload) => {
    const created = await createEmployee(payload);
    setEmployees((prev) => [created, ...prev]);
  };

  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.status === 'Active').length;
    const departments = ['Engineering', 'Design', 'HR', 'Sales', 'Marketing'];
    const deptCounts = departments.map((d) => ({
      name: d,
      value: employees.filter((e) => e.department === d).length
    }));

    const byMonth = Array.from({ length: 6 }).map((_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleString('default', { month: 'short' });
      const hires = employees.filter((e) => (e.joinedAt || '').startsWith(monthKey)).length;
      return { month: label, hires };
    });

    return { total, active, deptCounts, byMonth };
  }, [employees]);

  const value = useMemo(
    () => ({ employees, addEmployee, setEmployees, stats, refreshEmployees }),
    [employees, stats]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
