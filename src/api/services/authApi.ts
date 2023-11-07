import axiosInstance from '..';

// axiosInstance.defaults.baseURL;

export const login = ({ run, password }: { run: string; password: string }) => {
  return axiosInstance.post('/auth/login', {
    run,
    password,
  });
};
