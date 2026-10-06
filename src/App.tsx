import { useEffect, useMemo, useState } from 'react';

type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type TradeSide = 'Buy' | 'Sell';

type TradePlan = {
  side: TradeSide;
  entry: number;
  stop: number;
  target: number;
  notes: string;
};

const chartWidth = 980;
const chartHeight = 430;
const chartPadding = 26;

function generateCandles(count: number): Candle[] {
  const candles: Candle[] = [];
  let price = 100;

  for (let index = 0; index < count; index += 1) {
    const open = Number((price + (Math.random() - 0.45) * 5).toFixed(2));
    const drift = (Math.random() - 0.5) * 8;
    const close = Number((open + drift).toFixed(2));
    const high = Number((Math.max(open, close) + Math.random() * 3 + 0.8).toFixed(2));
    const low = Number((Math.min(open, close) - (Math.random() * 3 + 0.8)).toFixed(2));

    candles.push({
      time: `T${index + 1}`,
      open,
      high,
      low,
      close
    });

    price = close;
  }

  return candles;
}

function App() {
  const candles = useMemo(() => generateCandles(80), []);
  const lastCandle = candles[candles.length - 1];
  const signal = lastCandle.close >= lastCandle.open ? 'Bullish' : 'Bearish';

  const [overlayPosition, setOverlayPosition] = useState({ x: 30, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [countdown, setCountdown] = useState(75);
  const [tradePlan, setTradePlan] = useState<TradePlan>({
    side: 'Buy',
    entry: Number(lastCandle.close.toFixed(2)),
    stop: Number((lastCandle.close * 0.985).toFixed(2)),
    target: Number((lastCandle.close * 1.02).toFixed(2)),
    notes: 'Manual setup awaiting confirmation.'
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown((current) => (current > 0 ? current - 1 : 75));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const minValue = Math.min(...candles.map((candle) => candle.low));
  const maxValue = Math.max(...candles.map((candle) => candle.high));
  const valueRange = maxValue - minValue || 1;

  const candleWidth = 8;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragOffset({
      x: event.clientX - overlayPosition.x,
      y: event.clientY - overlayPosition.y
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const nextX = event.clientX - dragOffset.x;
    const nextY = event.clientY - dragOffset.y;

    setOverlayPosition({
      x: Math.min(Math.max(nextX, 12), window.innerWidth - 360),
      y: Math.min(Math.max(nextY, 12), window.innerHeight - 260)
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleTradeChange = <K extends keyof TradePlan>(key: K, value: TradePlan[K]) => {
    setTradePlan((current) => ({ ...current, [key]: value }));
  };

  const pricePips = Math.abs(lastCandle.close - tradePlan.entry).toFixed(2);
  const formattedCountdown = `${String(Math.floor(countdown / 60)).padStart(2, '0')}:${String(
    countdown % 60
  ).padStart(2, '0')}`;

  return (
    <div className="app-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Manual trade assistant</p>
          <h1>Floating Trading Assistant</h1>
        </div>
        <div className="header-badges">
          <span className={`status-pill ${signal.toLowerCase()}`}>{signal}</span>
          <span className="status-pill neutral">LIVE</span>
        </div>
      </div>

      <div className="chart-panel">
        <div className="chart-labels">
          <span>Price</span>
          <span>{lastCandle.close.toFixed(2)}</span>
        </div>

        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="candles-chart" role="img" aria-label="Price chart">
          <defs>
            <linearGradient id="chartGlow" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3, 4].map((step) => {
            const y = chartPadding + (step / 4) * (chartHeight - chartPadding * 2);
            return <line key={step} x1={0} x2={chartWidth} y1={y} y2={y} className="grid-line" />;
          })}

          {candles.map((candle, index) => {
            const x = chartPadding + index * 11;
            const bodyTop = chartPadding + ((maxValue - Math.max(candle.open, candle.close)) / valueRange) * (chartHeight - chartPadding * 2);
            const bodyBottom = chartPadding + ((maxValue - Math.min(candle.open, candle.close)) / valueRange) * (chartHeight - chartPadding * 2);
            const wickTop = chartPadding + ((maxValue - candle.high) / valueRange) * (chartHeight - chartPadding * 2);
            const wickBottom = chartPadding + ((maxValue - candle.low) / valueRange) * (chartHeight - chartPadding * 2);
            const isBull = candle.close >= candle.open;

            return (
              <g key={`${candle.time}-${index}`}>
                <line
                  x1={x + candleWidth / 2}
                  x2={x + candleWidth / 2}
                  y1={wickTop}
                  y2={wickBottom}
                  stroke={isBull ? '#22c55e' : '#ef4444'}
                  strokeWidth="1.2"
                />
                <rect
                  x={x}
                  y={bodyTop}
                  width={candleWidth}
                  height={Math.max(4, bodyBottom - bodyTop)}
                  rx={2}
                  fill={isBull ? '#22c55e' : '#ef4444'}
                  opacity={0.9}
                />
              </g>
            );
          })}

          <path
            d={`M ${chartPadding} ${chartPadding + ((maxValue - lastCandle.close) / valueRange) * (chartHeight - chartPadding * 2)} ${candles
              .map((candle, index) => {
                const x = chartPadding + index * 11;
                const y = chartPadding + ((maxValue - candle.close) / valueRange) * (chartHeight - chartPadding * 2);
                return ` L ${x} ${y}`;
              })
              .join(' ')}`
            fill="none"
            stroke="url(#chartGlow)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div
        className="floating-assistant"
        style={{ left: overlayPosition.x, top: overlayPosition.y }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div className="assistant-header">
          <span className="drag-handle">⋮⋮</span>
          <strong>Signal panel</strong>
          <span className={`status-dot ${signal.toLowerCase()}`} />
        </div>

        <div className="signal-grid">
          <div>
            <label>Bias</label>
            <div className={`signal-readout ${signal.toLowerCase()}`}>{signal}</div>
          </div>
          <div>
            <label>Price</label>
            <div className="signal-readout neutral">{lastCandle.close.toFixed(2)}</div>
          </div>
        </div>

        <div className="countdown-box" aria-live="polite">
          <span>Next candle</span>
          <strong>{formattedCountdown}</strong>
        </div>

        <div className="trade-form">
          <label>
            Side
            <select
              value={tradePlan.side}
              onChange={(event) => handleTradeChange('side', event.target.value as TradeSide)}
            >
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </label>

          <label>
            Entry
            <input
              type="number"
              step="0.01"
              value={tradePlan.entry}
              onChange={(event) => handleTradeChange('entry', Number(event.target.value))}
            />
          </label>

          <label>
            Stop
            <input
              type="number"
              step="0.01"
              value={tradePlan.stop}
              onChange={(event) => handleTradeChange('stop', Number(event.target.value))}
            />
          </label>

          <label>
            Target
            <input
              type="number"
              step="0.01"
              value={tradePlan.target}
              onChange={(event) => handleTradeChange('target', Number(event.target.value))}
            />
          </label>

          <div className="risk-box">
            <span>Distance</span>
            <strong>{pricePips}</strong>
          </div>

          <label>
            Notes
            <textarea
              value={tradePlan.notes}
              onChange={(event) => handleTradeChange('notes', event.target.value)}
            />
          </label>
        </div>

        <button type="button" className="submit-button">
          Record manual plan
        </button>
      </div>
    </div>
  );
}

export default App;
