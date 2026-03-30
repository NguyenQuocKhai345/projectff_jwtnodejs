const jwt = require('jsonwebtoken');
require("dotenv").config();


const auth = (req, res, next) => {
    // Check if the request path is in the white list
    const white_lists = ["/", "/login", "/register"]
    //console.log(">>>check url:", req.originalUrl);
    if (white_lists.find(item => '/v1/api' + item === req.originalUrl)) {
        next();

    }
    else {
        if (req.headers && req.headers.authorization) {
            // Token from header
            const token = req.headers.authorization.split(" ")[1];

            //verify
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET,)
                console.log("Decoded token:", decoded);


                console.log("Token received in delay middleware:", token);
                next();

            } catch (errol) {
                return res.status(401).json({
                    message: "Token không hợp lệ hoặc đã hết hạn"
                })
            }

        } else {
            return res.status(401).json({
                message: "Chưa truyền access token ở header/token hết hạn"
            })
        }
    }

};

module.exports = auth;