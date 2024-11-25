import { create } from "zustand";

interface UserState {
  open: boolean;
  userId: string;
  onOpen: (userId: string) => void;
  onClose: () => void;
}

export const useUser = create<UserState>()((set) => ({
  open: false,
  userId: "",
  onOpen: (userId) => set({ open: true, userId }),
  onClose: () => set({ open: false, userId: "" }),
}));

interface UpdateUserStatusState {
  open: boolean;
  userId: string;
  onOpen: (userId: string) => void;
  onClose: () => void;
}

export const useUpdateUserStatus = create<UpdateUserStatusState>()((set) => ({
  open: false,
  userId: "",
  onOpen: (userId) => set({ open: true, userId }),
  onClose: () => set({ open: false, userId: "" }),
}));
