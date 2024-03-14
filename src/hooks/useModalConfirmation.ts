import { ModalConfirmationProps } from '@/components/atoms/modal-confirmation/index.type';
import { create } from 'zustand';

interface UseModalConfirmationProps {
  modalConfirmation: ModalConfirmationProps | undefined;
  showModalConfirmation: (modalConfirmation: ModalConfirmationProps | undefined) => void;
  closeModalConfirmation: () => void;
}

export const useModalConfirmation = create<UseModalConfirmationProps>()((set) => ({
  modalConfirmation: undefined,
  showModalConfirmation: (modalConfirmation) => set({ modalConfirmation }),
  closeModalConfirmation: () => set({ modalConfirmation: undefined })
}));
