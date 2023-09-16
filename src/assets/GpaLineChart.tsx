import {
  Chart as ChartJS,
  ChartData,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartTypeRegistry,
  Color,
  Scriptable,
  ScriptableContext,
  ChartArea,
  Plugin,
} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { Context } from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export type Data = {
  gpa: number;
  num: number;
};

export type LineData = Data[];

export interface GpaLineChartProps extends React.ComponentPropsWithoutRef<'div'> {
  lineData: LineData;
  meanGpa: Data;
  medianGpa: Data;
  modeGpa: Data;
  minGpa: Data;
  width: number;
  height: number;
}

let width: number, height: number, gradient: CanvasGradient;
function getGradient(ctx: CanvasRenderingContext2D, chartArea: ChartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, '#FDF2F2');
    gradient.addColorStop(0.5, '#F5BdBd');
    gradient.addColorStop(1, '#D85888');
  }

  return gradient;
}

export default function GpaLineChart(prop: GpaLineChartProps) {
  const { lineData, meanGpa, medianGpa, modeGpa, minGpa, width, height, ...rest } = prop;

  lineData.sort((lhs: Data, rhs: Data) => {
    return lhs.gpa - rhs.gpa;
  });

  const formattedData: { x: number; y: number }[] = lineData.map((data) => ({
    x: data.gpa,
    y: data.num,
  }));

  const data = {
    labels: formattedData.map((data) => data.x),
    datasets: [
      {
        label: '지원자',
        data: formattedData.map((data) => data.y),
        borderColor: function (context: Context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
        backgroundColor: (context: Context) => {
          if (!context.chart.chartArea) {
            return;
          }

          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;

          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, 'rgba(255, 175, 189, 0.05)');
          gradientBg.addColorStop(1, '#ffffff');

          return gradientBg;
        },
        cubicInterpolationMode: 'monotone' as const,
        fill: true,
        pointHoverBackgroundColor: 'white' as const,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 3,
      },
      // {
      //   label: '합격자 평균 학점',
      //   data: [{ x: meanGpa.gpa, y: meanGpa.num }],
      //   borderColor: '#f5bdbd',
      // },
      // {
      //   label: '합격자 학점 중위값',
      //   data: [{ x: medianGpa.gpa, y: medianGpa.num }],
      //   borderColor: '#f5bdbd',
      // },
      // {
      //   label: '합격자 학점 최빈값',
      //   data: [{ x: modeGpa.gpa, y: modeGpa.num }],
      //   borderColor: '#f5bdbd',
      // },
      // {
      //   label: '합격자 최저 학점',
      //   data: [{ x: minGpa.gpa, y: minGpa.num }],
      //   borderColor: '#f5bdbd',
      // },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Pretendard' as const,
            size: 14,
            weight: 'bold' as const,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      customTitle: {
        y: {
          display: true,
          text: '지원자 수',
          offsetX: 13,
        },
        x: {
          display: true,
          text: '학점',
          offsetX: 7,
          offsetY: -5,
        },
      },
    },
  };

  const plugins: Plugin[] = [
    {
      id: 'customTitle',
      beforeLayout: (chart, args, opts) => {
        if (!opts.x.display) {
          return;
        }

        const { ctx } = chart;
        ctx.font = opts.x.font || '12px Pretendard';

        const { width } = ctx.measureText(opts.x.text);
        chart.options.layout!.padding! = width * 1.3;
      },
      afterDraw: (chart, args, opts) => {
        const {
          ctx,
          scales: { x, y },
          chartArea: { top, bottom, left, right },
        } = chart;

        if (opts.x.display) {
          ctx.fillStyle = opts.x.color;
          ctx.font = opts.x.font || '12px Pretendard';
          ctx.fillText(opts.x.text, right + (opts.x.offsetX || 0), bottom + (opts.x.offsetY * -1 || 0));
        }

        if (opts.y.display) {
          ctx.fillStyle = opts.y.color;
          ctx.font = opts.y.font || '12px Pretendard';
          ctx.fillText(opts.y.text, opts.y.offsetX || 3, top + (opts.y.offsetY * -1 || -15));
        }
      },
    },
  ];

  return <Line plugins={plugins} options={options} data={data} width={width} height={height} />;
}
