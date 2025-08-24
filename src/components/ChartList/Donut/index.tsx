import BasicLoading from '@/components/Loading/basic';
import { DonutChartSkeleton } from '@/components/Loading/chart';
import Chart from 'react-apexcharts';

interface DonutChartData {
  value: number;
  label: string;
  color?: string;
}

interface DonutChartProps {
  data: DonutChartData[];
  height?: number;
  centerLabel?: string;
  showLegend?: boolean;
  strokeWidth?: number;
  donutSize?: string;
  loading?: boolean;
  loadingText?: string;
}

export const GenericDonutChart = ({
  data,
  height = 300,
  centerLabel = "Total",
  showLegend = true,
  strokeWidth = 5,
  donutSize = "70%",
  loading = false
}: DonutChartProps) => {
  if (loading || !data || data.length === 0) {
    return <DonutChartSkeleton donutSize='75%' />
  }
  const series = data.map(item => item.value);
  const labels = data.map(item => item.label);
  const colors = data.map(item => item.color || "#3B82F6");
  const total = series.reduce((a, b) => a + b, 0);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
    },
    labels,
    colors,
    legend: {
      position: "bottom",
      show: showLegend,
      formatter: function (seriesName: string, opts: any) {
        return seriesName + " " + opts.w.globals.series[opts.seriesIndex];
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: donutSize,
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
                return total.toString();
              },
            },
            total: {
              show: true,
              showAlways: true,
              label: centerLabel,
              fontSize: "16px",
              color: "#999",
              formatter: function () {
                return total.toString();
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
      width: strokeWidth,
      colors: ["#fff"],
      lineCap: "round",
    },
  };

  return (
    <Chart options={options} series={series} type="donut" height={height} />
  );
};