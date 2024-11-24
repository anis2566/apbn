import { create } from "zustand";

interface ChangeStatusState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useTrainingAppStatus = create<ChangeStatusState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));

interface DeleteAppState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useTrainingAppDelete = create<DeleteAppState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));
