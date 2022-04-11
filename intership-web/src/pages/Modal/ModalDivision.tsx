import React, { useState, useCallback, ChangeEventHandler, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.scss';

export function ModalDivision({
  onClose,
  onSubmit,
  name,
  phone,
}: {
  onClose: () => void;
  onSubmit: (params) => void;
  name?: string;
  phone?: string | number;
}) {
  const [nameValue, setName] = useState(name || '');
  const [phoneValue, setPhone] = useState(phone || '');

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [],
  );

  const handleChangePhone: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPhone(event.target.value);
    },
    [],
  );

  const formSubmit: () => void = useCallback(() => {
    onSubmit({ name: nameValue, phone: phoneValue });
  }, [onSubmit, nameValue, phoneValue]);

  return ReactDOM.createPortal(
    <div className={s.modal}>
      <div className={s.shellModul}>
        <h3 className={s.paddingLeft}>Add Division</h3>
        <div className={s.line} />
        <div className={s.paddingLeft}>
          <div>Division Name</div>
          <input className={s.input} type="text" value={nameValue} onChange={handleChangeName} />
          <div>Division`s Phone</div>
          <input className={s.input} type="text" value={phoneValue} onChange={handleChangePhone} />
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
