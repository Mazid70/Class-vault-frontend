import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
import axiosData from '../customHooks/useCallData'; // আপনার axios instance

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const fetchUser = async () => {
    try {
      // প্রথমে access_token দিয়ে try
      const res = await axiosData.get('/users/me');
      return res.data.user;
    } catch (err) {
      // যদি 401 আসে → refresh token দিয়ে auto retry
      if (err.response?.status === 401) {
        try {
          await axiosData.post('/refresh-token'); // refresh token route
          const resRetry = await axiosData.get('/users/me'); // retry
          return resRetry.data.user;
        } catch (refreshErr) {
          throw refreshErr; // refresh token failed → user must login again
        }
      }
      throw err; // অন্য error
    }
  };

  const {
    data: user = null,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    retry: false,
    staleTime: 0,
  });

  const handleLogout = async () => {
    try {
      await axiosData.post('/users/logout');
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, refetch, isLoading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
