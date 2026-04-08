const User = require('../models/user');
const { updateScheduleService, createMedicalRecordService } = require('../services/doctorService');

const updateSchedule = async (req, res) => {
    console.log(">>> check req ", req.params, req.body);
    const id = req.params.id;
    const { note } = req.body;
    const data = await updateScheduleService(id, note);
    return res.status(200).json(data);
}

const createMedicalRecord = async (req, res) => {
    const { diagnosis, prescription } = req.body;
    const appointmentId = req.params.id;
    const email = req.user.email;
    console.log(">>> check req.user: ", req.user.email);
    console.log(">>> check req.params: ", req.params);
    console.log(">>> check data: ", diagnosis, prescription, appointmentId, email);
    const data = await createMedicalRecordService(email, appointmentId, diagnosis, prescription);
    return res.status(200).json(data);
}

module.exports = {
    updateSchedule,
    createMedicalRecord
}