// minimal client chart bootstrap - assumes Chart.js already loaded by view
function drawLine(ctxId, labels, values) {
  const el = document.getElementById(ctxId);
  if (!el) return;
  new Chart(el, {
    type: 'line',
    data: { labels, datasets: [{ label: 'Rata-rata', data: values, fill: true, tension: 0.25 }] },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}
