import React, { ReactNode } from 'react';
import s from './NavigationButtonStyles.module.scss';

type Props = {
  children: ReactNode;
  onClick: () => void;
};

export const NavigationButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button type="button" className={s.navigationButton} onClick={onClick}>
      {children}
    </button>
  );
};
