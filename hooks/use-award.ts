import { AwardSchemaType } from "@/schema/award.schema";
import { create } from "zustand";

interface CreateAwardState {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAwardCreate = create<CreateAwardState>()((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false}),
}));


interface UpdateAwardState {
  open: boolean;
  awardId: string;
  award: AwardSchemaType;
  onOpen: (awardId: string, award: AwardSchemaType) => void;
  onClose: () => void;
}

export const useAwardUpdate = create<UpdateAwardState>()((set) => ({
  open: false,
  awardId: "",
  award: {
    title: "",
    imageUrl: ""
  },
  onOpen: (awardId, award) => set({ open: true, awardId, award }),
  onClose: () => set({ open: false, awardId: ""}),
}));



interface DeleteAwardState {
  open: boolean;
  awardId: string;
  onOpen: (awardId: string) => void;
  onClose: () => void;
}

export const useAwardDelete = create<DeleteAwardState>()((set) => ({
  open: false,
  awardId: "",
  onOpen: (awardId) => set({ open: true, awardId }),
  onClose: () => set({ open: false, awardId: ""}),
}));