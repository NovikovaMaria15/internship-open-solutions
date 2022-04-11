import React, { useState, useCallback, ChangeEventHandler, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.scss';

export function ModalEmloyee({
  onClose,
  onSubmit,
  FIO,
  address,
  position,
}: {
  onClose: () => void;
  onSubmit: (params) => void;
  FIO?: string;
  address?: string;
  position?: string;
}) {
  const [FIOValue, setFIO] = useState(FIO || '');
  const [addressValue, setAddress] = useState(address || '');
  const [positionValue, setPosition] = useState(position || '');

  const handleChangeFIO: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFIO(event.target.value);
    },
    [],
  );

  const handleChangeAddress: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    },
    [],
  );

  const handleChangePosition: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPosition(event.target.value);
    },
    [],
  );

  const formSubmit: () => void = useCallback(() => {
    onSubmit({ FIO: FIOValue, address: addressValue, position: positionValue });
  }, [onSubmit, FIOValue, addressValue, positionValue]);

  return ReactDOM.createPortal(
    <div className={s.modal}>
      <div className={s.shellModul}>
        <h3 className={s.paddingLeft}>Add Employee</h3>
        <div className={s.line} />
        <div className={s.paddingLeft}>
          <div>Фамилия Имя Отчество</div>
          <input className={s.input} type="text" value={FIOValue} onChange={handleChangeFIO} />
          <div>Employee Address</div>
          <input
            className={s.input}
            type="text"
            value={addressValue}
            onChange={handleChangeAddress}
          />
          <div>Employees`s Position</div>
          <input
            className={s.input}
            type="text"
            value={positionValue}
            onChange={handleChangePosition}
          />
        </div>
        <div className={s.line} />
        <div className={s.сancelAndAdd}>
          <button type="button" className={s.сancel} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={s.add} onClick={formSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>,
    document.querySelector('#portal')!,
  );
}
