import { axiosInstance } from '..';

interface GetPlanProps {
  career_code: string;
}

export default class PlanApi {
  static async getPlans({ career_code }: GetPlanProps) {
    return axiosInstance.get<{
      years: { year: number }[];
      type: string;
    }>('/plan/years', {
      params: {
        career_code,
      },
    });
  }
}
