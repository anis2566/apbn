import { Signature } from "@prisma/client";
import { create } from "zustand";

interface SignatureState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSignature = create<SignatureState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

interface UpdateSignatureState {
  open: boolean;
  signature: Signature | null;
  id: string;
  onOpen: (signature: Signature, id: string) => void;
  onClose: () => void;
}

export const useUpdateSignature = create<UpdateSignatureState>()((set) => ({
  open: false,
  signature: null,
  id: "",
  onOpen: (signature, id) => set({ open: true, signature, id }),
  onClose: () => set({ open: false, signature: null, id: "" }),
}));

interface DeleteSignatureState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useDeleteSignature = create<DeleteSignatureState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));
