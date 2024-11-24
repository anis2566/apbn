import { Ban, Scout } from "@prisma/client";
import { create } from "zustand";

interface BanState {
  open: boolean;
  scoutId: string;
  onOpen: (scoutId: string) => void;
  onClose: () => void;
}

export const useBan = create<BanState>()((set) => ({
  open: false,
  scoutId: "",
  onOpen: (scoutId) => set({ open: true, scoutId }),
  onClose: () => set({ open: false, scoutId: "" }),
}));

interface BanStatusState {
  open: boolean;
  banId: string;
  onOpen: (banId: string) => void;
  onClose: () => void;
}
export const useBanStatus = create<BanStatusState>()((set) => ({
  open: false,
  banId: "",
  onOpen: (banId) => set({ open: true, banId }),
  onClose: () => set({ open: false, banId: "" }),
}));

export const useBanDelete = create<BanStatusState>()((set) => ({
  open: false,
  banId: "",
  onOpen: (banId) => set({ open: true, banId }),
  onClose: () => set({ open: false, banId: "" }),
}));

interface BanWithScout extends Ban {
  scout: Scout | null;
}

interface BanVeiwState {
  open: boolean;
  ban: BanWithScout | null;
  onOpen: (ban: BanWithScout) => void;
  onClose: () => void;
}

export const useBanView = create<BanVeiwState>()((set) => ({
  open: false,
  ban: null,
  onOpen: (ban) => set({ open: true, ban }),
  onClose: () => set({ open: false, ban: null }),
}));
