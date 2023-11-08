import axios from 'axios';

// export default axios
const axiosInstance = axios.create({
  baseURL: 'http://10.242.251.119:3000/api',
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default axiosInstance;
export { login, autoLogin } from './services/authApi';
export { getCareers } from './services/careersApi';
export { getPlans } from './services/planApi';
export { getSemesters } from './services/semesterApi';
