require('dotenv').config();
const User = require("../models/user");
const { sendVerificationEmail } = require('../util/mailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appointment = require('../models/appointment');
const medicalRecord = require('../models/medicalRecord');
const saltRounds = 10;



const createUserService = async (name, email, password, role) => {
    try {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                EC: 1,
                EM: "Định dạng email không hợp lệ (ví dụ: abc@gmail.com)"
            };
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return {
                EC: 1,
                EM: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
            };
        }
        //check email exist
        const user = await User.findOne({ email });
        if (user) {
            return {
                EC: 1,
                EM: "Email đã tồn tại, vui lòng chọn email khác"
            }
        }

        // Hash the password before saving it
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        let result = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            isVerified: false
        })
        sendVerificationEmail(email, verificationToken);
        return {
            EC: 0,
            EM: "Vui lòng kiểm tra email để kích hoạt tài khoản",
            result
        };

    } catch (error) {
        console.log(error);
        return null;
    }
}

const verifyEmailService = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const result = await User.findOneAndUpdate({ email: decoded.email }, { isVerified: true });
        if (!result) {
            return {
                EC: 2,
                EM: "Người dùng không tồn tại"
            }
        }
        return {
            EC: 0,
            EM: "Xác thực thành công! Bạn có thể đăng nhập."
        }
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: "Link xác thực không hợp lệ hoặc đã hết hạn."
        }
    }
}

const loginService = async (email, password) => {
    try {
        // fetch user by email
        const user = await User.findOne({ email: email });
        if (user) {
            if (!user.isVerified) {
                return { EC: 3, EM: "Vui lòng xác thực email trước khi đăng nhập" };
            }
            // compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const payload = {
                    email: user.email,
                    name: user.name,
                    role: user.role
                }

                const access_token = jwt.sign(payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE
                    }
                )
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name,
                        role: user.role
                    }
                }
            } else {
                return {
                    EC: 2,
                    EM: "Email/Password không hợp lệ"
                }
            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password không hợp lệ"
            }
        }


    } catch (error) {
        console.log(error);
        return null;
    }
}


const getDoctorsService = async () => {
    try {
        let result = await User.find({ role: 'DOCTOR' }, { password: 0 });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAccountService = async (email) => {
    try {
        let user = await User.findOne({ email }, { password: 0 });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createAppointmentService = async (email, doctorId, startTime, endTime) => {
    try {
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'DOCTOR') {
            return {
                EC: 1,
                EM: "Bác sĩ không tồn tại hoặc không đúng vai trò"
            };
        }
        const patient = await User.findOne({ email: email });
        if (!patient || patient.role !== 'PATIENT') {
            return {
                EC: 2,
                EM: "Bệnh nhân không tồn tại hoặc không đúng vai trò"
            };
        }


        const start = new Date(startTime);
        const end = new Date(endTime);
        const now = new Date();
        console.log(">>> check date - Start: ", start);
        console.log(">>> check date - End: ", end);
        console.log(">>> check date - Now: ", now);

        // Cho phép lỗi nhỏ do timezone (5 phút buffer)
        const BUFFER_TIME = 5 * 60 * 1000;

        if (start < new Date(now.getTime() - BUFFER_TIME) || end <= start) {
            return {
                EC: 2,
                EM: "Thời gian không hợp lệ "
            };
        }

        if ((end.getTime() - start.getTime()) > 2 * 60 * 60 * 1000) {
            return {
                EC: 4,
                EM: "Thời gian đặt lịch tối đa là 2 giờ"
            };
        }

        const doctorExisted = await appointment.findOne({
            doctorId,
            status: { $in: ['pending', 'confirmed'] },
            startTime: { $lt: end },
            endTime: { $gt: start }
        });
        const patientExisted = await appointment.findOne({
            patientId: patient._id,
            status: { $in: ['pending', 'confirmed'] },
            startTime: { $lt: end },
            endTime: { $gt: start }
        });

        if (doctorExisted || patientExisted) {
            return {
                EC: 3,
                EM: "Bác sĩ hoặc bạn đã có lịch trong khoảng thời gian này"
            };
        }
        console.log(">>> check appointment created: ", patient, "-", patient._id);

        const result = await appointment.create({
            patientId: patient._id,
            doctorId: doctorId,
            startTime: start,
            endTime: end
        });
        console.log(">>> check appointment created: ", result);
        return {
            EC: 0,
            EM: "Đặt lịch thành công",
            result
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getScheduleService = async (user) => {
    try {
        if (!user || !user.email) {
            return {
                EC: 1,
                EM: "Người dùng không hợp lệ"
            };
        }
        const result = await User.findOne({ email: user.email });
        if (!result) {
            return {
                EC: 2,
                EM: "Người dùng không tồn tại"
            };
        }

        if (user.role === 'DOCTOR') {
            return await appointment.find({ doctorId: result._id }).populate('patientId', 'name').populate('doctorId', 'name');

        } else if (user.role === 'PATIENT') {
            return await appointment.find({ patientId: result._id }).populate('doctorId', 'name').populate('patientId', 'name');

        } else {
            return await appointment.find({}).populate('patientId', 'name').populate('doctorId', 'name');
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const cancelScheduleService = async (id, note) => {
    try {
        let result = await appointment.findOne({ _id: id });
        if (!result) {
            return {
                EC: 1,
                EM: "Appointment not found"
            }
        }
        if (result.status != 'pending') {
            return {
                EC: 2,
                EM: "Không thể hủy lịch này"
            }
        }
        result.status = 'cancelled';
        result.note = note;
        await result.save();
        return {
            EC: 0,
            EM: "Appointment cancelled successfully"
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getMedicalReportService = async (id) => {
    try {
        const result = await appointment.findById(id);
        if (!result) {
            return {
                EC: 1,
                EM: "Lịch khám không tồn tại"
            };
        }
        if (result.status !== 'completed' || !result.medicalRecordId) {
            return {
                EC: 2,
                EM: "Chỉ có thể xem hồ sơ y tế của lịch khám đã hoàn thành hoặc chưa có hồ sơ y tế"
            };
        }
        const record = await medicalRecord.findById(result.medicalRecordId).populate('patientId', 'name').populate('doctorId', 'name');
        if (!record) {
            return {
                EC: 3,
                EM: "Hồ sơ y tế không tồn tại"
            };
        }
        return {
            EC: 0,
            EM: "Lấy hồ sơ y tế thành công",
            record
        };


    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService,
    loginService,
    getDoctorsService,
    getAccountService,
    createAppointmentService,
    getScheduleService,
    cancelScheduleService,
    getMedicalReportService,
    verifyEmailService

}