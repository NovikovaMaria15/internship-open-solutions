import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, CounterPage, TodosPage, Organization } from 'Common/Pages';

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/organization" element={<Organization />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/counter" element={<CounterPage />} />
      <Route path="/todos" element={<TodosPage />} />
    </Routes>
  );
}
