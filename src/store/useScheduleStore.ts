import { create } from 'zustand';

interface ScheduleStore {
  days: ScheduleDay[] | undefined;
}

interface ScheduleActionsStore {
  setSchedule: (schedule: ScheduleDay[]) => Promise<boolean>;
  resetSchedule: () => Promise<boolean>;
}

const initialState: ScheduleStore = {
  days: undefined,
};

const useScheduleStore = create<ScheduleStore & ScheduleActionsStore>(set => ({
  ...initialState,
  setSchedule: async schedule => {
    try {
      set({ days: schedule });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  resetSchedule: async () => {
    try {
      set(initialState);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
}));

export default useScheduleStore;
