const { createUserService, loginService, getDoctorsService, getAccountService, createAppointmentService } = require('../services/userService');
const User = require('../models/user');

const createUser = async (req, res) => {
    console.log(">>> check req.body: ", req.body)
    const { name, email, password, role } = req.body;
    const data = await createUserService(name, email, password, role);
    return res.status(200).json(data)
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data)
}


const getDoctors = async (req, res) => {
    const data = await getDoctorsService();
    return res.status(200).json(data);
}

const getAccount = async (req, res) => {
    try {
        const data = await getAccountService(req.user.email);
        if (!data) {
            return res.status(404).json({ message: "Không tìm thấy tài khoản" });
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const createAppointment = async (req, res) => {
    try {
        console.log(">>> check req.user: ", req.user);
        console.log(">>> check req.body: ", req.body);

        if (!req.user || !req.user.email) {
            return res.status(401).json({
                EC: 1,
                EM: "Token không hợp lệ"
            });
        }

        const { doctorId, startTime, endTime } = req.body;

        const patient = await User.findOne({ email: req.user.email });
        console.log(">>> patient found: ", patient);

        if (!patient) {
            return res.status(404).json({
                EC: 1,
                EM: "Không tìm thấy bệnh nhân"
            });
        }

        const data = await createAppointmentService(patient._id, doctorId, startTime, endTime);
        return res.status(200).json(data)
    } catch (error) {
        console.error(">>> Create appointment error: ", error);
        return res.status(500).json({
            EC: 1,
            EM: "Lỗi server khi đặt lịch"
        });
    }
}


module.exports = {
    createUser,
    handleLogin,
    getDoctors,
    getAccount,
    createAppointment

}