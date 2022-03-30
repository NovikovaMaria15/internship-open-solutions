import React, { useState, useCallback, ChangeEventHandler, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import photo from '../../assets/favicon/photo.png';
import { useAppDispatch } from '../../store/store';
import authorization from '../../store/authorization/authorizationThunk';

import s from './LoginStyles.module.scss';

const LOGIN_REGEXP = /^[a-z]+([_-]?[\da-z]+){0,2}$/;
const PASSWORD_REGEXP = /(?=.*?\d).{3,}/;

export const Login: React.FC = () => {
  const [login, setLogin] = useState('');
  const [loginValid, setLoginValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [password, setPassword] = useState('');
  const [checkbox, setCheckbox] = useState('');
  const [mistake, setMistake] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChangeLogin: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setLogin(event.target.value);
      setLoginValid(LOGIN_REGEXP.test(event.target.value));
    },
    [],
  );

  const handleChangePassword: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
      setPasswordValid(PASSWORD_REGEXP.test(event.target.value));
    },
    [],
  );

  const handleChangeCheckbox: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCheckbox(event.target.value);
    },
    [],
  );

  const organization: () => void = useCallback(() => {
    dispatch(authorization({ login, password }))
      .then((action) => {
        if (action.payload) {
          navigate('/organization', { replace: true });
        } else {
          setMistake('Неверные данные');
        }
      })
      .catch(() => {
        setMistake('Неверные данные');
      });
  }, [dispatch, login, password, navigate]);

  return (
    <div className={s.background}>
      <div className={s.photo}>
        <img alt="pop" src={photo} />
      </div>
      <div className={s.login}>
        <h2>Plase sing in</h2>
      </div>
      <div className={s.offsetFromInput}>
        <input className={s.input} maxLength={20} value={login} onChange={handleChangeLogin} />
        {!loginValid && <div className={s.error}> Неверный логин </div>}
      </div>
      <div>
        <input
          className={s.input}
          type="password"
          maxLength={8}
          value={password}
          onChange={handleChangePassword}
        />
        {!passwordValid && <div className={s.error}> Неверный пароль </div>}
      </div>
      <div className={s.alignment}>
        <input
          className={s.remember}
          type="checkbox"
          value={checkbox}
          onChange={handleChangeCheckbox}
        />
        <div className={s.indent}> Remember me </div>
      </div>
      <button type="button" onClick={organization} className={s.button}>
        Sign in
      </button>
      {mistake}
      <div className={s.year}> 2020-2021 </div>
    </div>
  );
};
