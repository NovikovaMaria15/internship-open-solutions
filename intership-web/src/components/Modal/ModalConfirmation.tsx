import React from 'react';
import Modal from './Modal';
import { BlueButton } from '../../UIElements/Buttons/BlueButton/BlueButton';
import s from './Modal.module.scss';

type Props = {
  confirmationClose: () => void;
  onSubmit: (params) => void;
};

export const ModalConfirmation: React.FC<Props> = ({ confirmationClose, onSubmit }) => {
  return (
    <Modal>
      <div className={s.questionForm}>
        <h3> Вы уверенны? </h3>
        <div className={s.line} />
        <div className={s.yesAndNo}>
          <BlueButton type="button" className={s.сancel} onClick={confirmationClose}>
            Нет
          </BlueButton>
          <BlueButton type="button" className={s.сancel} onClick={onSubmit}>
            Да
          </BlueButton>
        </div>
      </div>
    </Modal>
  );
};
