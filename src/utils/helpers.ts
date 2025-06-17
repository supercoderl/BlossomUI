import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';
import { useApiLoadingStore } from '@/stores/loadingStore';

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const withApiLoading = async <T>(
  key: string,
  fn: () => Promise<T>
): Promise<T> => {
  const { setLoading } = useApiLoadingStore.getState();
  setLoading(key, true);
  try {
    return await fn();
  } finally {
    setLoading(key, false);
  }
};