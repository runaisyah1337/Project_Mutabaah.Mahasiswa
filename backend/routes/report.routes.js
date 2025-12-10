const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const reportController = require('../controllers/report.controller');

router.get('/summary', authMiddleware, authorize(['admin']), reportController.summaryAll);
router.get('/student/:id', authMiddleware, authorize(['pembina','admin']), reportController.studentReport);
router.get('/pembina/:id', authMiddleware, authorize(['pembina','admin']), reportController.pembinaReport);

module.exports = router;
