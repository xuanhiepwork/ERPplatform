const catchAsync = require('../../../core/utils/catchAsync');

// Temporary mock data for Contracts until a proper DB schema exists
const sampleContracts = [
    { id: 1, title: 'Service Agreement (ABC Corp)', party: 'ABC Corp', start_date: '2024-01-01', end_date: '2025-01-01', status: 'Active' },
    { id: 2, title: 'Consulting Contract (XYZ Ltd)', party: 'XYZ Ltd', start_date: '2023-08-01', end_date: '2024-08-01', status: 'Expiring' }
];

exports.getAllContracts = catchAsync(async (req, res) => {
    res.status(200).json({ success: true, results: sampleContracts.length, data: sampleContracts });
});

exports.getExpiringContracts = catchAsync(async (req, res) => {
    const expiring = sampleContracts.filter(c => c.status === 'Expiring');
    res.status(200).json({ success: true, results: expiring.length, data: expiring });
});
