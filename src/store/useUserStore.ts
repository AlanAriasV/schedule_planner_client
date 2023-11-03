import { create } from 'zustand';

const useUserStore = create(set => ({
  name: 'Alansillo Arios',
  age: 23,
  isLoaded: false,
  setIsLoaded: (isLoaded: boolean) => set({ isLoaded }),
}));

export default useUserStore;
