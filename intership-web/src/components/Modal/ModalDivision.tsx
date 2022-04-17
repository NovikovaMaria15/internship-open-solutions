import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { BlueButton } from '../../UIElements/Buttons/BlueButton/BlueButton';
import { CancelButton } from '../../UIElements/Buttons/CancelButton/CancelButton';
import s from './Modal.module.scss';

const ERROR_MESSAGE = 'Минимум 5 символов';

type Props = {
  onClose: () => void;
  onSubmit: (params) => void;
  name?: string;
  phone?: string | number;
};

export const ModalDivision: React.FC<Props> = ({ onClose, onSubmit, name, phone }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name || '',
      phone: phone || '',
    },
    mode: 'onChange',
  });

  return (
    <Modal>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.shellModul}>
          <h3 className={s.paddingLeft}>Add Division</h3>
          <div className={s.line} />
          <div className={s.paddingLeft}>
            <div>Division Name</div>
            <input
              className={s.input}
              {...register('name', {
                required: true,
                minLength: { value: 5, message: ERROR_MESSAGE },
              })}
            />
            <div className={s.message}>{errors?.name && <div>{errors.name.message}</div>}</div>
            <div>Division`s Phone</div>
            <input
              className={s.input}
              {...register('phone', {
                required: true,
                minLength: { value: 5, message: ERROR_MESSAGE },
              })}
            />
            <div className={s.message}>{errors?.phone && <div>{errors.phone.message}</div>}</div>
          </div>
          <div className={s.line} />
          <div className={s.сancelAndAdd}>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <BlueButton type="submit">Add</BlueButton>
          </div>
        </div>
      </form>
    </Modal>
  );
};
