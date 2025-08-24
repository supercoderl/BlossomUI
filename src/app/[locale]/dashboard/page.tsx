'use client'
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import styles from './index.module.css';
import { PageTitle } from '@/components/Dashboard/title';
import { FirstCharts } from '@/components/Dashboard/chart/first';
import { SecondCharts } from '@/components/Dashboard/chart/second';
import { ThirdCharts } from '@/components/Dashboard/chart/third';
import { BusinessData } from '@/types/dashboard';
import { getBusinessAnalytics } from './api';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { useSignalRContext } from '@/providers/signalRProvider';


export default function Dashboard() {
    // const t = useTranslations();
    const [businessData, setBusinessData] = useState<BusinessData>({
        revenue: {
            currentTotalRevenue: 0,
            previousTotalRevenue: 0,
            currentTransactionCount: 0,
            previousTransactionCount: 0,
            avgTransactionDifference: 0,
            revenuePercentageChange: 0,
            revenueTrend: "Stable"
        },
        bookings: {
            currentPeriodBookings: 0,
            previousPeriodBookings: 0,
            bookingsDifference: 0,
            percentageChange: 0,
            trend: "Stable"
        },
        totalCustomers: 0,
        averageServiceValue: 0,
        conversionRate: 0,
        customerRetentionRate: {
            previousCustomers: 0,
            returningCustomers: 0,
            customerRetentionRate: 0
        },
        categories: [],
        technicians: [],
        services: [],
        schedules: []
    });
    const { loading } = useApiLoadingStore();
    const { onlineUsers } = useSignalRContext();

    const onLoad = async () => {
        await getBusinessAnalytics({
            query: {
                page: 1,
                pageSize: 10
            },
            currentRange: {
                dateStart: "2025-01-01",
                dateEnd: "2025-12-12"
            },
            previousRange: {
                dateStart: "2024-01-01",
                dateEnd: "2024-12-12"
            }
        }).then((res: any) => {
            if (res && res.success) {
                console.log(res);
                setBusinessData(res.data);
            }
        })
    }

    useEffect(() => {
        onLoad();
    }, []);

    return (
        <Layout curActive='/dashboard'>
            <main className={styles.dashboardWrap}>
                <div className="main-content">
                    <div className='container-fluid'>
                        <PageTitle
                            refresh={onLoad}
                        />

                        <FirstCharts
                            businessData={businessData}
                            loading={loading}
                        />

                        <SecondCharts
                            businessData={businessData}
                            loading={loading}
                        />

                        <ThirdCharts
                            businessData={businessData}
                            loading={loading}
                            onlineUsers={onlineUsers}
                        />
                    </div>
                </div>
            </main>
        </Layout>
    );
}
