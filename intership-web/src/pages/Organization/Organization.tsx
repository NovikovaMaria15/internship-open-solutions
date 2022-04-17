import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Organization } from 'Src/models/type';
import { NavigationButton } from 'Src/UIElements/Buttons/NavigationButton/NavigationButton';
import { useAppDispatch, RootState } from '../../store/store';
import { getOrganization, addOrganization } from '../../store/organization/organizationThunk';
import { OrganizationItems } from './OrganizationItems';
import { ModalOrganization } from '../../components/Modal/ModalOrganization';
import { BackButton } from '../../UIElements/Buttons/BackButton/BackButton';

import s from './OrganizationStyles.module.scss';

export function Organization() {
  const dispatch = useAppDispatch();
  const organizations = useSelector((state: RootState) => state.organization.data);
  const [open, setOpen] = useState(false);

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
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(addOrganization({ name, address, INN })).then((action) => {
        if (action.payload) {
          modalClose();
        }
      });
    },
    [dispatch, modalClose],
  );

  return (
    <>
      <div className={s.alignment}>
        <BackButton />
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
