import { createContext, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosData from '../customHooks/useCallData';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const fetchUser = async () => {
    try {
      const res = await axiosData.get('/users/me');
      return res.data.user;
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          await axiosData.post('/users/refresh');
          const retryRes = await axiosData.get('/users/me');
          return retryRes.data.user;
        } catch {
          return null;
        }
      } else throw err;
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
      queryClient.removeQueries(['user']);
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <AuthContext.Provider value={{ user, refetch, isLoading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
