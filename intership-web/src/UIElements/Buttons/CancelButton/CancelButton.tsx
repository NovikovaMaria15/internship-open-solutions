import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './CancelButtonStyles.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};
export const CancelButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...rest} className={s.сancel}>
      {children}
    </button>
  );
};
