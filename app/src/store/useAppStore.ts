import { create } from 'zustand';

export type UserRole = 'Employee' | 'HR Admin' | 'Finance & Accounting' | 'Project Manager' | 'Marketing Lead' | 'Super Admin' | 'Founder';

interface AppState {
    userRole: UserRole;
    isSidebarCollapsed: boolean;
    setUserRole: (role: UserRole) => void;
    toggleSidebar: () => void;
}

const getInitialRole = (): UserRole => {
    try {
        const raw = localStorage.getItem('user');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed.role) return parsed.role as UserRole;
        }
    } catch (e) {
        // ignore parsing errors
    }
    return 'Employee';
};

export const useAppStore = create<AppState>((set) => ({
    userRole: getInitialRole(),
    isSidebarCollapsed: false,
    setUserRole: (role) => set({ userRole: role }),
    toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
}));