
const delay = (req, res, next) => {
    setTimeout(() => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            console.log("Token received in delay middleware:", token);
        }
        next();
    }, 3000); // Delay for 3 seconds
};

module.exports = delay;