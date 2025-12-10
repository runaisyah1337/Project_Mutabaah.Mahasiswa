const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekStart: { type: Date, required: true },
  weekEnd: { type: Date, required: true },
  submittedAt: { type: Date, default: Date.now },
  content: { type: mongoose.Schema.Types.Mixed, default: {} }, // flexible structure
  final: { type: Boolean, default: false },
  version: { type: Number, default: 1 },
}, { collection: 'evaluations' });

evaluationSchema.index({ studentId: 1, weekStart: 1 });

module.exports = mongoose.model('Evaluation', evaluationSchema);
