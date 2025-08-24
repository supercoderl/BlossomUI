import BasicLoading from '@/components/Loading/basic';
import Chart from 'react-apexcharts';

interface AreaChartSeries {
  name: string;
  data: number[];
  color?: string;
}

interface AreaChartProps {
  series: AreaChartSeries[];
  categories: string[];
  height?: number;
  showLegend?: boolean;
  showDataLabels?: boolean;
  showToolbar?: boolean;
  strokeWidth?: number | number[];
  fillOpacity?: number | number[];
  loading?: boolean;
  loadingText?: string;
  gridBorderColor?: string;
  legendTextColor?: string;
}

export const GenericAreaChart = ({
  series,
  categories,
  height = 350,
  showLegend = true,
  showDataLabels = false,
  showToolbar = false,
  strokeWidth = 2,
  fillOpacity = [0.8, 0, 0],
  loading = false,
  gridBorderColor = "#e5e7eb",
  legendTextColor = "#6b7280"
}: AreaChartProps) => {
  if (loading || !series || series.length === 0) {
    return <BasicLoading className='w-1/3 mx-auto' />;
  }

  // Extract data and colors from series
  const chartSeries = series.map(item => ({
    name: item.name,
    data: item.data
  }));

  const colors = series.map(item => item.color || "#3B82F6");

  // Determine stroke widths - if single value provided, apply to all series
  const strokeWidths = Array.isArray(strokeWidth) 
    ? strokeWidth 
    : new Array(series.length).fill(strokeWidth);

  // Determine fill opacity - if single value provided, apply to all series
  const fillOpacities = Array.isArray(fillOpacity) 
    ? fillOpacity 
    : new Array(series.length).fill(fillOpacity);

  // Determine fill types - all series will be area type
  const fillTypes = new Array(series.length).fill("gradient");

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      height: height,
      toolbar: { show: showToolbar }
    },
    stroke: {
      curve: "smooth",
      width: strokeWidths
    },
    fill: {
      type: fillTypes,
      colors: colors,
      opacity: fillOpacities
    },
    markers: {
      size: 0
    },
    xaxis: {
      categories: categories
    },
    colors: colors,
    legend: {
      position: "bottom",
      show: showLegend,
      labels: {
        colors: legendTextColor
      }
    },
    dataLabels: {
      enabled: showDataLabels
    },
    grid: {
      borderColor: gridBorderColor
    }
  };

  return (
    <Chart options={options} series={chartSeries} type="area" height={height} />
  );
};