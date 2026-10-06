:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.5;
  font-weight: 500;
  color: #e5e7eb;
  background: #07111f;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  min-height: 100%;
  height: 100%;
}

body {
  background:
    radial-gradient(circle at top left, rgba(124, 58, 237, 0.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(34, 197, 94, 0.14), transparent 32%),
    #07111f;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  position: relative;
  min-height: 100vh;
  padding: 28px;
  overflow: hidden;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto 18px;
}

.eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7dd3fc;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: -0.06em;
}

.header-badges {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status-pill.bullish {
  background: rgba(34, 197, 94, 0.16);
  color: #86efac;
}

.status-pill.bearish {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.status-pill.neutral {
  background: rgba(96, 165, 250, 0.14);
  color: #bfdbfe;
}

.chart-panel {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid rgba(148, 163, 184, 0.16);
  background: rgba(15, 23, 42, 0.76);
  border-radius: 22px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.42);
  padding: 18px 18px 12px;
  backdrop-filter: blur(10px);
}

.chart-labels {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #cbd5e1;
  font-size: 13px;
  margin-bottom: 8px;
}

.candles-chart {
  width: 100%;
  height: 430px;
  display: block;
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.94));
}

.grid-line {
  stroke: rgba(148, 163, 184, 0.17);
  stroke-width: 1;
}

.floating-assistant {
  position: fixed;
  width: min(330px, calc(100vw - 40px));
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.8);
  border-radius: 18px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.72);
  padding: 12px 14px 14px;
  backdrop-filter: blur(14px);
  user-select: none;
  z-index: 10;
}

.assistant-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: #cbd5e1;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
  cursor: grab;
}

.drag-handle {
  font-weight: 700;
  color: #94a3b8;
}

.status-dot {
  width: 10px;
  height: 10px;
  margin-left: auto;
  border-radius: 50%;
  display: inline-block;
}

.status-dot.bullish {
  background: #22c55e;
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.8);
}

.status-dot.bearish {
  background: #ef4444;
  box-shadow: 0 0 18px rgba(239, 68, 68, 0.8);
}

.signal-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.signal-grid label,
.trade-form label {
  display: block;
  font-size: 11px;
  color: #94a3b8;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.signal-readout {
  margin-top: 6px;
  padding: 8px 10px;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.9);
  font-size: 18px;
  font-weight: 700;
}

.signal-readout.bullish {
  color: #86efac;
}

.signal-readout.bearish {
  color: #fca5a5;
}

.signal-readout.neutral {
  color: #bfdbfe;
}

.trade-form {
  display: grid;
  gap: 12px;
  margin-top: 14px;
}

.trade-form input,
.trade-form select,
.trade-form textarea {
  width: 100%;
  margin-top: 6px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: rgba(15, 23, 42, 0.7);
  color: #e2e8f0;
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
}

.trade-form textarea {
  resize: vertical;
  min-height: 72px;
}

.risk-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(59, 130, 246, 0.18);
  background: rgba(59, 130, 246, 0.08);
  padding: 10px 12px;
  border-radius: 10px;
  color: #bfdbfe;
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.submit-button {
  margin-top: 14px;
  width: 100%;
  border: none;
  background: linear-gradient(90deg, #7c3aed, #2563eb);
  border-radius: 12px;
  padding: 12px 14px;
  color: white;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (max-width: 720px) {
  .app-shell {
    padding: 16px;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .chart-panel {
    padding: 14px 12px 8px;
  }

  .candles-chart {
    height: 300px;
  }
}
