'use client'
import { useRef, useEffect } from 'react';
import { HolderOutlined } from '@ant-design/icons';
import Layout from '@/components/Layout';
import Chart from '@/components/Chart';
import Sortable from 'sortablejs';


import boardList from './board';

import styles from './index.module.css';
import { PageTitle } from '@/components/Dashboard/title';
import { FirstCharts } from '@/components/Dashboard/chart/first';
import { SecondCharts } from '@/components/Dashboard/chart/second';
import { ThirdCharts } from '@/components/Dashboard/chart/third';


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
                <div className="main-content">
                    <div className='container-fluid'>
                        <PageTitle />

                        <FirstCharts />

                        <SecondCharts />

                        <ThirdCharts />
                    </div>
                </div>
            </main>
        </Layout>

    );
}
