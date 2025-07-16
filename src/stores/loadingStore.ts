import { defaultLoading } from '@/data/loading';
import { create } from 'zustand';

interface ApiLoadingStore {
    loading: Record<string, boolean>; // dynamic key
    setLoading: (key: string, value: boolean) => void;
}

export const useApiLoadingStore = create<ApiLoadingStore>((set) => ({
    loading: { ...defaultLoading },
    setLoading: (key, value) =>
        set((state) => ({
            loading: { ...state.loading, [key]: value },
        })),
}));

export const preloadLoadingKeys = (keys: string[]) => {
    const { setLoading } = useApiLoadingStore.getState();
    keys.forEach((key) => {
        setLoading(key, true);
    });
};