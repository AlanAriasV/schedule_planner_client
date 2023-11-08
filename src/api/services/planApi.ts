import axiosInstance from '..';

interface IPlan {
  career_code: string;
}

export function getPlans({ career_code }: IPlan) {
  return axiosInstance.get<{
    years: { year: number }[];
    type: string;
  }>('/plan/years', {
    params: {
      career_code,
    },
  });
}
