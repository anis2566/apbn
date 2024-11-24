import { create } from "zustand";

interface TrainingState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useTraining = create<TrainingState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));
