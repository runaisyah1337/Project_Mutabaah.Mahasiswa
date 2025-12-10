const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const evaluationController = require('../controllers/evaluation.controller');

router.post('/submit', authMiddleware, evaluationController.submitEvaluation);
router.get('/my-history', authMiddleware, evaluationController.myHistory);
router.get('/latest/:studentId?', authMiddleware, evaluationController.latestForStudent);

module.exports = router;
