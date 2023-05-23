import { Route, Routes } from 'react-router-dom';
import React, { useContext } from 'react';
import { authRoutes, publicRoutes } from '../routes';
import { Context } from './Providers';
import MainLayout from '../layouts/MainLayout';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  return (
    <Routes>
      <Route
        path="/"
        element={<MainLayout />}
      >
        {user.isAuth &&
          authRoutes.map(({ path, element }) => (
            <Route
              path={path}
              element={element}
              key={path}
            />
          ))}
        {publicRoutes.map(({ path, element }) => (
          <Route
            path={path}
            element={element}
            key={path}
          />
        ))}
      </Route>
    </Routes>
  );
});
export default AppRouter;
