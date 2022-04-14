/* eslint-disable camelcase */
import React, { useState, useCallback } from 'react';
import { IoPencilSharp, IoTrash } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { Employee } from 'Src/models/type';
import { useAppDispatch } from '../../store/store';
import { deleteEmployee, editEmployee } from '../../store/employee/employeeThunk';

import s from './EmployeeStyles.module.scss';
import { ModalEmloyee } from '../Modal/ModalEmloyee';

// eslint-disable-next-line camelcase
export const EmployeeItems = ({ id, id_division, FIO, address, position }: Employee) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const divisionId = params.id;

  const modalOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const modalClose = useCallback(() => {
    setOpen(false);
  }, []);

  const deleteEmployees: () => void = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(deleteEmployee({ employeeId: id }));
  }, [dispatch, id]);

  const editEmployees: (params) => void = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (params) => {
      dispatch(
        editEmployee({
          id_division: divisionId,
          FIO: params.FIO,
          address: params.address,
          position: params.position,
          employeeId: id,
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
    [dispatch, divisionId, id, modalClose],
  );

  return (
    <>
      <div className={s.row}>
        <div className={s.column}> {id}</div>
        <div className={s.column}> {id_division}</div>
        <div className={s.column}> {FIO}</div>
        <div className={s.column}> {address}</div>
        <div className={s.column}> {position} </div>
        <div className={`${s.column} ${s.icons}`}>
          <IoPencilSharp onClick={modalOpen} />
          <IoTrash onClick={deleteEmployees} />
        </div>
      </div>
      {open && (
        <ModalEmloyee
          onSubmit={editEmployees}
          FIO={FIO}
          address={address}
          position={position}
          onClose={modalClose}
        />
      )}
    </>
  );
};

export default EmployeeItems;
