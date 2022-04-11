import React, { useCallback } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import logo from '../../assets/favicon/photo.png';
import s from './HeaderStyles.module.scss';
import { useAppDispatch } from '../../store/store';
import { logout } from '../../store/authorization/authorizationSlice';

export function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const matchOrganization = useMatch({ path: '/organization', end: true });
  const matchDivision = useMatch({ path: '/division', end: false });
  const matchEmployee = useMatch({ path: '/employee', end: false });

  const handleLogout: () => void = useCallback(() => {
    dispatch(logout());
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <div className={s.header}>
      <img alt="logo" className={s.photo} src={logo} />
      <div className={matchOrganization ? s.active : ''}> Organizations</div>
      <div className={matchDivision ? s.active : ''}>Division</div>
      <div className={matchEmployee ? s.active : ''}>Employee</div>
      <button type="button" onClick={handleLogout} className={s.logout}>
        Logout
      </button>
    </div>
  );
}
