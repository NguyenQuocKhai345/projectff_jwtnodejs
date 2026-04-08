const User = require("../models/user");
const appointment = require('../models/appointment');
const medicalRecord = require("../models/medicalRecord");


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

const createMedicalRecordService = async (email, appointmentId, diagnosis, prescription) => {
    try {
        const doctor = await User.findOne({ email: email });
        if (!doctor || doctor.role !== 'DOCTOR') {
            return {
                EC: 1,
                EM: "Bác sĩ không tồn tại hoặc không đúng vai trò"
            };
        }

        const appoint = await appointment.findOne({ _id: appointmentId });
        console.log(">>> check data service: ", appoint.doctorId.toString(), "-", doctor._id.toString());
        if (!appoint || appoint.doctorId.toString() !== doctor._id.toString()) {
            return {
                EC: 2,
                EM: "Lịch hẹn không tồn tại hoặc không thuộc về bác sĩ này"
            };
        }

        if (appoint.status !== 'completed') {
            return {
                EC: 3,
                EM: "Lịch hẹn chưa được hoàn thành, không thể tạo hồ sơ y tế"
            };
        }

        const result = await medicalRecord.create({
            patientId: appoint.patientId,
            doctorId: doctor._id,
            appointmentId: appoint._id,
            diagnosis: diagnosis,
            prescription: prescription
        });
        await appointment.findByIdAndUpdate(appointmentId, { medicalRecordId: result._id });

        return {
            EC: 0,
            EM: "Tạo hồ sơ y tế thành công",
            result
        };

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    updateScheduleService,
    createMedicalRecordService
}