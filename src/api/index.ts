import axios from 'axios';

// export default axios
const axiosInstance = axios.create({
  baseURL: 'http://10.242.251.119:3000/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default axiosInstance;
export { login } from './services/authApi';