import { create } from "zustand";

interface GalleryState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useGallery = create<GalleryState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));
