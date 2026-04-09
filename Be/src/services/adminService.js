require('dotenv').config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserByAdminService = async (name, email, password, role = "DOCTOR") => {
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

        let result = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            isVerified: true
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        let result = await User.find({}, { password: 0 });
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}


const deleteUserService = async (id) => {
    try {
        let result = await User.findByIdAndDelete(id);
        if (!result) {
            return {
                EC: 1,
                EM: "User not found"
            }
        }
        return {
            EC: 0,
            EM: "User deleted successfully"
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}


module.exports = {
    createUserByAdminService,
    deleteUserService,
    getUserService,
}