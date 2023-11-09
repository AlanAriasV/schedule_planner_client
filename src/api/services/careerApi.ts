import { axiosInstance } from '..';
export default class CareerApi {
  static async getCareers() {
    return axiosInstance.get<{
      careers: { code: string; name: string }[];
      type: string;
    }>('/career/');
  }
}
