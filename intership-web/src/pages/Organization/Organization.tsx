import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline, IoAddCircleSharp } from 'react-icons/io5';
import { Organization } from 'Src/models/type';
import { NavigationButton } from 'Src/UIElements/Buttons/NavigationButton/NavigationButton';
import { useAppDispatch, RootState } from '../../store/store';
import { getOrganization, addOrganization } from '../../store/organization/organizationThunk';
import { OrganizationItems } from './OrganizationItems';
import { ModalOrganization } from '../Modal/ModalOrganization';

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
    dispatch(getOrganization());
  }, [dispatch]);

  const addOrganizations: ({ name, address, INN }) => void = useCallback(
    ({ name, address, INN }) => {
      dispatch(addOrganization({ name, address, INN }))
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
    <>
      <div className={s.alignment}>
        <NavigationButton onClick={back}>
          <IoArrowBackOutline /> Back
        </NavigationButton>
        <NavigationButton onClick={modalOpen}>
          <IoAddCircleSharp /> Add Organization
        </NavigationButton>
      </div>
      <div className={s.table}>
        <div className={`${s.header} ${s.row}`}>
          <div className={s.column}>id</div>
          <div className={s.column}>name</div>
          <div className={s.column}>address</div>
          <div className={s.column}>INN</div>
          <div className={s.column}>Actions</div>
        </div>
        {organizations.map((data: Organization) => (
          <OrganizationItems
            key={data.id}
            id={data.id}
            name={data.name}
            address={data.address}
            INN={data.INN}
          />
        ))}
      </div>
      {open && <ModalOrganization onSubmit={addOrganizations} onClose={modalClose} />}
    </>
  );
}
