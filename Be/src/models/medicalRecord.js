const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointment',
        unique: true
    },
    diagnosis: { type: String, required: true },
    prescription: { type: String }, // Đơn thuốc
}, { timestamps: true });

module.exports = mongoose.model('medicalRecord', medicalRecordSchema);