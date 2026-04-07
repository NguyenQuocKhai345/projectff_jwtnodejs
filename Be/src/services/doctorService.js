const User = require("../models/user");
const appointment = require('../models/appointment');


const updateScheduleService = async (id, note) => {
    try {
        let result = await appointment.findOne({ _id: id });
        if (!result) {
            return {
                EC: 1,
                EM: "Appointment not found"
            }
        }
        if (result.status === 'pending') {
            result.status = 'confirmed';
            result.note = note;
            await result.save();
            return {
                EC: 0,
                EM: "Xác nhận cuộc hẹn thành công"
            }
        }
        else if (result.status === 'confirmed') {
            result.status = 'completed';
            result.note = note;
            await result.save();
            return {
                EC: 0,
                EM: "Hoàn thành cuộc hẹn"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    updateScheduleService,
}