import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { BlueButton } from '../../UIElements/Buttons/BlueButton/BlueButton';
import { CancelButton } from '../../UIElements/Buttons/CancelButton/CancelButton';
import s from './Modal.module.scss';

const ERROR_MESSAGE = 'Минимум 5 символов';

type Props = {
  onSubmit: (params) => void;
  onClose: () => void;
  name?: string;
  address?: string;
  INN?: number;
};

export const ModalOrganization: React.FC<Props> = ({ onSubmit, onClose, name, address, INN }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: name || '',
      address: address || '',
      INN: INN || '',
    },
    mode: 'onChange',
  });
  return (
    <Modal>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <h3 className={s.paddingLeft}>Add Organization</h3>
        <div className={s.line} />
        <div className={s.paddingLeft}>
          <div>Organization Name</div>
          <input
            className={s.input}
            {...register('name', {
              required: true,
              minLength: { value: 5, message: ERROR_MESSAGE },
            })}
          />
          <div className={s.message}>{errors?.name && <div>{errors.name.message}</div>}</div>
          <div>Organization Address</div>
          <input
            className={s.input}
            {...register('address', {
              required: true,
              minLength: { value: 5, message: ERROR_MESSAGE },
            })}
          />
          <div className={s.message}>{errors?.address && <div>{errors.address.message}</div>}</div>
          <div>Organization`s INN</div>
          <input
            className={s.input}
            {...register('INN', {
              required: true,
              minLength: { value: 5, message: ERROR_MESSAGE },
            })}
          />
          <div className={s.message}>{errors?.INN && <div>{errors.INN.message}</div>}</div>
        </div>
        <div className={s.line} />
        <div className={s.сancelAndAdd}>
          <CancelButton type="button" onClick={onClose}>
            Cancel
          </CancelButton>
          <BlueButton type="submit">Add</BlueButton>
        </div>
      </form>
    </Modal>
  );
};
