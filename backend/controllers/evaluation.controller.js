const Evaluation = require('../models/evaluation.model');
const { getWeekBoundsByDate } = require('../utils/week.util');
const mongoose = require('mongoose');

async function submitEvaluation(req, res) {
  try {
    const userId = req.user.id;
    const { weekStart, weekEnd } = getWeekBoundsByDate(new Date());
    const content = req.body.content || req.body;

    // compute version: count existing versions for same week
    const count = await Evaluation.countDocuments({ studentId: userId, weekStart });
    const version = count + 1;

    let evalDoc = new Evaluation({
      studentId: userId,
      weekStart,
      weekEnd,
      content,
      final: false,
      version
    });

    evalDoc = await evalDoc.save();
    return res.status(201).json(evalDoc);
  } catch (err) {
    console.error('submitEvaluation error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function myHistory(req, res) {
  try {
    const userId = req.user.id;
    const evals = await Evaluation.find({ studentId: userId }).sort({ submittedAt: -1 }).limit(200);
    res.json(evals);
  } catch (err) {
    console.error('myHistory error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function latestForStudent(req, res) {
  try {
    const studentId = req.params.studentId || req.user.id;
    const latest = await Evaluation.findOne({ studentId }).sort({ submittedAt: -1 });
    res.json(latest || null);
  } catch (err) {
    console.error('latestForStudent error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { submitEvaluation, myHistory, latestForStudent };
