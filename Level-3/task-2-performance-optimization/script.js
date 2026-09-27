document.addEventListener('DOMContentLoaded', () => {
  const domEl = document.getElementById('val-dom');
  const fcpEl = document.getElementById('val-fcp');
  const lcpEl = document.getElementById('val-lcp');
  const clsEl = document.getElementById('val-cls');

  // 1. Measure Navigation / DOM Ready Timing
  const [navEntry] = performance.getEntriesByType('navigation');
  if (navEntry) {
    const domTime = Math.round(navEntry.domContentLoadedEventEnd - navEntry.startTime);
    domEl.textContent = `${domTime} ms`;
  }

  // 2. Measure First Contentful Paint (FCP)
  try {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      fcpEl.textContent = `${Math.round(fcpEntry.startTime)} ms`;
    } else {
      const paintObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            fcpEl.textContent = `${Math.round(entry.startTime)} ms`;
            paintObserver.disconnect();
          }
        }
      });
      paintObserver.observe({ type: 'paint', buffered: true });
    }
  } catch (err) {
    fcpEl.textContent = 'N/A';
  }

  // 3. Measure Largest Contentful Paint (LCP)
  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        lcpEl.textContent = `${Math.round(lastEntry.startTime)} ms`;
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (err) {
    lcpEl.textContent = 'N/A';
  }

  // 4. Measure Cumulative Layout Shift (CLS)
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEl.textContent = clsValue.toFixed(3);
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (err) {
    clsEl.textContent = '0.000';
  }
});