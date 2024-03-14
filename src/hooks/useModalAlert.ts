import { ModalAlertProps } from '@/components/atoms/modal-alert/index.type';
import { create } from 'zustand';

interface UseModalAlertProps {
  modalAlert: ModalAlertProps | undefined;
  showModalAlert: (modalAlert: ModalAlertProps | undefined) => void;
  closeModalAlert: () => void;
}

export const useModalAlert = create<UseModalAlertProps>()((set) => ({
  modalAlert: undefined,
  showModalAlert: (modalAlert) => set({ modalAlert }),
  closeModalAlert: () => set({ modalAlert: undefined })
}));
