// src/routes.tsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/payment',
    element: <PaymentPage />,
  },
  {
    path: '/payment-confirmation',
    element: <PaymentConfirmationPage />,
  },
]);