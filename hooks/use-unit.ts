import { create } from "zustand";

interface UnitState {
  open: boolean;
  unitId: string;
  onOpen: (unitId: string) => void;
  onClose: () => void;
}

export const useUnit = create<UnitState>()((set) => ({
  open: false,
  unitId: "",
  onOpen: (unitId) => set({ open: true, unitId }),
  onClose: () => set({ open: false, unitId: "" }),
}));
