import { Status } from "@/schema/coupon.schema";
import { create } from "zustand";

interface CouponState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCoupon = create<CouponState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false, }),
}));


type Coupon = {
    title: string;
    code: string;
    value: number;
    expire: Date;
    status: Status
}
interface UpdateCouponState {
  open: boolean;
  coupon: Coupon;
  couponId: string;
  onOpen: (coupon: Coupon, couponId: string) => void;
  onClose: () => void;
}

export const useUpdateCoupon = create<UpdateCouponState>()((set) => ({
  open: false,
  coupon: {
    title: "",
    code: "",
    value: 0,
    expire: new Date(),
    status: Status.Inactive
  },
  couponId: "",
  onOpen: (coupon, couponId) => set({ open: true, coupon, couponId }),
  onClose: () => set({ open: false }),
}));


interface DeleteCouponState {
  open: boolean;
  couponId: string;
  onOpen: (couponId: string) => void;
  onClose: () => void;
}

export const useDeleteCoupon = create<DeleteCouponState>()((set) => ({
  open: false,
  couponId: "",
  onOpen: (couponId) => set({ open: true, couponId }),
  onClose: () => set({ open: false, couponId: "" }),
}));