const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware.verifyToken);

router.route('/')
    .get(attendanceController.getAllAttendance)
    .post(attendanceController.checkIn);

// Use PATCH for partial updates (like just updating the checkout time)
router.route('/:id/checkout')
    .patch(attendanceController.checkOut);

module.exports = router;