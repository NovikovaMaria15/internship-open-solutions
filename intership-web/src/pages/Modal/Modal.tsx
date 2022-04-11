import React, { useState, useCallback, ChangeEventHandler, ChangeEvent } from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.scss';

export function Modal({
  onClose,
  onSubmit,
  name,
  address,
  INN,
}: {
  onClose: () => void;
  onSubmit: (params) => void;
  name?: string;
  address?: string;
  INN?: string | number;
}) {
  const [nameValue, setName] = useState(name || '');
  const [addressValue, setAddress] = useState(address || '');
  const [INNValue, setINN] = useState(INN || '');

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [],
  );

  const handleChangAddress: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value);
    },
    [],
  );

  const handleChangeINN: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setINN(event.target.value);
    },
    [],
  );

  const formSubmit: () => void = useCallback(() => {
    onSubmit({ name: nameValue, address: addressValue, INN: INNValue });
  }, [onSubmit, nameValue, INNValue, addressValue]);

  return ReactDOM.createPortal(
    <div className={s.modal}>
      <div className={s.shellModul}>
        <h3 className={s.paddingLeft}>Add Organization</h3>
        <div className={s.line} />
        <div className={s.paddingLeft}>
          <div>Organization Name</div>
          <input className={s.input} type="text" value={nameValue} onChange={handleChangeName} />
          <div>Organization Address</div>
          <input
            className={s.input}
            type="text"
            value={addressValue}
            onChange={handleChangAddress}
          />
          <div>Organization`s INN</div>
          <input className={s.input} type="text" value={INNValue} onChange={handleChangeINN} />
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

export default Modal;
