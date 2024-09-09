// /controllers/labor_controller.js
const Labor = require('../models/Labor');
const Shift = require('../models/Shift');
const { generateAILetter, generateLaborSummary } = require('../services/ai_service');

const addLabor = async (req, res) => {
    const { name, position, payroll } = req.body;
    try {
        const labor = new Labor({ name, position, payroll });
        await labor.save();
        res.status(201).send({ message: 'Labor added', labor });
    } catch (error) {
        res.status(500).send({ message: 'Error adding labor', error });
    }
};

const updateAttendance = async (req, res) => {
    const { laborId, date, present } = req.body;
    try {
        const labor = await Labor.findById(laborId);
        if (!labor) return res.status(404).send({ message: 'Labor not found' });

        labor.attendance.set(date, present);
        await labor.save();
        res.status(200).send({ message: 'Attendance updated', labor });
    } catch (error) {
        res.status(500).send({ message: 'Error updating attendance', error });
    }
};

const managePayroll = async (req, res) => {
    const { laborId, salaryPaid } = req.body;
    try {
        const labor = await Labor.findById(laborId);
        if (!labor) return res.status(404).send({ message: 'Labor not found' });

        labor.salaryPaid = salaryPaid;
        await labor.save();
        res.status(200).send({ message: 'Payroll status updated', labor });
    } catch (error) {
        res.status(500).send({ message: 'Error updating payroll', error });
    }
};

const createShift = async (req, res) => {
    const { laborGroup, date, shiftHours, assignedLabor } = req.body;
    try {
        const shift = new Shift({ laborGroup, date, shiftHours, assignedLabor });
        await shift.save();
        res.status(201).send({ message: 'Shift created', shift });
    } catch (error) {
        res.status(500).send({ message: 'Error creating shift', error });
    }
};

const generateJoinLetter = async (req, res) => {
    const { name, position, tenure } = req.body;
    try {
        const letter = await generateAILetter(name, position, tenure, 'joining');
        res.status(200).send({ message: 'Joining letter generated', letter });
    } catch (error) {
        res.status(500).send({ message: 'Error generating letter', error });
    }
};

const generateResignationLetter = async (req, res) => {
    const { name, position } = req.body;
    try {
        const letter = await generateAILetter(name, position, null, 'resignation');
        res.status(200).send({ message: 'Resignation letter generated', letter });
    } catch (error) {
        res.status(500).send({ message: 'Error generating letter', error });
    }
};

const getLaborSummary = async (req, res) => {
    try {
        const summary = await generateLaborSummary();
        res.status(200).send({ message: 'Labor summary report', summary });
    } catch (error) {
        res.status(500).send({ message: 'Error generating summary report', error });
    }
};

module.exports = {
    addLabor,
    updateAttendance,
    managePayroll,
    createShift,
    generateJoinLetter,
    generateResignationLetter,
    getLaborSummary,
};
