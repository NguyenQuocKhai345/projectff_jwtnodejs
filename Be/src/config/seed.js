// require('dotenv').config();
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const saltRounds = 10;
// const User = require('../models/user');

// const seedAdmin = async () => {
//     try {
//         const adminEmail = await User.findOne({ email: process.env.ADMIN_EMAIL });
//         if (!adminEmail) {
//             const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, saltRounds);
//             await User.create({
//                 name: process.env.ADMIN_NAME,
//                 email: process.env.ADMIN_EMAIL,
//                 password: hashedPassword,
//                 role: 'ADMIN',
//                 isVerified: true
//             })
//             console.log("[SEED] Tạo Admin thành công");
//         }
//         else {
//             console.log("[SEED] Đã có Admin tồn tại, không cần tạo mới");
//         }
//     } catch (error) {
//         console.error('Error occurred while seeding admin:', error);
//     }
// }

// module.exports = seedAdmin;

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Appointment = require('../models/appointment');
const MedicalRecord = require('../models/medicalRecord');

const saltRounds = 10;

const seedDatabase = async () => {
    try {
        // 1. Tạo Admin (Giữ nguyên logic của bạn)
        const adminExist = await User.findOne({ role: 'ADMIN' });
        if (!adminExist) {
            const hashedAdminPass = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', saltRounds);
            await User.create({
                name: process.env.ADMIN_NAME || 'Admin System',
                email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
                password: hashedAdminPass,
                role: 'ADMIN',
                isVerified: true
            });
            console.log("[SEED] Tạo Admin thành công");
        }

        // 2. Tạo 5 Doctors và 5 Patients
        const userCount = await User.countDocuments();
        if (userCount <= 1) { // Chỉ chạy nếu chưa có data ngoài Admin
            const password = await bcrypt.hash('123456', saltRounds);

            const doctors = Array.from({ length: 5 }).map((_, i) => ({
                name: `Bác sĩ ${i + 1}`,
                email: `doctor${i + 1}@gmail.com`,
                password: password,
                role: 'DOCTOR',
                isVerified: true
            }));

            const patients = Array.from({ length: 5 }).map((_, i) => ({
                name: `Bệnh nhân ${i + 1}`,
                email: `patient${i + 1}@gmail.com`,
                password: password,
                role: 'PATIENT',
                isVerified: true
            }));

            const createdUsers = await User.insertMany([...doctors, ...patients]);
            console.log("[SEED] Đã tạo 5 Bác sĩ và 5 Bệnh nhân");

            const doctorIds = createdUsers.filter(u => u.role === 'DOCTOR').map(u => u._id);
            const patientIds = createdUsers.filter(u => u.role === 'PATIENT').map(u => u._id);

            // 3. Tạo 10 Appointments với đầy đủ trạng thái
            const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
            const appointmentsData = Array.from({ length: 10 }).map((_, i) => {
                const startTime = new Date();
                startTime.setDate(startTime.getDate() + i); // Mỗi lịch cách nhau 1 ngày
                const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Kéo dài 1 tiếng

                return {
                    patientId: patientIds[i % 5],
                    doctorId: doctorIds[i % 5],
                    startTime,
                    endTime,
                    status: statuses[i % 4],
                    note: i % 4 === 3 ? "Bệnh nhân bận việc đột xuất" : ""
                };
            });

            const createdAppointments = await Appointment.insertMany(appointmentsData);
            console.log("[SEED] Đã tạo 10 Lịch hẹn mẫu");

            // 4. Tạo 3 Medical Records cho các lịch đã 'completed'
            const completedApps = createdAppointments.filter(a => a.status === 'completed').slice(0, 3);

            const recordsData = completedApps.map((app, i) => ({
                patientId: app.patientId,
                doctorId: app.doctorId,
                appointmentId: app._id,
                diagnosis: `Chẩn đoán bệnh mẫu lần ${i + 1}`,
                treatment: "Nghỉ ngơi và uống nhiều nước",
                prescription: "Paracetamol 500mg x 10 viên"
            }));

            const createdRecords = await MedicalRecord.insertMany(recordsData);

            // Cập nhật ngược lại ID hồ sơ vào Appointment (để khớp logic getMedicalReport của bạn)
            for (let i = 0; i < createdRecords.length; i++) {
                await Appointment.findByIdAndUpdate(completedApps[i]._id, {
                    medicalRecordId: createdRecords[i]._id
                });
            }
            console.log("[SEED] Đã tạo 3 Hồ sơ y tế");
        } else {
            console.log("[SEED] Dữ liệu đã tồn tại, bỏ qua bước tạo mẫu");
        }

    } catch (error) {
        console.error('[SEED] Lỗi khi tạo dữ liệu mẫu:', error);
    }
};

module.exports = seedDatabase;