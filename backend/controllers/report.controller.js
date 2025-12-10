const Evaluation = require('../models/evaluation.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');

/**
 * Return aggregated weekly averages for admin (all students)
 * Response simplified: { labels: [...], values: [...] }
 */
async function summaryAll(req, res) {
  try {
    const pipeline = [
      { $match: { final: true } },
      { $group: { _id: "$weekStart", avgScore: { $avg: "$content.score" } } },
      { $sort: { _id: 1 } }
    ];
    const rows = await Evaluation.aggregate(pipeline);
    const labels = rows.map(r => new Date(r._id).toDateString());
    const values = rows.map(r => Math.round(r.avgScore));
    res.json({ labels, values });
  } catch (err) {
    console.error('summaryAll error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

/**
 * Return aggregated average per week for a pembina's students
 * Query param: pembinaId
 */
async function pembinaReport(req, res) {
  try {
    const pembinaId = req.params.id;
    // find students who have pembinaId
    const students = await User.find({ pembinaId: mongoose.Types.ObjectId(pembinaId) }).select('_id name');
    const ids = students.map(s => s._id);
    const pipeline = [
      { $match: { final: true, studentId: { $in: ids } } },
      { $group: { _id: "$weekStart", avgScore: { $avg: "$content.score" } } },
      { $sort: { _id: 1 } }
    ];
    const rows = await Evaluation.aggregate(pipeline);
    const labels = rows.map(r => new Date(r._1).toDateString()); // note: using _id
    const values = rows.map(r => Math.round(r.avgScore));
    res.json({ labels, values, students });
  } catch (err) {
    console.error('pembinaReport error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

/**
 * Student report: final evaluations for a student
 */
async function studentReport(req, res) {
  try {
    const studentId = req.params.id;
    const rows = await Evaluation.find({ studentId, final: true }).sort({ weekStart: 1 });
    const labels = rows.map(r => new Date(r.weekStart).toDateString());
    const values = rows.map(r => r.content.score || 0);
    res.json({ labels, values });
  } catch (err) {
    console.error('studentReport error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { summaryAll, pembinaReport, studentReport };
