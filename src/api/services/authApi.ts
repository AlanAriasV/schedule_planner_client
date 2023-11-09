import { UserResponse } from 'src/utils/types';
import { axiosInstance } from '..';

export default class AuthApi {
  static async login({ run, password }: { run: string; password: string }) {
    return axiosInstance.post<UserResponse>('/auth/login', {
      run,
      password,
    });
  }

  static async autoLogin() {
    return axiosInstance.post<{
      user: {
        full_name: string;
        email: string;
        role: string;
        run: string;
      };
    }>('/auth/auto-login');
  }
}
