import Chart from 'react-apexcharts';

export const AreaChart = () => {
    const options = {
        chart: {
            type: "area" as const,
            height: 350,
            toolbar: { show: false }
        },
        stroke: {
            curve: "smooth" as "smooth",
            width: [2, 2, 2]
        },
        fill: {
            type: ["solid", "gradient", "gradient"],
            colors: ["#4b5563", "#9ca3af", "#60a5fa"],
            opacity: [0.8, 0, 0]
        },
        markers: {
            size: 0
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"]
        },
        colors: ["#4b5563", "#9ca3af", "#60a5fa"], // bookings, revenue, expense
        legend: {
            position: "bottom" as "bottom",
            labels: {
                colors: "#6b7280"
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: "#e5e7eb"
        }
    };

    const series = [
        {
            name: "Bookings",
            type: "area",
            data: [21, 11, 22, 22, 20, 40, 35, 30, 50, 40, 35]
        },
        {
            name: "Revenue",
            type: "line",
            data: [45, 55, 20, 30, 25, 50, 40, 39, 50, 35, 38]
        },
        {
            name: "Expence", // giữ nguyên spelling của bạn trong hình
            type: "line",
            data: [30, 25, 35, 38, 40, 38, 45, 44, 50, 42, 40]
        }
    ];


    return (
        <Chart options={options} series={series} type="area" height={350} />
    )
}