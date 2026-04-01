const { createDoctorService } = require("../services/adminService");

const createDoctor = async (req, res) => {
    console.log(">>> check req.body: ", req.body);
    const { name, email, password, role } = req.body;
    const data = await createDoctorService(name, email, password, role);
    return res.status(200).json(data);
}

module.exports = {
    createDoctor
};