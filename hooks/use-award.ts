import { create } from "zustand";

interface AwardState {
  open: boolean;
  awardId: string;
  onOpen: (awardId: string) => void;
  onClose: () => void;
}

export const useAward = create<AwardState>()((set) => ({
  open: false,
  awardId: "",
  onOpen: (awardId) => set({ open: true, awardId }),
  onClose: () => set({ open: false, awardId: "" }),
}));

interface AssignAwardState {
  open: boolean;
  scoutId: string;
  onOpen: (scoutId: string) => void;
  onClose: () => void;
}

export const useAssignAward = create<AssignAwardState>()((set) => ({
  open: false,
  scoutId: "",
  onOpen: (scoutId) => set({ open: true, scoutId }),
  onClose: () => set({ open: false, scoutId: "" }),
}));
