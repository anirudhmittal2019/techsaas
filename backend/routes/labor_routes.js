// /routes/labor_routes.js
const express = require('express');
const {
    addLabor,
    updateAttendance,
    managePayroll,
    createShift,
    generateJoinLetter,
    generateResignationLetter,
    getLaborSummary,
} = require('../controllers/labor_controller');
const router = express.Router();

router.post('/add-labor', addLabor);
router.put('/update-attendance', updateAttendance);
router.put('/manage-payroll', managePayroll);
router.post('/create-shift', createShift);
router.post('/generate-join-letter', generateJoinLetter);
router.post('/generate-resignation-letter', generateResignationLetter);
router.get('/labor-summary', getLaborSummary);

module.exports = router;
