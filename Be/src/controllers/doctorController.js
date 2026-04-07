const User = require('../models/user');
const { updateScheduleService } = require('../services/doctorService');

const updateSchedule = async (req, res) => {
    console.log(">>> check req ", req.params, req.body);
    const id = req.params.id;
    const { note } = req.body;
    const data = await updateScheduleService(id, note);
    return res.status(200).json(data);
}

module.exports = {
    updateSchedule,
}