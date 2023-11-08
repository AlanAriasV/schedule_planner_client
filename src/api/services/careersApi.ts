import axiosInstance from '..';

export function getCareers() {
  return axiosInstance.get<{
    careers: { code: string; name: string }[];
    type: string;
  }>('/career/');
}
