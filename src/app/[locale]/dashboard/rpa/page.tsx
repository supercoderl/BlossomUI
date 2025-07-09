'use client'
// import { useTranslations} from 'next-intl';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import dynamic from 'next/dynamic';

import styles from './index.module.css';

const Graph = dynamic(
    async () => (await import("./core")).default,
    {
      ssr: false,
    },
);


export default function Dashboard() {
  // const t = useTranslations();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(loading);
    setLoading(false);
  }, []);

  return (
    <Layout curActive='/dashboard/rpa'>
        <main className={styles.monitorWrap}>
            <Graph />
        </main>
    </Layout>
  );
}