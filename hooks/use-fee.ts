import { create } from "zustand";

interface FeeState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useFee = create<FeeState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false, }),
}));


type Fee = {
    title: string;
    amount: number;
    discountAmount: number;
}
interface UpdateFeeState {
  open: boolean;
  fee: Fee;
  feeId: string;
  onOpen: (fee: Fee, feeId: string) => void;
  onClose: () => void;
}

export const useUpdateFee = create<UpdateFeeState>()((set) => ({
  open: false,
  fee: {
    title: "",
    amount: 0,
    discountAmount: 0
  },
  feeId: "",
  onOpen: (fee, feeId) => set({ open: true, fee, feeId }),
  onClose: () => set({ open: false }),
}));


interface DeleteFeeState {
  open: boolean;
  feeId: string;
  onOpen: (feeId: string) => void;
  onClose: () => void;
}

export const useDeleteFee = create<DeleteFeeState>()((set) => ({
  open: false,
  feeId: "",
  onOpen: (feeId) => set({ open: true, feeId }),
  onClose: () => set({ open: false, feeId: "" }),
}));