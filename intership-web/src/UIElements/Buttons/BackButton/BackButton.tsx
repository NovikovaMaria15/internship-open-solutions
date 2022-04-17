import React, { useCallback } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { NavigationButton } from '../NavigationButton/NavigationButton';

export function BackButton() {
  const navigate = useNavigate();
  const back = useCallback(() => navigate(-1), [navigate]);

  return (
    <NavigationButton onClick={back}>
      <IoArrowBackOutline /> Back
    </NavigationButton>
  );
}
