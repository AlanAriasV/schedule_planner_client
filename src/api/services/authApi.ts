import axiosInstance from '..';

export const login = ({ run, password }: { run: string; password: string }) => {
  return axiosInstance.post('/auth/login', {
    run,
    password,
  });
};

export const autoLogin = () => {
  return axiosInstance.post('/auth/auto-login');
};
