import { useMemo, useState, useEffect, useRef } from 'react';
import { CASH_FLOW_TASKS, SEVERITY_COLOR } from '../data/cashFlowTasks';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Module-level state for task nodes — set synchronously during render
const taskNodeState = { activeTaskId: null as string | null };

function drawDefaultNode(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  // Outer halo (r=8, stroke opacity 0.1, stroke-width 4 → visually r=6 center)
  ctx.beginPath();
  ctx.arc(x, y, 8, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.1;
  ctx.lineWidth = 4;
  ctx.stroke();
  // Inner solid fill (r=4)
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 1;
  ctx.fill();
  ctx.restore();
}

function drawActiveNode(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  // Outermost ring (r=15.5, opacity 0.2, stroke-width 1)
  ctx.beginPath();
  ctx.arc(x, y, 15.5, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.2;
  ctx.lineWidth = 1;
  ctx.stroke();
  // Middle ring (r=10.886, opacity 0.5, stroke-width 2)
  ctx.beginPath();
  ctx.arc(x, y, 10.886, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 2;
  ctx.stroke();
  // Inner circle (r=5.43, white fill, colored stroke, stroke-width 2)
  ctx.beginPath();
  ctx.arc(x, y, 5.43, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 1;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

// Task node plugin — draws nodes at each task's weekly position on the chart line
const taskNodePlugin: Plugin = {
  id: 'taskNodes',
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const dataset = chart.data.datasets[1]; // solid line dataset
    if (!dataset) return;

    CASH_FLOW_TASKS.forEach((task) => {
      // chart starts 7 days before today; taskWeekOffset i → anchor i+1 → day index (i+1)*7
      const dataIndex = (task.weekOffset + 1) * 7;

      // Derive x from the x-scale (CategoryScale uses data index as value)
      const x = chart.scales.x.getPixelForValue(dataIndex);
      // Derive y from the actual balance value in the fill dataset (index 0 has all values)
      const balance = chart.data.datasets[0].data[dataIndex] as number;
      if (balance == null) return;
      const y = chart.scales.y.getPixelForValue(balance);
      const color = SEVERITY_COLOR[task.severity];
      const isActive = taskNodeState.activeTaskId === task.id;

      if (isActive) {
        drawActiveNode(ctx, x, y, color);
      } else {
        drawDefaultNode(ctx, x, y, color);
      }
    });
  },
};

// Weekly dashed vertical gridlines at each week boundary, plus solid today line
const weeklyGridPlugin: Plugin = {
  id: 'weeklyGrid',
  beforeDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const { top, bottom } = chart.chartArea;
    ctx.save();

    // Dashed gridlines at each week
    ctx.strokeStyle = '#E6E7E9';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    for (let i = 0; i <= 35; i += 7) {
      const x = chart.scales.x.getPixelForValue(i);
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, bottom);
      ctx.stroke();
    }

    // Dashed today line at index 7
    const todayX = chart.scales.x.getPixelForValue(7);
    ctx.strokeStyle = '#6683A5';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(todayX, top);
    ctx.lineTo(todayX, bottom);
    ctx.stroke();

    ctx.restore();
  },
};

// Crosshair plugin for vertical line on hover
const crosshairPlugin: Plugin = {
  id: 'crosshair',
  afterDraw: (chart) => {
    if (chart.tooltip?.getActiveElements().length) {
      const ctx = chart.ctx;
      const activePoint = chart.tooltip.getActiveElements()[0];
      const x = activePoint.element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;

      // Draw vertical line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#828995';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.restore();
    }
  },
};

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  crosshairPlugin,
  weeklyGridPlugin,
  taskNodePlugin
);

interface CashFlowDataPoint {
  date: string;
  dateLabel: string;
  cashIn: number;
  cashOut: number;
  balance: number;
  isProjected: boolean;
  weekIndex: number;
}

// Build a weekOffset → chartValue map from tasks that have an explicit chartValue
const TASK_CHART_OVERRIDES: Record<number, number> = Object.fromEntries(
  CASH_FLOW_TASKS
    .filter((t) => t.chartValue !== undefined)
    .map((t) => [t.weekOffset, t.chartValue as number])
);

// Generate hypothetical cash flow data based on current date
function generateCashFlowData(paymentAmount?: number, paymentDate?: Date, todayBalanceOverride?: number): CashFlowDataPoint[] {
  const today = new Date();
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // midnight, no time component

  const data: CashFlowDataPoint[] = []
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - 7); // Start 1 week ago (so second point is today)

  // Today's balance — use override if provided, otherwise default
  const todayBalance = todayBalanceOverride ?? 42049;
  
  // Fixed seed values for consistent data generation (7 entries — 6 weekly anchors + 1 trailing endpoint)
  const seedValues = [0.6, 0.3, 0.8, 0.2, 0.5, 0.7, 0.6];
  const seedValues2 = [0.4, 0.7, 0.2, 0.9, 0.3, 0.6, 0.3];

  // Generate weekly anchor points first (7 anchors so the last week can interpolate to index 6)
  const weeklyAnchors: { balance: number; cashIn: number; cashOut: number; date: Date; isProjected: boolean }[] = [];

  for (let i = 0; i < 7; i++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (i * 7));
    
    const isProjected = i > 1;
    
    const baseCashIn = 15000 + seedValues[i] * 10000;
    const baseCashOut = 12000 + seedValues2[i] * 8000;
    
    const cashIn = isProjected ? baseCashIn * (0.9 + seedValues[i] * 0.2) : baseCashIn;
    const cashOut = isProjected ? baseCashOut * (0.9 + seedValues2[i] * 0.2) : baseCashOut;
    const netChange = cashIn - cashOut;
    
    // Anchor point at week 1 (today's week) should ensure today = 42,757
    let balance: number;
    if (i === 0) {
      balance = todayBalance - netChange;
    } else if (i === 1) {
      balance = todayBalance;
    } else {
      balance = weeklyAnchors[i - 1].balance + netChange;
    }

    // weekOffset i-1 maps to this anchor (anchor 0 = today-7, anchor 1 = today, anchor 2 = weekOffset 1, etc.)
    const taskOverride = TASK_CHART_OVERRIDES[i - 1];
    if (taskOverride !== undefined) {
      balance = taskOverride;
    }

    weeklyAnchors.push({
      balance: Math.round(balance),
      cashIn: Math.round(cashIn),
      cashOut: Math.round(cashOut),
      date: weekStart,
      isProjected,
    });
  }
  
  // Now generate daily data points by interpolating between weekly anchors
  let weekIndex = 0;
  for (let i = 0; i < 6; i++) {
    const weekStart = weeklyAnchors[i];
    const weekEnd = weeklyAnchors[i + 1];
    
    // Generate 7 daily points for this week
    for (let day = 0; day < 7; day++) {
      const currentDay = new Date(weekStart.date);
      currentDay.setDate(weekStart.date.getDate() + day);
      
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = monthNames[currentDay.getMonth()];
      const dayNum = String(currentDay.getDate()).padStart(2, '0');
      const year = currentDay.getFullYear();
      const dateLabel = `${month} ${dayNum} ${year}`;
      
      // Determine if this day is projected (after or equal to today for the transition)
      const isProjected = currentDay >= currentDate;
      
      // Interpolate values between week start and week end
      let balance, cashIn, cashOut;
      
      // Special handling for today (index 7)
      const globalIndex = i * 7 + day;
      if (globalIndex === 7) {
        // Exactly today - use the exact balance
        balance = todayBalance;
        cashIn = weekStart.cashIn / 7;
        cashOut = weekStart.cashOut / 7;
      } else if (!weekEnd) {
        // Last week - just use the week start values
        balance = weekStart.balance;
        cashIn = weekStart.cashIn / 7; // Distribute weekly values across 7 days
        cashOut = weekStart.cashOut / 7;
      } else {
        // Interpolate between this week and next week
        const progress = day / 7;
        balance = weekStart.balance + (weekEnd.balance - weekStart.balance) * progress;
        cashIn = (weekStart.cashIn + (weekEnd.cashIn - weekStart.cashIn) * progress) / 7;
        cashOut = (weekStart.cashOut + (weekEnd.cashOut - weekStart.cashOut) * progress) / 7;
      }
      
      // Apply payment impact if the payment date is on or before this date
      if (paymentAmount && paymentDate && currentDay >= paymentDate) {
        balance -= paymentAmount;
      }
      
      data.push({
        date: currentDay.toISOString(),
        dateLabel,
        cashIn: Math.round(cashIn),
        cashOut: Math.round(cashOut),
        balance: Math.round(balance),
        isProjected,
        weekIndex: day === 0 ? weekIndex : -1, // Only show label on week start (day 0)
      });
      
      if (day === 0) weekIndex++;
    }
  }
  
  return data;
}

// Helper function to calculate stats from cash flow data
function calculateStats(data: CashFlowDataPoint[], paymentAmount?: number, paymentDate?: Date) {
  const today = new Date();
  const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  // Find today's data
  const todayData = data.find(d => {
    const date = new Date(d.date);
    return date.getDate() === currentDate.getDate() && 
           date.getMonth() === currentDate.getMonth() &&
           date.getFullYear() === currentDate.getFullYear();
  });
  const todayChange = todayData ? todayData.cashIn - todayData.cashOut : 0;
  const todayBalance = todayData ? todayData.balance : 0;
  
  // Calculate next 1-7 days change
  const next7DaysEnd = new Date(currentDate);
  next7DaysEnd.setDate(currentDate.getDate() + 7);
  const next7DaysData = data.filter(d => {
    const date = new Date(d.date);
    return date >= currentDate && date <= next7DaysEnd;
  });
  let next7DaysChange = next7DaysData.reduce((sum, d) => sum + (d.cashIn - d.cashOut), 0);
  
  // Subtract payment if it falls within next 7 days
  if (paymentAmount && paymentDate) {
    if (paymentDate >= currentDate && paymentDate <= next7DaysEnd) {
      next7DaysChange -= paymentAmount;
    }
  }
  
  // Calculate next 8-30 days change
  const next8DaysStart = new Date(currentDate);
  next8DaysStart.setDate(currentDate.getDate() + 8);
  const next30DaysEnd = new Date(currentDate);
  next30DaysEnd.setDate(currentDate.getDate() + 30);
  const next8To30DaysData = data.filter(d => {
    const date = new Date(d.date);
    return date >= next8DaysStart && date <= next30DaysEnd;
  });
  let next8To30DaysChange = next8To30DaysData.reduce((sum, d) => sum + (d.cashIn - d.cashOut), 0);
  
  // Subtract payment if it falls within 8-30 days
  if (paymentAmount && paymentDate) {
    if (paymentDate >= next8DaysStart && paymentDate <= next30DaysEnd) {
      next8To30DaysChange -= paymentAmount;
    }
  }
  
  // Lowest projected balance (from today onwards)
  const projectedData = data.filter(d => {
    const date = new Date(d.date);
    return date >= currentDate;
  });
  const lowestProjected = projectedData.length > 0
    ? Math.min(...projectedData.map(d => d.balance))
    : todayBalance;

  // Balance at day 30
  const day30 = data.reduce<{ balance: number; date: Date } | null>((closest, d) => {
    const date = new Date(d.date);
    if (date < currentDate) return closest;
    const diff = Math.abs(date.getTime() - next30DaysEnd.getTime());
    if (!closest || diff < Math.abs(new Date(closest.date).getTime() - next30DaysEnd.getTime())) {
      return { balance: d.balance, date };
    }
    return closest;
  }, null);
  const balance30Days = day30 ? day30.balance : todayBalance;

  return {
    todayBalance: Math.round(todayBalance),
    todayChange: Math.round(todayChange),
    next7DaysChange: Math.round(next7DaysChange),
    next8To30DaysChange: Math.round(next8To30DaysChange),
    lowestProjected: Math.round(lowestProjected),
    balance30Days: Math.round(balance30Days),
  };
}

// Purple impact line color
const IMPACT_LINE_COLOR = '#9B59B6';

export { generateCashFlowData, computeImpactData };

function computeImpactData(
  baseData: CashFlowDataPoint[],
  selectedTaskIds: Set<string>,
): (number | null)[] {
  if (selectedTaskIds.size === 0) return baseData.map(() => null);

  const selectedTasks = CASH_FLOW_TASKS.filter((t) => selectedTaskIds.has(t.id));

  return baseData.map((d, i) => {
    // Only show impact line from today onwards (index 7)
    if (i < 7) return null;

    let cumulativeDelta = 0;
    for (const task of selectedTasks) {
      // This task's week starts at data index (task.weekOffset + 1) * 7
      const taskStart = (task.weekOffset + 1) * 7;
      const rampStart = taskStart - 7; // one week before, ramp begins at today (index 7)
      const clampedRampStart = Math.max(rampStart, 7);

      if (i >= taskStart) {
        // Fully applied
        cumulativeDelta += task.impactDelta;
      } else if (i >= clampedRampStart) {
        // Linear ramp over 7 days
        const progress = (i - clampedRampStart) / (taskStart - clampedRampStart);
        cumulativeDelta += progress * task.impactDelta;
      }
    }

    return Math.round(d.balance + cumulativeDelta);
  });
}

export function InteractiveCashFlowChart({ activeTaskId, selectedTaskIds = new Set<string>(), toleranceValue = null, todayBalance }: { activeTaskId?: string | null; selectedTaskIds?: Set<string>; toleranceValue?: number | null; todayBalance?: number }) {
  taskNodeState.activeTaskId = activeTaskId ?? null;
  const chartRef = useRef<ChartJS<'line'> | null>(null);
  const [todayLabel, setTodayLabel] = useState<{ x: number; y: number } | null>(null);
  const [paymentData, setPaymentData] = useState<{ amount: number; date: Date } | null>(null);

  // Trigger a redraw whenever activeTaskId changes so the plugin picks up the new state
  useEffect(() => {
    taskNodeState.activeTaskId = activeTaskId ?? null;
    chartRef.current?.update('none');
  }, [activeTaskId]);


  // Track today-line pixel position for label overlay
  useEffect(() => {
    const compute = () => {
      const chart = chartRef.current;
      if (!chart) return;
      const x = chart.scales.x.getPixelForValue(7);
      const y0 = chart.scales.y.getPixelForValue(0);
      const y20k = chart.scales.y.getPixelForValue(20000);
      setTodayLabel({ x, y: (y0 + y20k) / 2 });
    };
    const id = requestAnimationFrame(compute);
    const observer = new ResizeObserver(compute);
    if (chartRef.current?.canvas.parentElement) {
      observer.observe(chartRef.current.canvas.parentElement);
    }
    return () => { cancelAnimationFrame(id); observer.disconnect(); };
  }, []);

  // Function to load payment data from localStorage
  const loadPaymentData = () => {
    const stored = localStorage.getItem('paymentData');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const amount = parseFloat(parsed.amount?.replace(/\$/g, '').replace(/,/g, '') || '0');
        
        // Parse delivery date from format like "Mar 19, 2026" or "March 19, 2026"
        if (parsed.deliveryDate && amount > 0) {
          const dateParts = parsed.deliveryDate.match(/(\w+)\s+(\d+),\s+(\d+)/);
          if (dateParts) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            // Try to find month index using both full and short month names
            let monthIndex = monthNames.indexOf(dateParts[1]);
            if (monthIndex === -1) {
              monthIndex = monthNamesShort.indexOf(dateParts[1]);
            }
            
            const day = parseInt(dateParts[2]);
            const year = parseInt(dateParts[3]);
            
            if (monthIndex !== -1) {
              const date = new Date(year, monthIndex, day);
              setPaymentData({ amount, date });
            }
          }
        }
      } catch (error) {
        console.error('Error parsing payment data:', error);
      }
    }
  };

  // Load payment data on mount
  useEffect(() => {
    loadPaymentData();
  }, []);

  // Listen for custom event to refresh data
  useEffect(() => {
    const handlePaymentUpdate = () => {
      loadPaymentData();
    };

    window.addEventListener('paymentDataUpdated', handlePaymentUpdate);
    
    return () => {
      window.removeEventListener('paymentDataUpdated', handlePaymentUpdate);
    };
  }, []);

  const chartData = useMemo(() =>
    generateCashFlowData(paymentData?.amount, paymentData?.date, todayBalance),
    [paymentData, todayBalance]
  );
  const stats = useMemo(() => calculateStats(chartData, paymentData?.amount, paymentData?.date), [chartData, paymentData]);

  // Initial data — used to initialize the chart on first render only
  const initialData = useMemo(() => ({
    labels: chartData.map(d => d.dateLabel),
    datasets: [
      {
        label: 'Balance',
        data: chartData.map(d => d.balance),
        fill: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(228, 234, 240, 0.8)');
          gradient.addColorStop(0.88, 'rgba(228, 234, 240, 0)');
          return gradient;
        },
        borderColor: 'transparent',
        borderWidth: 0,
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0,
      },
      {
        label: 'Balance',
        data: chartData.map((d, i) => i <= 7 ? d.balance : null),
        fill: false,
        borderColor: '#828995',
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#828995',
        pointHoverBorderColor: '#828995',
        tension: 0,
        spanGaps: false,
      },
      {
        label: 'Forecast',
        data: chartData.map((d, i) => i >= 7 ? d.balance : null),
        fill: false,
        borderColor: '#828995',
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#828995',
        pointHoverBorderColor: '#828995',
        tension: 0,
        spanGaps: false,
      },
      {
        label: 'Impact',
        data: computeImpactData(chartData, selectedTaskIds),
        fill: false,
        borderColor: IMPACT_LINE_COLOR,
        borderWidth: 1.5,
        borderDash: [4, 4],
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0,
        spanGaps: false,
      },
      {
        label: 'Tolerance',
        data: toleranceValue !== null && !isNaN(toleranceValue)
          ? chartData.map(() => toleranceValue)
          : chartData.map(() => null),
        fill: false,
        borderColor: 'rgba(195, 18, 48, 0.5)',
        borderWidth: 1,
        borderDash: [],
        pointRadius: 0,
        pointHoverRadius: 0,
        tension: 0,
        spanGaps: false,
      },
    ],
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []); // intentionally empty — only used for initial render

  // Update chart data in place so Chart.js animates from previous values
  useEffect(() => {
    if (!chartRef.current) return;
    const chart = chartRef.current;
    chart.data.labels = chartData.map(d => d.dateLabel);
    chart.data.datasets[0].data = chartData.map(d => d.balance);
    chart.data.datasets[1].data = chartData.map((d, i) => i <= 7 ? d.balance : null);
    chart.data.datasets[2].data = chartData.map((d, i) => i >= 7 ? d.balance : null);
    chart.data.datasets[3].data = computeImpactData(chartData, selectedTaskIds);
    chart.data.datasets[4].data = toleranceValue !== null && !isNaN(toleranceValue)
      ? chartData.map(() => toleranceValue)
      : chartData.map(() => null);
    chart.update();
  }, [chartData, selectedTaskIds, toleranceValue]);

  const data = initialData;
  
  // Chart options
  const options: ChartOptions<'line'> = {
    animation: {
      duration: 400,
      easing: 'easeInOutQuart',
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#ffffff',
        titleColor: '#1e3145',
        bodyColor: '#59606d',
        borderColor: '#e6e7e9',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 600 as const,
          family: 'Inter, sans-serif',
        },
        bodyFont: {
          size: 13,
          family: 'Inter, sans-serif',
        },
        bodySpacing: 4,
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return chartData[index].dateLabel;
          },
          label: (context) => {
            const index = context.dataIndex;
            const dataPoint = chartData[index];
            
            // Only show once (for the first dataset)
            if (context.datasetIndex !== 0) return '';
            
            return [
              `Balance: $${dataPoint.balance.toLocaleString()}`,
              `Cash in: $${dataPoint.cashIn.toLocaleString()}`,
              `Cash out: $${dataPoint.cashOut.toLocaleString()}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#59606d',
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          padding: 5,
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          callback: function(_value, index) {
            // Show labels at each weekly boundary: 0, 7, 14, 21, 28
            if (index % 7 === 0 && index <= 35) {
              return chartData[index]?.dateLabel || '';
            }
            return '';
          },
        },
      },
      y: {
        min: 0,
        max: 80000,
        grid: {
          color: '#E6E7E9',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#59606d',
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          padding: 5,
          stepSize: 20000,
          callback: function(value) {
            if (typeof value === 'number' && value >= 1000) {
              return `${value / 1000}K`;
            }
            return value;
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };
  
  return (
    <div className="flex flex-col w-full h-full pt-0 px-[20px]">
      <div className="relative" style={{ height: '100%', width: '100%' }}>
        <Line ref={chartRef} data={data} options={options} />
        {todayLabel !== null && (
          <>
            {/* Actual pill — right edge flush with today line */}
            <div
              className="absolute pointer-events-none flex items-center gap-[3px] bg-[#f6f6f8] rounded-l-[99px] pr-[6px] pl-[5px] py-[3px]"
              style={{ right: `calc(100% - ${todayLabel.x - 2}px)`, top: todayLabel.y, transform: 'translateY(-50%)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M6.5 8L3.5 5L6.5 2" stroke="#59606d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold text-[#59606d] text-[11px] leading-none whitespace-nowrap">Actual</span>
            </div>
            {/* Projected pill — left edge flush with today line */}
            <div
              className="absolute pointer-events-none flex items-center gap-[3px] bg-[#f6f6f8] rounded-r-[99px] pl-[6px] pr-[5px] py-[3px]"
              style={{ left: todayLabel.x + 2, top: todayLabel.y, transform: 'translateY(-50%)' }}
            >
              <span className="font-semibold text-[#59606d] text-[11px] leading-none whitespace-nowrap">Projected</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3.5 2L6.5 5L3.5 8" stroke="#59606d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </>
        )}
      </div>

    </div>
  );
}

export function useCashFlowStats(todayBalance?: number) {
  const [paymentData, setPaymentData] = useState<{ amount: number; date: Date } | null>(null);

  // Function to load payment data from localStorage
  const loadPaymentData = () => {
    const stored = localStorage.getItem('paymentData');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const amount = parseFloat(parsed.amount?.replace(/\$/g, '').replace(/,/g, '') || '0');
        
        // Parse delivery date from format like "Mar 19, 2026" or "March 19, 2026"
        if (parsed.deliveryDate && amount > 0) {
          const dateParts = parsed.deliveryDate.match(/(\w+)\s+(\d+),\s+(\d+)/);
          if (dateParts) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            
            // Try to find month index using both full and short month names
            let monthIndex = monthNames.indexOf(dateParts[1]);
            if (monthIndex === -1) {
              monthIndex = monthNamesShort.indexOf(dateParts[1]);
            }
            
            const day = parseInt(dateParts[2]);
            const year = parseInt(dateParts[3]);
            
            if (monthIndex !== -1) {
              const date = new Date(year, monthIndex, day);
              setPaymentData({ amount, date });
            }
          }
        }
      } catch (error) {
        console.error('Error parsing payment data:', error);
      }
    }
  };

  // Load payment data on mount
  useEffect(() => {
    loadPaymentData();
  }, []);

  // Listen for custom event to refresh data
  useEffect(() => {
    const handlePaymentUpdate = () => {
      loadPaymentData();
    };

    window.addEventListener('paymentDataUpdated', handlePaymentUpdate);
    
    return () => {
      window.removeEventListener('paymentDataUpdated', handlePaymentUpdate);
    };
  }, []);

  const chartData = useMemo(() =>
    generateCashFlowData(paymentData?.amount, paymentData?.date, todayBalance),
    [paymentData, todayBalance]
  );
  return useMemo(() => calculateStats(chartData, paymentData?.amount, paymentData?.date), [chartData, paymentData]);
}