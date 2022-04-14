import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, CounterPage, TodosPage, Organization, Division, Employee } from 'Common/Pages';
import { Header } from '../../UIElements/Header/Header';

export default function PrivateRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/organization" element={<Organization />} />
        <Route path="/division/:id" element={<Division />} />
        <Route path="/employee/:id" element={<Employee />} />
      </Routes>
    </>
  );
}
