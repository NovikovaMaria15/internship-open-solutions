import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline, IoAddCircleOutline } from 'react-icons/io5';
import { Organization } from 'src/models/organzation';
import photo from '../../assets/favicon/photo.png';
import { useAppDispatch, RootState } from '../../store/store';
import { getOrganizations, addOrganizations } from '../../store/organization/organizationThunk';
import { logout } from '../../store/authorization/authorizationSlice';
import { OrganizationItems } from './OrganizationItems';
import { Modal } from '../Modal/Modal';

import s from './OrganizationStyles.module.scss';

export function Organization() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const organizations = useSelector((state: RootState) => state.organization.data);
  const [open, setOpen] = useState(false);

  const back = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const modalOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const modalClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getOrganizations());
  }, [dispatch]);

  const handleLogout: () => void = useCallback(() => {
    dispatch(logout());
    navigate('/');
  }, [navigate, dispatch]);

  const addOrganization: ({ name, address, INN }) => void = useCallback(
    ({ name, address, INN }) => {
      dispatch(addOrganizations({ name, address, INN }))
        .then((action) => {
          if (action.payload) {
            modalClose();
          } else {
            console.log('Неверные данные');
          }
        })
        .catch(() => {
          console.log('Неверные данные');
        });
    },
    [dispatch, modalClose],
  );

  return (
    <div>
      <div className={s.header}>
        <div className={s.photoHeader}>
          <img alt="photo1" className={s.photo} src={photo} />
        </div>
        <div> Organizations</div>
        <div className={s.division}>
          <div>Division </div>
        </div>
        <div className={s.employee}>
          <div>Employee</div>
        </div>
        <button type="button" onClick={handleLogout} className={s.logout}>
          Logout
        </button>
      </div>
      <div className={s.alignment}>
        <button type="button" onClick={back} className={s.buttonBack}>
          <IoArrowBackOutline /> Back
        </button>
        <button type="button" className={s.buttonAddOrganization} onClick={modalOpen}>
          <IoAddCircleOutline /> Add Organization
        </button>
      </div>
      <div className={s.line} />
      <div className={s.titleHeader}>
        <div className={s.userData}>
          <div className={s.column}>id</div>
          <div className={s.column}>name</div>
          <div className={s.column}>address</div>
          <div className={s.column}>INN</div>
          <div className={s.column}>Actions</div>
        </div>
      </div>
      <div className={s.line} />
      {organizations.map((data: Organization) => (
        <div key={data.id}>
          <OrganizationItems id={data.id} name={data.name} address={data.address} INN={data.INN} />
        </div>
      ))}
      {open && <Modal onSubmit={addOrganization} onClose={modalClose} />}
    </div>
  );
}
