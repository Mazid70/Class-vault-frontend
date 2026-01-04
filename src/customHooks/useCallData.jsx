import axios from "axios";

const axiosData = axios.create({
  baseURL: 'https://classvaultserver.vercel.app',
  withCredentials: true,
});

const useCallData = () => {
  return axiosData
};

export default useCallData;