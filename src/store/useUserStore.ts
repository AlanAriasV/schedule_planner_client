import { create } from 'zustand';

interface UserStore {
  email: string;
  full_name: string;
  role: string;
  run: string;
  isLoading: boolean;
}
interface UserActionsStore {
  setUser: (user: UserStore) => Promise<Boolean>;
  setLoading: (isLoading: boolean) => Promise<Boolean>;
  resetUser: () => Promise<Boolean>;
}

const initialState: UserStore = {
  email: '',
  full_name: '',
  role: '',
  run: '',
  isLoading: true,
};

const useUserStore = create<UserStore & UserActionsStore>(set => ({
  ...initialState,
  setUser: async user => {
    try {
      set({ ...user });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  setLoading: async isLoading => {
    try {
      set({ isLoading });
      return true;
    } catch (error) {
      return false;
    }
  },
  resetUser: async () => {
    try {
      set(initialState);
      return true;
    } catch (error) {
      return false;
    }
  },
}));

export default useUserStore;
