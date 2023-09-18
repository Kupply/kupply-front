import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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
    // gradient.addColorStop(0.5, '#F5BdBd');
    gradient.addColorStop(1, '#D85888');
  }

  return gradient;
}

const getOrCreateTooltip = (chart: any) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltipEl.style.borderRadius = '3px';
    tooltipEl.style.color = 'white';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';

    const table = document.createElement('table');
    table.style.margin = '0px';

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context: any) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b: any) => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach((title: any) => {
      const tr = document.createElement('tr');
      tr.style.borderWidth = '0';

      const th = document.createElement('th');
      th.style.borderWidth = '0';
      const text = document.createTextNode(title);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body: any, i: any) => {
      const colors = tooltip.labelColors[i];

      const span = document.createElement('span');
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = '2px';
      span.style.marginRight = '10px';
      span.style.height = '10px';
      span.style.width = '10px';
      span.style.display = 'inline-block';

      const tr = document.createElement('tr');
      tr.style.backgroundColor = 'inherit';
      tr.style.borderWidth = '0';

      const td = document.createElement('td');
      td.style.borderWidth = '0';

      const text = document.createTextNode(body);

      td.appendChild(span);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY - tooltipEl.offsetHeight - 10 + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  tooltipEl.style.background = 'white';
  tooltipEl.style.color = 'black';
  tooltipEl.style.boxShadow = '0px 0px 10px #b9b9b9';
};

let labels: string[] = [];
for (let i = 2.9; i <= 4.55; i += 0.01) {
  labels.push(i.toFixed(2));
}

const formattedLineData: (number | null)[] = Array.from({ length: 166 }, () => null);
formattedLineData[10] = 0;
formattedLineData[160] = 0;
const formattedMeanData: (number | null)[] = Array.from({ length: 166 }, () => null);
const formattedMedianData: (number | null)[] = Array.from({ length: 166 }, () => null);
const formattedModeData: (number | null)[] = Array.from({ length: 166 }, () => null);
const formattedMinData: (number | null)[] = Array.from({ length: 166 }, () => null);

const meanGpaPoint = new Image();
meanGpaPoint.src = '../../design_image/previous_detail/meanGpaPoint.png';
const medianGpaPoint = new Image();
medianGpaPoint.src = '../../design_image/previous_detail/medianGpaPoint.png';
const modeGpaPoint = new Image();
modeGpaPoint.src = '../../design_image/previous_detail/modeGpaPoint.png';
const minGpaPoint = new Image();
minGpaPoint.src = '../../design_image/previous_detail/minGpaPoint.png';
const nullPoint = new Image();

export default function GpaLineChart(prop: GpaLineChartProps) {
  const { lineData, meanGpa, medianGpa, modeGpa, minGpa, width, height } = prop;

  lineData.sort((lhs: Data, rhs: Data) => {
    return lhs.gpa - rhs.gpa;
  });

  let idx: number;
  lineData.forEach((data) => {
    idx = Math.round((data.gpa - 2.9) * 100);
    formattedLineData[idx] = data.num;
  });

  const meanIdx = Math.round((meanGpa.gpa - 2.9) * 100);
  formattedMeanData[meanIdx] = meanGpa.num;

  const medianIdx = Math.round((medianGpa.gpa - 2.9) * 100);
  formattedMedianData[medianIdx] = medianGpa.num;

  const modeIdx = Math.round((modeGpa.gpa - 2.9) * 100);
  formattedModeData[modeIdx] = modeGpa.num;

  const minIdx = Math.round((minGpa.gpa - 2.9) * 100);
  formattedMinData[minIdx] = minGpa.num;

  const data = {
    labels: labels,
    datasets: [
      {
        label: '합격자 평균 학점',
        data: formattedMeanData,
        pointStyle: meanGpaPoint,
      },
      {
        label: '합격자 학점 중위값',
        data: formattedMedianData,
        pointStyle: medianGpaPoint,
      },
      {
        label: '합격자 학점 최빈값',
        data: formattedModeData,
        pointStyle: modeGpaPoint,
      },
      {
        label: '합격자 최저 학점',
        data: formattedMinData,
        pointStyle: minGpaPoint,
      },
      {
        label: '지원자',
        data: formattedLineData,
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
        pointRadius: 0,
        pointHoverBackgroundColor: 'white' as const,
        pointHoverBorderColor: '#d85888',
        pointHoverRadius: 6,
        pointHoverBorderWidth: 4,
        spanGaps: true,
      },
    ],
  };

  const options = {
    responsive: true,
    tooltips: {
      mode: 'nearest' as const,
      intersect: false,
    },
    hover: {
      mode: 'nearest' as const,
      intersect: false,
    },
    interaction: {
      mode: 'nearest' as const,
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
          callback: function (value: any, index: any, ticks: any) {
            if (
              data.labels[index] === '3.00' ||
              data.labels[index] === '3.50' ||
              data.labels[index] === '4.00' ||
              data.labels[index] === '4.50'
            ) {
              return data.labels[index];
            }
            return '';
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
        border: {
          dash: [15],
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
          offsetY: -6,
        },
      },
      tooltip: {
        enabled: false,
        position: 'nearest' as const,
        external: externalTooltipHandler,
        callbacks: {
          title: function (tooltipItems: any) {
            if (+tooltipItems[0].label === meanGpa.gpa) {
              return '합격생 학점 평균값';
            }
            if (+tooltipItems[0].label === medianGpa.gpa) {
              return '합격생 학점 중위값';
            }
            if (+tooltipItems[0].label === modeGpa.gpa) {
              return '합격생 학점 최빈값';
            }
            if (+tooltipItems[0].label === minGpa.gpa) {
              return '합격생 학점 최저값';
            }
            return '학점 ' + tooltipItems[0].label;
          },
          label: function (context: any) {
            let label = context.dataset.label || '';

            if (context.parsed.y !== null) {
              if (
                context.parsed.x === meanIdx ||
                context.parsed.x === medianIdx ||
                context.parsed.x === modeIdx ||
                context.parsed.x === minIdx
              ) {
                if (label === '지원자') {
                  label = '';
                } else {
                  label = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + (2.9 + context.parsed.x * 0.01).toFixed(2);
                }
              } else {
                label += ' ' + context.parsed.y + '명';
              }
            }
            return label;
          },
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
        ctx.font = opts.x.font || '14px Pretendard';

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
          ctx.font = opts.x.font || '14px Pretendard';
          ctx.fillText(opts.x.text, right + (opts.x.offsetX || 0), bottom + (opts.x.offsetY * -1 || 0));
        }

        if (opts.y.display) {
          ctx.fillStyle = opts.y.color;
          ctx.font = opts.y.font || '14px Pretendard';
          ctx.fillText(opts.y.text, opts.y.offsetX || 3, top + (opts.y.offsetY * -1 || -15));
        }
      },
    },
  ];

  return <Line plugins={plugins} options={options} data={data} width={width} height={height} />;
}
