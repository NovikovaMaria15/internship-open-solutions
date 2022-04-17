import React, { useState, useCallback } from 'react';
import { IoPencilSharp, IoTrash } from 'react-icons/io5';
import { Employee } from 'Src/models/type';
import { useAppDispatch } from '../../store/store';
import { deleteEmployee, editEmployee } from '../../store/employee/employeeThunk';
import { ModalConfirmation } from '../../components/Modal/ModalConfirmation';
import { ModalEmloyee } from '../../components/Modal/ModalEmloyee';

import s from './EmployeeStyles.module.scss';

// eslint-disable-next-line camelcase
export const EmployeeItems: React.FC<Employee> = ({ id, id_division, FIO, address, position }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const confirmationOpen = useCallback(() => {
    setConfirmation(true);
  }, []);

  const confirmationClose = useCallback(() => {
    setConfirmation(false);
  }, []);

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
    (params) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(
        editEmployee({
          FIO: params.FIO,
          address: params.address,
          position: params.position,
          employeeId: id,
        }),
      ).then((action) => {
        if (action.payload) {
          modalClose();
        }
      });
    },
    [dispatch, id, modalClose],
  );

  return (
    <>
      <div className={s.row}>
        <div className={s.column}> {id}</div>
        {/* eslint-disable-next-line camelcase */}
        <div className={s.column}> {id_division}</div>
        <div className={s.column}> {FIO}</div>
        <div className={s.column}> {address}</div>
        <div className={s.column}> {position} </div>
        <div className={`${s.column} ${s.icons}`}>
          <IoPencilSharp onClick={modalOpen} />
          <IoTrash onClick={confirmationOpen} />
        </div>
      </div>
      {confirmation && (
        <ModalConfirmation onSubmit={deleteEmployees} confirmationClose={confirmationClose} />
      )}
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
