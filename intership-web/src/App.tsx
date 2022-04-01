import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

import RequireAuth from './components/routes/RequireAuth';
import PrivateRoutes from './components/routes/PrivateRoutes';

import { Login } from './pages/Login/Login';

import s from './App.module.scss';

export const App: React.FC = () => {
  const isLoaded = useSelector((state: RootState) => state.authorization.isLogin);
  return (
    <div className={s.app}>
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <RequireAuth isLogged={isLoaded}>
                <PrivateRoutes />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};
