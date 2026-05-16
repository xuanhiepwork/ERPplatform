const express = require('express');
const restrictTo = require('../../../core/middlewares/restrictTo');
const financeController = require('./financeController');
const authMiddleware = require('../../../core/middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.verifyToken);
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Finance API is working correctly!'
    });
});
router.get('/cashflow-stats',
    restrictTo('Founder', 'Manager'),
    financeController.getCashflowStats
);

// Profit & Loss endpoint (sample)
router.get('/profit-loss',
    restrictTo('Founder', 'Manager'),
    financeController.getProfitLoss
);

// Receivables & Payables for Finance UI
router.get('/receivables',
    restrictTo('Founder', 'Manager'),
    financeController.getReceivables
);

router.get('/payables',
    restrictTo('Founder', 'Manager'),
    financeController.getPayables
);

// Asset register and departmental budgets
router.get('/assets',
    restrictTo('Founder', 'Manager'),
    financeController.getAssets
);

router.get('/budgets',
    restrictTo('Founder', 'Manager'),
    financeController.getBudgets
);

// Asset maintenance endpoints
router.get('/assets/:assetId/maintenance',
    restrictTo('Founder', 'Manager'),
    financeController.getAssetMaintenance
);

router.post('/assets/:assetId/maintenance',
    restrictTo('Founder', 'Manager'),
    financeController.addAssetMaintenance
);

// Approvals & payment actions
router.post('/expenses/:id/approve',
    restrictTo('Founder', 'Manager', 'Accountant'),
    financeController.approveExpense
);

router.post('/expenses/:id/reject',
    restrictTo('Founder', 'Manager', 'Accountant'),
    financeController.rejectExpense
);

router.get('/expenses/:id',
    restrictTo('Founder', 'Manager', 'Accountant'),
    financeController.getExpenseById
);

router.post('/payments/:id/mark-paid',
    restrictTo('Founder', 'Manager', 'Accountant'),
    financeController.markPaymentPaid
);

router.post('/deals/:id/mark-paid',
    restrictTo('Founder', 'Manager', 'Accountant'),
    financeController.markDealPaid
);

module.exports = router;
