const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
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
                return "create acess token";
                //create acess token
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



module.exports = {
    createUserService,
    loginService
}