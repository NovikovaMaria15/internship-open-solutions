import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './BlueButtonStyles.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const BlueButton: React.FC<Props> = ({ children, ...rest }) => {
  return (
    // eslint-disable-next-line react/button-has-type
    <button {...rest} className={s.blueBatton}>
      {children}
    </button>
  );
};
