import dynamic from "next/dynamic";
import { useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const StackedBarChart = () => {
    const [options] = useState({
        chart: {
            type: "bar" as const,
            stacked: true,
            toolbar: { show: false },
            sparkline: { enabled: true }
        },
        plotOptions: {
            bar: {
                columnWidth: "40%",
            }
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: Array.from({ length: 10 }, (_, i) => `Day ${i + 1}`),
            labels: { show: false },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: { show: false },
        grid: { show: false },
        legend: { show: false },
        colors: ["#4B5563", "#9CA3AF"] // màu phần dưới + phần trên
    });

    const [series] = useState([
        {
            name: "Bottom",
            data: [10, 15, 13, 20, 18, 8, 14, 15, 19, 16]
        },
        {
            name: "Top",
            data: [5, 7, 8, 12, 10, 4, 7, 8, 10, 9]
        }
    ]);

    return (
        <Chart options={options} series={series} type="bar" height={80} />
    )
}