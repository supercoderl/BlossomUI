import { DonutChartSkeletonProps } from "@/types/chart";

export const ChartLoader = ({ height = 300 }: { height?: number }) => (
    <div
        className="flex items-center justify-center bg-gray-50 rounded-lg"
        style={{ height: `${height}px` }}
    >
        <div className="flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-500">Loading...</span>
        </div>
    </div>
);

export const DonutChartSkeleton = ({
    height = 300,
    showLegend = true,
    donutSize = "70%",
    centerLabel = "Total",
    legendLength = 3
}: DonutChartSkeletonProps) => {
    // Calculate donut dimensions
    const containerSize = Math.min(height * 0.8, 400); // Reasonable max size
    const donutSizePercent = parseInt(donutSize.replace('%', '')) / 100;
    const strokeWidth = (containerSize * (1 - donutSizePercent)) / 2;
    const radius = containerSize / 2 - strokeWidth / 2;
    const innerRadius = radius * donutSizePercent;

    // Create skeleton segments
    const segments = [
        { startAngle: 0, endAngle: 120, color: 'rgb(229, 231, 235)' },
        { startAngle: 120, endAngle: 200, color: 'rgb(209, 213, 219)' },
        { startAngle: 200, endAngle: 280, color: 'rgb(229, 231, 235)' },
        { startAngle: 280, endAngle: 360, color: 'rgb(209, 213, 219)' }
    ];

    const createPath = (startAngle: number, endAngle: number) => {
        const start = (startAngle - 90) * (Math.PI / 180);
        const end = (endAngle - 90) * (Math.PI / 180);

        const x1 = containerSize / 2 + radius * Math.cos(start);
        const y1 = containerSize / 2 + radius * Math.sin(start);
        const x2 = containerSize / 2 + radius * Math.cos(end);
        const y2 = containerSize / 2 + radius * Math.sin(end);

        const x3 = containerSize / 2 + innerRadius * Math.cos(end);
        const y3 = containerSize / 2 + innerRadius * Math.sin(end);
        const x4 = containerSize / 2 + innerRadius * Math.cos(start);
        const y4 = containerSize / 2 + innerRadius * Math.sin(start);

        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
    };

    return (
        <div
            className="flex flex-col items-center animate-pulse"
            style={{ height: `${height}px` }}
        >
            <div
                className="relative flex items-center justify-center"
                style={{ width: containerSize, height: containerSize }}
            >
                {/* SVG Donut */}
                <svg
                    width={containerSize}
                    height={containerSize}
                    className="transform -rotate-90"
                >
                    {segments.map((segment, index) => (
                        <path
                            key={index}
                            d={createPath(segment.startAngle, segment.endAngle)}
                            fill={segment.color}
                            className="animate-pulse"
                        />
                    ))}
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="h-4 bg-gray-300 rounded w-12 mb-1"></div>
                    <div className="h-7 bg-gray-400 rounded w-16"></div>
                </div>
            </div>

            {/* Legend Skeleton */}
            {showLegend && (
                <div className="flex flex-wrap justify-center gap-4 mt-4 px-4">
                    {[...Array(legendLength)].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                            <div className="h-3 bg-gray-300 rounded w-16"></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};