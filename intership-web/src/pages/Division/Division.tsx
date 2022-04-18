import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Division } from 'Src/models/type';
import { useAppDispatch, RootState } from '../../store/store';
import { getDivision, addDivision } from '../../store/division/divisionThunk';
import { DivisionItems } from './DivisionItems';
import { ModalDivision } from '../../components/Modal/ModalDivision';
import { NavigationButton } from '../../UIElements/Buttons/index';
import { BackButton } from '../../UIElements/Buttons/BackButton/BackButton';

import s from './DivisionStyles.module.scss';

export function Division() {
  const dispatch = useAppDispatch();
  const division = useSelector((state: RootState) => state.division.data);
  const [open, setOpen] = useState(false);
  const parameters = useParams();
  const organizationId = parameters.id;

  const modalOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const modalClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getDivision({ organizationId }));
  }, [dispatch, organizationId]);

  const addDivisions: ({ name, phone }) => void = useCallback(
    (params) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(
        addDivision({
          organizationId,
          name: params.name,
          phone: params.phone,
        }),
      ).then((action) => {
        if (action.payload) {
          modalClose();
        }
      });
    },
    [dispatch, modalClose, organizationId],
  );

  return (
    <>
      <div className={s.alignment}>
        <BackButton />
        <NavigationButton onClick={modalOpen}>
          <IoAddCircleSharp /> Add Division
        </NavigationButton>
      </div>
      <div className={s.table}>
        <div className={`${s.header} ${s.row}`}>
          <div className={s.column}>id</div>
          <div className={s.column}>id_organization</div>
          <div className={s.column}>name</div>
          <div className={s.column}>phone</div>
          <div className={s.column}>Actions</div>
        </div>
        {division.map((data: Division) => (
          <DivisionItems
            key={data.id}
            id={data.id}
            name={data.name}
            id_organization={data.id_organization}
            phone={data.phone}
          />
        ))}
      </div>
      {open && <ModalDivision onSubmit={addDivisions} onClose={modalClose} />}
    </>
  );
}
