import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Components/Navbar/NavBar';


const App = () => {
  return (
    <> <Navbar/>
   <Outlet/></>
   
  );
};

export default App;
