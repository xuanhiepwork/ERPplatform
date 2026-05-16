const express = require('express');
const systemController = require('./systemController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.verifyToken);

router.get('/search', systemController.globalSearch);
router.get('/notifications', systemController.getNotifications);
router.patch('/notifications/read-all', systemController.markAllNotificationsRead);
router.patch('/notifications/:id/read', systemController.markNotificationRead);

module.exports = router;
