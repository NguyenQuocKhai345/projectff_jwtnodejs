require('dotenv').config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createDoctorService = async (name, email, password, role = "DOCTOR") => {
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

module.exports = {
    createDoctorService
}