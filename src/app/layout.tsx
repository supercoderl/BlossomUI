"use client"

import { useEffect } from 'react';

export default function RootLayout({ children }: any) {
  useEffect(() => {
    import('aos').then((AOS) =>
      AOS.init({
        duration: 2000,
      })
    );
  }, []);

  return children;
}