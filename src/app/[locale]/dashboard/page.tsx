'use client'
import { useRef, useEffect } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import Layout from '@/components/Layout';
import Chart from '@/components/Chart';
import Sortable from 'sortablejs';


import boardList from './board';

import styles from './index.module.css';


export default function Dashboard() {
    // const t = useTranslations();
    const boardContainerRef = useRef<any>(null);

    useEffect(() => {
        setTimeout(() => {
            const sortable = new Sortable(document.querySelector('#dashboard') as HTMLElement, {
                handle: ".moveBtn"
            })
        }, 1000)

    }, [boardContainerRef])

    return (
        <Layout curActive='/dashboard'>
            <main className={styles.dashboardWrap}>
                <div className={styles.content} id='dashboard'>
                    {
                        boardList.map((v, i) => {
                            return <div key={i} style={{ width: v.w, height: v.h }} className={styles.card}>
                                <span className='moveBtn'><HolderOutlined /></span>
                                <Chart data={v.data} type={v.type} id={v.id} />
                            </div>
                        })
                    }
                </div>
            </main>
        </Layout>

    );
}
