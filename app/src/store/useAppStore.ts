import { create } from 'zustand';

export type UserRole = 'Employee' | 'HR Admin' | 'Finance & Accounting' | 'Project Manager' | 'Marketing Lead' | 'Super Admin' | 'Founder';

interface AppState {
    userRole: UserRole;
    isSidebarCollapsed: boolean;
    setUserRole: (role: UserRole) => void;
    toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    userRole: 'Founder', // Default role
    isSidebarCollapsed: false,
    setUserRole: (role) => set({ userRole: role }),
    toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}));