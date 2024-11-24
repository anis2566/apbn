import { Migration, Section, Unit } from "@prisma/client";
import { create } from "zustand";

interface MigrationState {
  open: boolean;
  scoutId: string;
  onOpen: (scoutId: string) => void;
  onClose: () => void;
}

export const useMigration = create<MigrationState>()((set) => ({
  open: false,
  scoutId: "",
  onOpen: (scoutId) => set({ open: true, scoutId }),
  onClose: () => set({ open: false, scoutId: "" }),
}));

interface MigrationStateLeader {
  open: boolean;
  scoutId: string;
  section: Section | null;
  unitId: string;
  onOpen: (scoutId: string, section: Section, unitId: string) => void;
  onClose: () => void;
}

export const useMigrationLeader = create<MigrationStateLeader>()((set) => ({
  open: false,
  scoutId: "",
  section: null,
  unitId: "",
  onOpen: (scoutId, section, unitId) =>
    set({ open: true, scoutId, section, unitId }),
  onClose: () => set({ open: false, scoutId: "" }),
}));

interface MigrationStatusState {
  open: boolean;
  migrationId: string;
  onOpen: (migrationId: string) => void;
  onClose: () => void;
}

export const useMigrationStatus = create<MigrationStatusState>()((set) => ({
  open: false,
  migrationId: "",
  onOpen: (migrationId) => set({ open: true, migrationId }),
  onClose: () => set({ open: false, migrationId: "" }),
}));

export const useMigrationDelete = create<MigrationStatusState>()((set) => ({
  open: false,
  migrationId: "",
  onOpen: (migrationId) => set({ open: true, migrationId }),
  onClose: () => set({ open: false, migrationId: "" }),
}));

interface MigrationWithScout extends Migration {
  scout: {
    name: string;
  } | null;
  unit: Unit | null;
}

interface MigrationVeiwState {
  open: boolean;
  migration: MigrationWithScout | null;
  onOpen: (migration: MigrationWithScout) => void;
  onClose: () => void;
}

export const useMigrationView = create<MigrationVeiwState>()((set) => ({
  open: false,
  migration: null,
  onOpen: (migration) => set({ open: true, migration }),
  onClose: () => set({ open: false, migration: null }),
}));
