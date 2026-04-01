const { createUserService, loginService, getUserService, getAccountService } = require('../services/userService');

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

const getUser = async (req, res) => {
    const data = await getUserService();
    return res.status(200).json(data)
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

module.exports = {
    createUser,
    handleLogin,
    getUser,
    getAccount,

}