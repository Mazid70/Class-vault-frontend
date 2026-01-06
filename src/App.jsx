import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Components/Navbar/Navbar';
import { Toaster } from 'sonner';





const App = () => {
  return (
    <>
      {' '}
      <Navbar />
      <Outlet />
      <Toaster position="top-right" richColors />
    </>
  );
};

export default App;
