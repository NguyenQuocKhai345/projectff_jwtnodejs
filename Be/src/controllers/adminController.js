const { createDoctorService, deleteUserService, getUserService, } = require("../services/adminService");

const createDoctor = async (req, res) => {
    console.log(">>> check req.body: ", req.body);
    const { name, email, password, role } = req.body;
    const data = await createDoctorService(name, email, password, role);
    return res.status(200).json(data);
}

const getUser = async (req, res) => {
    const data = await getUserService();
    return res.status(200).json(data)
}

const deleteUser = async (req, res) => {
    console.log(">>> check req.params: ", req.params);
    const id = req.params.id;
    const data = await deleteUserService(id);
    return res.status(200).json(data);
}

module.exports = {
    createDoctor,
    deleteUser,
    getUser
};