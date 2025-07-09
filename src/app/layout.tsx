"use client"

import { ReactNode, useEffect } from 'react';

type Props = {
  children: ReactNode;
};

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