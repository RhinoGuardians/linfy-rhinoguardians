"use client";

import { create } from "zustand";

interface UiStoreState {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

export const useUiStore = create<UiStoreState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
}));

