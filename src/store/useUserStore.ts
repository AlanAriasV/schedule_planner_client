import { create } from 'zustand';

interface UserStore {
  email: string;
  full_name: string;
  role: string;
  run: string;
  isLoading: boolean;
  setUser: (user: UserStore) => void;
  setLoading: (isLoading: boolean) => void;
  resetUser: () => void;
}

const initialState = {
  email: '',
  full_name: '',
  role: '',
  run: '',
};

const useUserStore = create<UserStore>(set => ({
  ...initialState,
  isLoading: true,
  setUser: user => {
    set({ ...user, isLoading: false });
  },
  setLoading: isLoading => {
    set({ isLoading });
  },
  resetUser: () => {
    set(initialState);
  },
}));

export default useUserStore;
