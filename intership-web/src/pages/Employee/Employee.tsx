import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackOutline, IoAddCircleSharp } from 'react-icons/io5';
import { Employee } from 'Src/models/type';
import { useAppDispatch, RootState } from '../../store/store';
import { getEmpoyee, addEmployee } from '../../store/employee/employeeThunk';
import { EmployeeItems } from './EmployeeItems';
import { ModalEmloyee } from '../Modal/ModalEmloyee';
import { NavigationButton } from '../../UIElements/Buttons/index';

import s from './EmployeeStyles.module.scss';

export function Employee() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employee = useSelector((state: RootState) => state.employee.data);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const divisionId = params.id;

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
    dispatch(getEmpoyee({ divisionId }));
  }, [dispatch, divisionId]);

  const addEmployees: ({ id_division, FIO, address, position }) => void = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (params) => {
      dispatch(
        addEmployee({
          id_division: divisionId,
          FIO: params.FIO,
          address: params.address,
          position: params.position,
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
    [dispatch, modalClose, divisionId],
  );

  return (
    <>
      <div className={s.alignment}>
        <NavigationButton onClick={back}>
          <IoArrowBackOutline /> Back
        </NavigationButton>
        <NavigationButton onClick={modalOpen}>
          <IoAddCircleSharp /> Add Employee
        </NavigationButton>
      </div>
      <div className={s.table}>
        <div className={`${s.header} ${s.row}`}>
          <div className={s.column}>id</div>
          <div className={s.column}>id_division</div>
          <div className={s.column}>FIO</div>
          <div className={s.column}>address</div>
          <div className={s.column}>position</div>
          <div className={s.column}>Actions</div>
        </div>
        {employee.map((data: Employee) => (
          <EmployeeItems
            key={data.id}
            id={data.id}
            FIO={data.FIO}
            id_division={data.id_division}
            address={data.address}
            position={data.position}
          />
        ))}
      </div>
      {open && <ModalEmloyee onSubmit={addEmployees} onClose={modalClose} />}
    </>
  );
}
