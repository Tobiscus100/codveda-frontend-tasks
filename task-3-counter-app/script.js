document.addEventListener('DOMContentLoaded', () => {
  const counterDisplay = document.getElementById('counter-value');
  const incrementBtn = document.getElementById('increment-btn');
  const decrementBtn = document.getElementById('decrement-btn');
  const resetBtn = document.getElementById('reset-btn');
  const stepButtons = document.querySelectorAll('.step-btn');
  const stepIndicator = document.getElementById('step-indicator');
  const logList = document.getElementById('log-list');
  const clearLogBtn = document.getElementById('clear-log-btn');

  let count = parseInt(localStorage.getItem('apex_count_val'), 10) || 0;
  let step = 1;

  const getFormattedTime = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  const logMutation = (actionType, prevVal, nextVal) => {
    const emptyNotice = logList.querySelector('.log-empty');
    if (emptyNotice) {
      emptyNotice.remove();
    }

    const item = document.createElement('li');
    item.className = 'log-item';

    let actionClass = 'log-action-inc';
    let symbol = '+';
    if (actionType === 'DECREMENT') {
      actionClass = 'log-action-dec';
      symbol = '-';
    } else if (actionType === 'RESET') {
      actionClass = 'log-action-reset';
      symbol = '↺';
    }

    item.innerHTML = `
      <span class="${actionClass}">[${symbol}] ${actionType}: ${prevVal} &rarr; ${nextVal}</span>
      <span class="log-time">${getFormattedTime()}</span>
    `;

    logList.prepend(item);

    if (logList.children.length > 10) {
      logList.removeChild(logList.lastChild);
    }
  };

  const updateUI = (animationClass = '') => {
    counterDisplay.textContent = count;
    localStorage.setItem('apex_count_val', count);

    // Floor limit requirement: Never go below 0
    decrementBtn.disabled = (count <= 0);

    if (animationClass) {
      counterDisplay.classList.remove('pulse-up', 'pulse-down', 'shake-floor');
      void counterDisplay.offsetWidth;
      counterDisplay.classList.add(animationClass);
    }
  };

  const increment = () => {
    const prev = count;
    count += step;
    logMutation('INCREMENT', prev, count);
    updateUI('pulse-up');
  };

  const decrement = () => {
    if (count <= 0) {
      updateUI('shake-floor');
      return;
    }
    const prev = count;
    count = Math.max(0, count - step);
    logMutation('DECREMENT', prev, count);
    updateUI('pulse-down');
  };

  const reset = () => {
    if (count === 0) return;
    const prev = count;
    count = 0;
    logMutation('RESET', prev, count);
    updateUI('pulse-down');
  };

  incrementBtn.addEventListener('click', increment);
  decrementBtn.addEventListener('click', decrement);
  resetBtn.addEventListener('click', reset);

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      stepButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      step = parseInt(btn.getAttribute('data-step'), 10);
      stepIndicator.textContent = `±${step}`;
    });
  });

  clearLogBtn.addEventListener('click', () => {
    logList.innerHTML = '<li class="log-empty">No mutations recorded yet.</li>';
  });

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === '+' || e.key === '=' || e.key === 'ArrowUp') {
      e.preventDefault();
      increment();
    } else if (e.key === '-' || e.key === '_' || e.key === 'ArrowDown') {
      e.preventDefault();
      decrement();
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      reset();
    }
  });

  updateUI();
});