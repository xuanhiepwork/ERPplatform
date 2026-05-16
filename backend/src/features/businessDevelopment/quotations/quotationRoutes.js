const express = require('express');
const quotationController = require('./quotationController');
const authMiddleware = require('../../../core/middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.verifyToken);
router.post('/send', quotationController.sendQuotation);

module.exports = router;
