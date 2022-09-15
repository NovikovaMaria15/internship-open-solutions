import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Division } from 'Src/models/type';
import { useAppDispatch, RootState } from '../../store/store';
import { getDivision, addDivision } from '../../store/division/divisionThunk';
import { DivisionItems } from './DivisionItems';
import { ModalDivision } from '../../components/Modal/ModalDivision';
import { NavigationButton } from '../../UIElements/Buttons/index';
import { BackButton } from '../../UIElements/Buttons/BackButton/BackButton';

import s from './DivisionStyles.module.scss';

export function Division() {
  const dispatch = useAppDispatch();
  const division = useSelector((state: RootState) => state.division.data);
  const [open, setOpen] = useState(false);
  const parameters = useParams();
  const organizationId = parameters.id;

  const modalOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const modalClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getDivision({ organizationId }));
  }, [dispatch, organizationId]);

  const addDivisions: ({ name, phone }) => void = useCallback(
    (params) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      dispatch(
        addDivision({
          organizationId,
          name: params.name,
          phone: params.phone,
        }),
      ).then((action) => {
        if (action.payload) {
          modalClose();
        }
      });
    },
    [dispatch, modalClose, organizationId],
  );
  console.log('division', division);
  return (
    <>
      <div className={s.alignment}>
        <BackButton />
        <NavigationButton onClick={modalOpen}>
          <IoAddCircleSharp /> Add Division
        </NavigationButton>
      </div>
      <div className={s.table}>
        <div className={`${s.header} ${s.row}`}>
          <div className={s.column}>id</div>
          <div className={s.column}>id_organization</div>
          <div className={s.column}>name</div>
          <div className={s.column}>phone</div>
          <div className={s.column}>Actions</div>
        </div>
        {division.map((data: Division) => (
          <DivisionItems
            key={data.id}
            id={data.id}
            name={data.name}
            id_organization={data.id_organization}
            phone={data.phone}
          />
        ))}
      </div>
      {open && <ModalDivision onSubmit={addDivisions} onClose={modalClose} />}
    </>
  );
}





body {
    .ui - slider - active {
    cursor: -webkit - grabbing;
    cursor: grabbing;
  }
}

.box {
  --primary: #275efe;
  --headline: #3F4656;
  --text: #99A3BA;
  width: 100 %;
  max - width: 312px;
  padding: 36px 32px 48px 32px;
  background: #fff;
  border - radius: 9px;
  box - shadow: 0 1px 4px rgba(18, 22, 33, 0.12);
    h3 {
    font - family: inherit;
    font - size: 32px;
    font - weight: 700;
    margin: 0 0 20px 0;
    color: var(--headline);
        span {
      font - weight: 500;
    }
        .values {
      margin: 0;
      font - weight: 500;
      color: var(--primary);
            > div: first - child {
        margin - right: 2px;
      }
            > div: last - child {
        margin - left: 2px;
      }
    }
        small {
      color: var(--text);
      display: block;
      margin - top: 8px;
      font - size: 14px;
            div {
        display: inline - block;
        vertical - align: top;
      }
    }
  }
}

.box.slider {
  margin - top: 40px;
}

.slider {
  --primary: #275efe;
  --handle: #fff;
  --handle - active: #becfff;
  --handle - hover: #e9efff;
  --handle - border: 2px solid var(--primary);
  --line: #cdd9ed;
  --line - active: var(--primary);
  height: 23px;
  width: 100 %;
  position: relative;
  pointer - events: none;
}
.slider.ui - slider - handle {
  --y: 0;
  --background: var(--handle);
  cursor: -webkit - grab;
  cursor: grab;
  -webkit - tap - highlight - color: transparent;
  top: 0;
  width: 23px;
  height: 23px;
  -webkit - transform: translateX(-50 %);
  transform: translateX(-50 %);
  position: absolute;
  outline: none;
  display: block;
  pointer - events: auto;
}
.slider.ui - slider - handle div {
  width: 23px;
  height: 23px;
  border - radius: 50 %;
  transition: background .4s ease;
  -webkit - transform: translateY(calc(var(--y) * 1px));
  transform: translateY(calc(var(--y) * 1px));
  border: var(--handle - border);
  background: var(--background);
}
.slider.ui - slider - handle:hover {
  --background: var(--handle - hover);
}
.slider.ui - slider - handle:active {
  --background: var(--handle - active);
  cursor: -webkit - grabbing;
  cursor: grabbing;
}
.slider svg {
  --stroke: var(--line);
  display: block;
  height: 83px;
}
.slider svg path {
  fill: none;
  stroke: var(--stroke);
  stroke - width: 1;
}
.slider.active, .slider > svg {
  position: absolute;
  top: -30px;
  height: 83px;
}
.slider > svg {
  left: 0;
  width: 100 %;
}
.slider.active {
  position: absolute;
  overflow: hidden;
  left: calc(var(--l) * 1px);
  right: calc(var(--r) * 1px);
}
.slider.active svg {
  --stroke: var(--line - active);
  position: relative;
  left: calc(var(--l) * -1px);
  right: calc(var(--r) * -1px);
}
.slider.active svg path {
  stroke - width: 2;
}

html {
  box - sizing: border - box;
  -webkit - font - smoothing: antialiased;
}

* {
  box- sizing: inherit;
}
*: before, *:after {
  box - sizing: inherit;
}

body {
  min - height: 100vh;
  display: flex;
  justify - content: center;
  align - items: center;
  font - family: 'Roboto', Arial;
  background: #CDD9ED;
}
body.dribbble {
  position: fixed;
  display: block;
  right: 20px;
  bottom: 20px;
}
body.dribbble img {
  display: block;
  height: 28px;
}
