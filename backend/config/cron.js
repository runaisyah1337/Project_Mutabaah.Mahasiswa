const nodeCron = require('node-cron');
const { lockWeekJob } = require('../utils/week.util');

function startCron() {
  const enable = process.env.ENABLE_CRON === 'true';
  if (!enable) {
    console.log('Cron disabled (ENABLE_CRON not true)');
    return;
  }

  // Sunday midnight in specified timezone
  nodeCron.schedule('0 0 * * 0', async () => {
    try {
      await lockWeekJob();
      console.log('[cron] weekly lock completed');
    } catch (err) {
      console.error('[cron] weekly lock error', err);
    }
  }, { timezone: process.env.TIMEZONE || 'Asia/Jakarta' });

  console.log('Cron jobs scheduled (weekly lock on Sunday 00:00)');
}

module.exports = { startCron };
