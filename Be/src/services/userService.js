require('dotenv').config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appointment = require('../models/appointment');
const saltRounds = 10;

const createUserService = async (name, email, password, role) => {
    try {
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

        let result = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (email, password) => {
    try {
        // fetch user by email
        const user = await User.findOne({ email: email });
        if (user) {
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

const createAppointmentService = async (patientId, doctorId, startTime, endTime) => {
    try {
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'DOCTOR') {
            return {
                EC: 1,
                EM: "Bác sĩ không tồn tại hoặc không đúng vai trò"
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

        const existed = await appointment.findOne({
            doctorId,
            status: { $in: ['pending', 'confirmed'] },
            startTime: { $lt: end },
            endTime: { $gt: start }
        });

        if (existed) {
            return {
                EC: 3,
                EM: "Bác sĩ đã có lịch trong khoảng thời gian này"
            };
        }

        const result = await appointment.create({
            patientId: patientId,
            doctorId: doctorId,
            startTime: start,
            endTime: end
        });
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


module.exports = {
    createUserService,
    loginService,
    getDoctorsService,
    getAccountService,
    createAppointmentService

}