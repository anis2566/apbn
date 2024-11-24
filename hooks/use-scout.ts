import { create } from "zustand";

interface ScoutStatusState {
  open: boolean;
  scoutId: string;
  onOpen: (scoutId: string) => void;
  onClose: () => void;
}

export const useScoutStatus = create<ScoutStatusState>()((set) => ({
  open: false,
  scoutId: "",
  onOpen: (scoutId) => set({ open: true, scoutId }),
  onClose: () => set({ open: false, scoutId: "" }),
}));

export const useScoutStatusLeader = create<ScoutStatusState>()((set) => ({
  open: false,
  scoutId: "",
  onOpen: (scoutId) => set({ open: true, scoutId }),
  onClose: () => set({ open: false, scoutId: "" }),
}));

interface ScoutDeleteState {
  open: boolean;
  scoutId: string;
  onOpen: (scoutId: string) => void;
  onClose: () => void;
}

export const useScoutDelete = create<ScoutDeleteState>()((set) => ({
  open: false,
  scoutId: "",
  onOpen: (scoutId) => set({ open: true, scoutId }),
  onClose: () => set({ open: false, scoutId: "" }),
}));

interface ScoutCardState {
  open: boolean;
  scoutId: string;
  onOpen: (scoutId: string) => void;
  onClose: () => void;
}

export const useScoutCard = create<ScoutCardState>()((set) => ({
  open: false,
  scoutId: "",
  onOpen: (scoutId) => set({ open: true, scoutId }),
  onClose: () => set({ open: false, scoutId: "" }),
}));
