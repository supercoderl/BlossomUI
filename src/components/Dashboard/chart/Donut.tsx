import Chart from "react-apexcharts";

export const DonutChart = () => {
    // Define series and total first
    const series = [800, 105, 301];
    const totalEmployees = series.reduce((a, b) => a + b, 0);

    const options: ApexCharts.ApexOptions = {
        chart: {
            type: "donut",
        },
        labels: ["Onsite", "Remote", "Hybrid"],
        colors: ["#3B82F6", "#F97316", "#38BDF8"], // Blue, Orange, Light Blue
        legend: {
            position: "bottom",
            formatter: function (seriesName: string, opts: any) {
                return seriesName + " " + opts.w.globals.series[opts.seriesIndex];
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            offsetY: 20,
                            fontSize: "16px",
                            color: "#999",
                        },
                        value: {
                            show: true,
                            fontSize: "28px",
                            fontWeight: 600,
                            offsetY: -18,
                            formatter: function () {
                                return totalEmployees.toString();
                            },
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: "Employee",
                            fontSize: "16px",
                            color: "#999",
                            formatter: function () {
                                return totalEmployees.toString();
                            },
                        },
                    },
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: 5,
            colors: ["#fff"], // creates gap between segments
            lineCap: "round",
        },
    };

    return (
        <Chart options={options} series={series} type="donut" height={300} />
    );
};