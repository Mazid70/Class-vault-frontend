import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useEffect } from 'react';
import useCallData from '../customHooks/useCallData';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosData = useCallData();
  const queryClient = useQueryClient();

  // ========================
  // Fetch current user
  // ========================
  const fetchUser = async () => {
    try {
      const res = await axiosData.get('/users/me');
      return res.data.user;
    } catch (err) {
      // If 401, try refreshing token
      if (err.response?.status === 401) {
        try {
          await axiosData.post('/users/refresh'); // refresh access token
          const retryRes = await axiosData.get('/users/me'); // retry fetching user
          return retryRes.data.user;
        } catch (refreshErr) {
          console.log('Refresh failed:', refreshErr);
          throw refreshErr;
        }
      } else {
        throw err;
      }
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

  // ========================
  // Logout function
  // ========================
  const handleLogout = async () => {
    try {
      await axiosData.post('/users/logout');
      queryClient.removeQueries(['user']); // clear user cache
      window.location.reload(); // full refresh
    } catch (err) {
      console.log(err);
    }
  };

  // Optional: auto refetch user on mount
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
