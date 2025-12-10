const router = require('express').Router();
const { authMiddleware } = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

router.get('/me', authMiddleware, userController.me);
router.get('/', authMiddleware, userController.listUsers);

module.exports = router;
