import { create } from "zustand";

interface ChangeStatusState {
  open: boolean;
  appId: string;
  onOpen: (appId: string) => void;
  onClose: () => void;
}

export const useEventStatus = create<ChangeStatusState>()((set) => ({
  open: false,
  appId: "",
  onOpen: (appId) => set({ open: true, appId }),
  onClose: () => set({ open: false, appId: "" }),
}));

interface DeleteAwardState {
  open: boolean;
  appId: string;
  onOpen: (appId: string) => void;
  onClose: () => void;
}

export const useEventDelete = create<DeleteAwardState>()((set) => ({
  open: false,
  appId: "",
  onOpen: (appId) => set({ open: true, appId }),
  onClose: () => set({ open: false, appId: "" }),
}));
