import { BrowserRouter } from 'react-router-dom';
import React, { createContext } from 'react';
import UserStore from '../store/UserStore';
import DeviceStore from '../store/DeviceStore';

export const Context = createContext(null);

const Providers = ({ children }) => {
  return (
    <Context.Provider value={{ user: new UserStore(), devices: new DeviceStore() }}>
      <BrowserRouter>{children}</BrowserRouter>
    </Context.Provider>
  );
};
export default Providers;
