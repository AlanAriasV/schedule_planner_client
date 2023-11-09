import { axiosInstance } from '..';

export default class SemesterApi {
  static async getSemesters({ plan_code }: { plan_code: string }) {
    return axiosInstance.get<{
      semesters: {
        id: number;
        number: number;
      }[];
      type: string;
    }>('/semester/', {
      params: {
        plan_code,
      },
    });
  }
}
