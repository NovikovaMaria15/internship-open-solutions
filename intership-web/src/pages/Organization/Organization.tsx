import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline, IoAddCircleOutline } from 'react-icons/io5';
import { useAppDispatch } from '../../store/store';
import organization from '../../store/organization/organizationThunk';
import { logout } from '../../store/authorization/authorizationSlice';

import s from './OrganizationStyles.module.scss';

export function Organization() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const back = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const addOrganization: () => void = useCallback(() => {
    dispatch(organization())
      .then((action) => {
        console.log(action);
      })
      .catch(() => {});
  }, [dispatch]);

  const handleLogout: () => void = useCallback(() => {
    dispatch(logout());
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <div>
      <div className={s.header}>
        <button type="button" onClick={handleLogout} className={s.logout}>
          Logaut
        </button>
      </div>
      <div className={s.alignment}>
        <button type="button" onClick={back} className={s.buttonBack}>
          <IoArrowBackOutline /> Back
        </button>
        <button type="button" onClick={addOrganization} className={s.buttonAddOrganization}>
          <IoAddCircleOutline /> Add Organization
        </button>
      </div>
    </div>
  );
}
