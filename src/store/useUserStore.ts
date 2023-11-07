import { create } from 'zustand';

const useUserStore = create(() => ({
  email: '',
  full_name: '',
  role: '',
  run: '',
}));

export default useUserStore;
