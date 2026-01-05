import { useQuery } from '@tanstack/react-query';
import React, { createContext, useState } from 'react';
import useCallData from '../customHooks/useCallData';
export const AuthContext=createContext(null)
const AuthProvider = ({ children }) => {
  const axiosData=useCallData()
   const { data:user, refetch } = useQuery({
    queryKey: ['user'],
    queryFn:async () =>{try {
      const res = await axiosData.get('/users/me');
      return res.data.user;
    } catch (error) {
      return error
    }},
   })
  const handleLogout = async() =>{
      try {
        await axiosData.post('/users/logout')
        refetch()
        window.location.reload()
      } catch (error) {
        console.log()
      }
    }
  const value = {
    user,
    refetch,
    handleLogout
  }
  
  return (
    <AuthContext.Provider value={ value} >{ children}</AuthContext.Provider>
  );
};

export default AuthProvider;