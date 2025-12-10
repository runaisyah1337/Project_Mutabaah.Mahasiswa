require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const { startCron } = require('./config/cron');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('Warning: DB connection error (startup) - continuing in degraded mode', err.message);
  }

  // start cron if enabled
  try {
    startCron();
  } catch (err) {
    console.warn('Warning: cron start failed', err.message);
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
