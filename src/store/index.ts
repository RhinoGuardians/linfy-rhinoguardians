"use client";

import { create } from "zustand";

import {
  createDashboardSlice,
  type DashboardSlice,
} from "@/store/slices/dashboard-slice";

interface UiStoreState {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useUiStore = create<UiStoreState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
}));

export type AppStore = DashboardSlice;

export const useAppStore = create<AppStore>()((set) => ({
  ...createDashboardSlice(set),
}));
