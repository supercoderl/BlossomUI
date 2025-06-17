import { create } from 'zustand';

interface ApiLoadingStore {
    loading: Record<string, boolean>; // dynamic key
    setLoading: (key: string, value: boolean) => void;
}

export const useApiLoadingStore = create<ApiLoadingStore>((set) => ({
    loading: {},
    setLoading: (key, value) =>
        set((state) => ({
            loading: { ...state.loading, [key]: value },
        })),
}));