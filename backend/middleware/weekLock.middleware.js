// This middleware checks if current week's evaluation is locked (finalized).
// For now, it queries evaluations collection for a 'final' flag for current user/week.
// If locked, prevents submit (HTTP 403).

const Evaluation = require('../models/evaluation.model');
const { getWeekBoundsByDate } = require('../utils/week.util');

async function weekLockMiddleware(req, res, next) {
  try {
    const { weekStart } = getWeekBoundsByDate(new Date());
    const existsFinal = await Evaluation.exists({ studentId: req.user.id, weekStart: weekStart, final: true });
    if (existsFinal) return res.status(403).json({ message: 'This week is locked. No more edits allowed.' });
    next();
  } catch (err) {
    console.error('weekLockMiddleware error', err);
    next(); // don't block on error
  }
}

module.exports = { weekLockMiddleware };
