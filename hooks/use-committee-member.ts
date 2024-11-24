import { CommitteeMember } from "@prisma/client";
import { create } from "zustand";

interface CommitteeMemberState {
  open: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useCommitteeMember = create<CommitteeMemberState>()((set) => ({
  open: false,
  id: "",
  onOpen: (id) => set({ open: true, id }),
  onClose: () => set({ open: false, id: "" }),
}));

interface UpdateMemberState {
  open: boolean;
  member: CommitteeMember | null;
  memberId: string;
  onOpen: (coupon: CommitteeMember, couponId: string) => void;
  onClose: () => void;
}

export const useCommitteeMemberUpdate = create<UpdateMemberState>()((set) => ({
  open: false,
  member: null,
  memberId: "",
  onOpen: (member, memberId) => set({ open: true, member, memberId }),
  onClose: () => set({ open: false }),
}));

export const useCommitteeMemberDelete = create<CommitteeMemberState>()(
  (set) => ({
    open: false,
    id: "",
    onOpen: (id) => set({ open: true, id }),
    onClose: () => set({ open: false, id: "" }),
  })
);
