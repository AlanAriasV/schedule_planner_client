import { axiosInstance } from '..';

export default class ScheduleApi {
  static async postSchedule({ semester_id }: { semester_id: number }) {
    return axiosInstance.post('/schedule/', {
      semester_id,
    });
  }

  static async getSchedule({ semester_id }: { semester_id: string }) {
    return axiosInstance.get<{
      schedule: ScheduleDay[];
      type: string;
    }>('/schedule/', {
      params: {
        semester_id,
      },
    });
  }
}
