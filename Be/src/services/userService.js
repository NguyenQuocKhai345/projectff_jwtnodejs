require('dotenv').config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
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
            password: hashedPassword
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
                    name: user.name
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
                        name: user.name
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

const getUserService = async () => {
    try {
        let result = await User.find({}, { password: 0 });
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createUserService,
    loginService,
    getUserService
}