const { createUserService, loginService, getDoctorsService, getAccountService, createAppointmentService, getScheduleService, cancelScheduleService, getMedicalReportService } = require('../services/userService');
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
    const { doctorId, startTime, endTime } = req.body;
    const email = req.user.email;
    const data = await createAppointmentService(email, doctorId, startTime, endTime);
    return res.status(200).json(data);
}


const getSchedule = async (req, res) => {
    console.log(">>> Qua controller, check req.user in getSchedule: ", req.user);
    const data = await getScheduleService(req.user);
    return res.status(200).json(data)
}

const cancelSchedule = async (req, res) => {
    console.log(">>> check req ", req.params, req.body);
    const id = req.params.id;
    const { note } = req.body;
    const data = await cancelScheduleService(id, note);
    return res.status(200).json(data);
}

const getMedicalReport = async (req, res) => {
    console.log(">>> check parram:", req.params);
    const id = req.params.id;
    const data = await getMedicalReportService(id);
    return res.status(200).json(data)
}


module.exports = {
    createUser,
    handleLogin,
    getDoctors,
    getAccount,
    createAppointment,
    getSchedule,
    cancelSchedule,
    getMedicalReport

}