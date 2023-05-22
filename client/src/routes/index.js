import React from 'react';
import Auth from '../pages/Auth';
import Admin from '../pages/Admin';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  ERROR_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from '../utils/consts';
import Basket from '../pages/Basket';
import Shop from '../pages/Shop';
import DevicePage from '../pages/DevicePage';
import ErrorPage from '../pages/ErrorPage';

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    element: <Shop />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Auth />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Auth />,
  },
  {
    path: DEVICE_ROUTE + '/:id',
    element: <DevicePage />,
  },
  {
    path: ERROR_ROUTE,
    element: <ErrorPage />,
  },
];

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <Admin />,
  },
  {
    path: BASKET_ROUTE + '/:id',
    element: <Basket />,
  },
];
