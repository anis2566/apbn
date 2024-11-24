import { create } from "zustand";

interface EventState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useEvent = create<EventState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));
