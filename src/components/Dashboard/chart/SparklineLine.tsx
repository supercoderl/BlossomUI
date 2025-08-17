"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SparklineLineChart() {
    const [options] = useState({
        chart: {
            type: "line" as const,
            toolbar: { show: false },
            sparkline: { enabled: true }
        },
        stroke: {
            curve: "smooth" as "smooth",
            width: 3
        },
        colors: ["#374151"],
        markers: {
            size: 0,
            hover: {
                size: 6
            }
        },
        tooltip: {
            enabled: true,
            theme: "dark",
            y: {
                formatter: (val: number) => `${val}`
            }
        }
    });

    const [series] = useState([
        {
            name: "Data",
            data: [20, 25, 42, 28, 17, 26, 30, 22, 31, 34, 16, 38]
        }
    ]);

    return (
        <Chart options={options} series={series} type="line" height={80} />
    );
}
