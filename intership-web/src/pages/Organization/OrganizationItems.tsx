import React, { useState, useCallback } from 'react';
import { IoArrowForwardOutline, IoPencilSharp, IoTrash } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { deleteOrganization, editOrganizations } from 'Src/store/organization/organizationThunk';
import { Organization } from 'Src/models/type';
import { useAppDispatch } from '../../store/store';
import { ModalOrganization } from '../Modal/ModalOrganization';

import s from './OrganizationStyles.module.scss';

export const OrganizationItems = ({ id, name, address, INN }: Organization) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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

  const division = useCallback(() => {
    navigate(`/division/${id}`);
  }, [navigate, id]);

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
    <>
      <div className={s.row}>
        <div className={s.column}> {id}</div>
        <div className={s.column}> {name}</div>
        <div className={s.column}> {address}</div>
        <div className={s.column}> {INN}</div>
        <div className={`${s.column} ${s.icons}`}>
          <IoArrowForwardOutline onClick={division} />
          <IoPencilSharp onClick={modalOpen} />
          <IoTrash onClick={deleteOrganizations} />
        </div>
      </div>
      {open && (
        <ModalOrganization
          onSubmit={editOrganization}
          name={name}
          address={address}
          INN={INN}
          onClose={modalClose}
        />
      )}
    </>
  );
};

export default OrganizationItems;
