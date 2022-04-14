import React from 'react';
import s from './NavigationButtonStyles.module.scss';

export function NavigationButton({ children, onClick }) {
  return (
    <button type="button" className={s.navigationButton} onClick={onClick}>
      {children}
    </button>
  );
}
