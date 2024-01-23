import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Chart, { useChart } from '../../components/chart';

// ----------------------------------------------------------------------

interface ChartDataPoint {
  x: any; // Adjust the type as necessary
  y: any; // Adjust the type as necessary
}

interface ChartDataItem {
  name?: string;
  type?: string;
  data: ChartDataPoint[]; // Array of data points
  fill: any;
}

interface ChartProps {
  labels: string[]; // or any other type depending on the actual structure
  colors: string[]; // or any other type depending on the actual structure
  series: ChartDataItem[]; // Adjust according to the actual series item structure
  options?: any; // Replace 'any' with a more specific type if possible
}

interface AppWebsiteVisitsProps {
  title?: string;
  subheader?: string;
  chart: ChartProps;
}

const AppWebsiteVisits: React.FC<AppWebsiteVisitsProps> = ({ title, subheader, chart, ...other }) => {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: any) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} visits`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart dir="ltr" type="line" series={series} options={chartOptions} width="100%" height={364} />
      </Box>
    </Card>
  );
};

export default AppWebsiteVisits;
