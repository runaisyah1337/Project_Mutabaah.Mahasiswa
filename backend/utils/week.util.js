function getWeekBoundsByDate(date = new Date()) {
  const d = new Date(date);
  d.setHours(0,0,0,0);
  const day = d.getDay(); // 0 = Sunday
  const prevSunday = new Date(d);
  prevSunday.setDate(d.getDate() - day);
  prevSunday.setHours(0,0,0,0);
  const nextSunday = new Date(prevSunday);
  nextSunday.setDate(prevSunday.getDate() + 7);
  nextSunday.setHours(0,0,0,0);
  return { weekStart: prevSunday, weekEnd: nextSunday };
}

// placeholder for cron job to lock weeks (e.g., set latest eval final true)
async function lockWeekJob() {
  // Implement locking logic when migrating to production.
  // For now, it's a placeholder so cron can call it without error.
  console.log('lockWeekJob executed (placeholder).');
}

module.exports = { getWeekBoundsByDate, lockWeekJob };
