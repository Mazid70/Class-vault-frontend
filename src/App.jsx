import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Components/Navbar/Navbar';



const App = () => {
  return (
    <> <Navbar/>
   <Outlet/></>
   
  );
};

export default App;
