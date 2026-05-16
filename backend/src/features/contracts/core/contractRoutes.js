const express = require('express');
const router = express.Router();
const contractController = require('./contractController');
const authMiddleware = require('../../../core/middlewares/authMiddleware');

// All contract APIs require authentication
router.use(authMiddleware.verifyToken);

router.get('/', contractController.getAllContracts);
router.get('/expiring', contractController.getExpiringContracts);

module.exports = router;
