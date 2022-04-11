import React, { useState, useCallback } from 'react';
import { IoArrowForwardOutline, IoPencilSharp, IoTrash } from 'react-icons/io5';
import { deleteOrganization, editOrganizations } from 'Src/store/organization/organizationThunk';
import { Organization } from 'src/models/organzation';
import { useAppDispatch } from '../../store/store';
import { Modal } from '../Modal/Modal';

import s from './OrganizationStyles.module.scss';

export const OrganizationItems = ({ id, name, address, INN }: Organization) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const deleteOrganizations: () => void = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(deleteOrganization({ organizationId: id }));
  }, [dispatch, id]);

  const modalOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const modalClose = useCallback(() => {
    setOpen(false);
  }, []);

  const editOrganization: (params) => void = useCallback(
    (params) => {
      dispatch(
        editOrganizations({
          organizationId: id,
          name: params.name,
          address: params.address,
          INN: params.INN,
        }),
      )
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
    [dispatch, modalClose, id],
  );

  return (
    <div>
      <div className={s.userData}>
        <div className={s.column}> {id}</div>
        <div className={s.column}> {name}</div>
        <div className={s.column}> {address}</div>
        <div className={s.column}> {INN}</div>
        <div className={s.icons}>
          <IoArrowForwardOutline />
          <IoPencilSharp onClick={modalOpen} />
          <IoTrash onClick={deleteOrganizations} />
        </div>
      </div>
      <div className={s.line} />
      {open && (
        <Modal
          onSubmit={editOrganization}
          name={name}
          address={address}
          INN={INN}
          onClose={modalClose}
        />
      )}
    </div>
  );
};

export default OrganizationItems;
