// small helpers for aggregation result normalization

function toLabelsValues(rows, idKey = '_id', valueKey = 'avgScore') {
  const labels = rows.map(r => new Date(r[idKey]).toDateString());
  const values = rows.map(r => Math.round(r[valueKey] || 0));
  return { labels, values };
}

module.exports = { toLabelsValues };
