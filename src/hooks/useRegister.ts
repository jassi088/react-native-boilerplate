import { create } from 'zustand';

interface UseRegisterProps {
  navigateAfterRegister: string;
  setNavigateAfterRegister: (navigateAfterRegister: string) => void;
}

export const useRegister = create<UseRegisterProps>()((set) => ({
  navigateAfterRegister: '',
  setNavigateAfterRegister: (navigateAfterRegister: string) => {
    set({ navigateAfterRegister });
  }
}));
