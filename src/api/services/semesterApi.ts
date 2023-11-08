import axiosInstance from '..';

export function getSemesters({ plan_code }: { plan_code: string }) {
  return axiosInstance.get<{
    semesters: { number: number }[];
    type: string;
  }>('/semester/', {
    params: {
      plan_code,
    },
  });
}
