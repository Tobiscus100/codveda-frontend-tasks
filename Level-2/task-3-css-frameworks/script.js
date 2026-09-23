document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('table-search');
  const tableRows = document.querySelectorAll('#transaction-rows tr');
  const filterAllBtn = document.getElementById('filter-all');
  const filterMonthBtn = document.getElementById('filter-month');

  // Real-time table search filter
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    tableRows.forEach((row) => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(term) ? '' : 'none';
    });
  });

  // Toggle filter active styles
  filterAllBtn.addEventListener('click', () => {
    filterAllBtn.className = 'px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 transition font-semibold';
    filterMonthBtn.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition font-semibold';
  });

  filterMonthBtn.addEventListener('click', () => {
    filterMonthBtn.className = 'px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 transition font-semibold';
    filterAllBtn.className = 'px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 transition font-semibold';
  });
});