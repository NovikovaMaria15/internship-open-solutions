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
  FIO?: string;
  address?: string;
  position?: string;
};

export const ModalEmloyee: React.FC<Props> = ({ onClose, onSubmit, FIO, address, position }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      FIO: FIO || '',
      address: address || '',
      position: position || '',
    },
    mode: 'onChange',
  });

  return (
    <Modal>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.shellModul}>
          <h3 className={s.paddingLeft}>Add Employee</h3>
          <div className={s.line} />
          <div className={s.paddingLeft}>
            <div>Фамилия Имя Отчество</div>
            <input
              className={s.input}
              {...register('FIO', {
                required: true,
                minLength: { value: 5, message: ERROR_MESSAGE },
              })}
            />
            <div className={s.message}>{errors?.FIO && <div>{errors.FIO.message}</div>}</div>
            <div>Employee Address</div>
            <input
              className={s.input}
              {...register('address', {
                required: true,
                minLength: { value: 5, message: ERROR_MESSAGE },
              })}
            />
            <div className={s.message}>
              {errors?.address && <div>{errors.address.message}</div>}
            </div>
            <div>Employees`s Position</div>
            <input
              className={s.input}
              {...register('position', {
                required: true,
                minLength: { value: 5, message: ERROR_MESSAGE },
              })}
            />
            <div className={s.message}>
              {errors?.position && <div>{errors.position.message}</div>}
            </div>
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
