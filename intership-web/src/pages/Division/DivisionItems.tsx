import React, { useState, useCallback } from 'react';
import { IoArrowForwardOutline, IoPencilSharp, IoTrash } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { Division } from 'Src/models/type';
import { useAppDispatch } from '../../store/store';
import { ModalDivision } from '../../components/Modal/ModalDivision';
import { deleteDivision, editDivision } from '../../store/division/divisionThunk';
import { ModalConfirmation } from '../../components/Modal/ModalConfirmation';

import s from './DivisionStyles.module.scss';

// eslint-disable-next-line camelcase
export const DivisionItems: React.FC<Division> = ({ id, name, id_organization, phone }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const parameters = useParams();
  const organizationId = parameters.id;
  const [confirmation, setConfirmation] = useState(false);

  const confirmationOpen = useCallback(() => {
    setConfirmation(true);
  }, []);

  const confirmationClose = useCallback(() => {
    setConfirmation(false);
  }, []);

  const employee = useCallback(() => {
    navigate(`/employee/${id}`);
  }, [navigate, id]);

  const modalOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const modalClose = useCallback(() => {
    setOpen(false);
  }, []);

  const deleteDivisions: () => void = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(deleteDivision({ divisionId: id }));
  }, [dispatch, id]);

  const editOrganizations: (params) => void = useCallback(
    (params) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(
        editDivision({
          organizationId,
          name: params.name,
          phone: params.phone,
          divisionId: id,
        }),
      ).then((action) => {
        if (action.payload) {
          modalClose();
        }
      });
    },
    [dispatch, organizationId, id, modalClose],
  );

  return (
    <>
      <div className={s.row}>
        <div className={s.column}> {id}</div>
        {/* eslint-disable-next-line camelcase */}
        <div className={s.column}> {id_organization}</div>
        <div className={s.column}> {name}</div>
        <div className={s.column}> {phone}</div>
        <div className={`${s.column} ${s.icons}`}>
          <IoArrowForwardOutline onClick={employee} />
          <IoPencilSharp onClick={modalOpen} />
          <IoTrash onClick={confirmationOpen} />
        </div>
      </div>
      {confirmation && (
        <ModalConfirmation onSubmit={deleteDivisions} confirmationClose={confirmationClose} />
      )}
      {open && (
        <ModalDivision
          onSubmit={editOrganizations}
          name={name}
          phone={phone}
          onClose={modalClose}
        />
      )}
    </>
  );
};

export default DivisionItems;
