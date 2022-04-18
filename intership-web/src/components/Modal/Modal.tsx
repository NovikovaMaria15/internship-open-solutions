import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.scss';

type Props = {
  children: ReactNode;
};

const Modal: React.FC<Props> = ({ children }) => {
  return ReactDOM.createPortal(
    <div className={s.modal}>{children}</div>,
    document.querySelector('#portal') as HTMLElement,
  );
};

export default Modal;
