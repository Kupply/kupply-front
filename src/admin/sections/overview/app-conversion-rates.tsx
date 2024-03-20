import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from '../../utils/format-number';

import Chart, { useChart } from '../../components/chart';

// ----------------------------------------------------------------------

interface SeriesItem {
  value: number;
  label: string;
}

interface ChartProps {
  colors: string[];
  series: SeriesItem[];
  options?: any; // Replace 'any' with a more specific type if possible
}

interface AppConversionRatesProps {
  chart: ChartProps;
  subheader?: string;
  title?: string;
}

const AppConversionRates: React.FC<AppConversionRatesProps> = ({ title, subheader, chart, ...other }) => {
  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value: any) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '28%',
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i) => i.label),
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }}>
        <Chart dir="ltr" type="bar" series={[{ data: chartSeries }]} options={chartOptions} width="100%" height={364} />
      </Box>
    </Card>
  );
};

export default AppConversionRates;
