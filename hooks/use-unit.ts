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

interface AssignLeaderState {
  open: boolean;
  unitId: string;
  onOpen: (unitId: string) => void;
  onClose: () => void;
}

export const useAssignUnitLeader = create<AssignLeaderState>()((set) => ({
  open: false,
  unitId: "",
  onOpen: (unitId) => set({ open: true, unitId }),
  onClose: () => set({ open: false, unitId: "" }),
}));

interface RemoveLeaderState {
  open: boolean;
  unitId: string;
  onOpen: (unitId: string) => void;
  onClose: () => void;
}

export const useRemoveUnitLeader = create<RemoveLeaderState>()((set) => ({
  open: false,
  unitId: "",
  onOpen: (unitId) => set({ open: true, unitId }),
  onClose: () => set({ open: false, unitId: "" }),
}));

interface RemoveScoutState {
  open: boolean;
  scoutId: string;
  unitId: string;
  onOpen: (scoutId: string, unitId: string) => void;
  onClose: () => void;
}

export const useRemoveScout = create<RemoveScoutState>()((set) => ({
  open: false,
  scoutId: "",
  unitId: "",
  onOpen: (scoutId, unitId) => set({ open: true, scoutId, unitId }),
  onClose: () => set({ open: false, scoutId: "", unitId: "" }),
}));
