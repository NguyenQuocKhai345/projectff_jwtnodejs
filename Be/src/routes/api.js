const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const delay = require('../middleware/delay');
const { auth, checkRole } = require('../middleware/auth');
const { createDoctor, deleteUser, } = require('../controllers/adminController.js');

const routerAPI = express.Router();

// const { getUsersAPI, postCreateUserAPI,
//     putUpdateUserAPI, deleteUserAPI

// } = require('../controllers/apiController')


// routerAPI.get('/users', getUsersAPI);
// routerAPI.post('/users', postCreateUserAPI);
// routerAPI.put('/users', putUpdateUserAPI);
// routerAPI.delete('/users', deleteUserAPI);

routerAPI.all("*", auth) // Apply auth middleware to all routes in this router


routerAPI.get('/', (req, res) => {
    return res.status(200).json({
        message: "Hello World from API"
    })
})

routerAPI.post("/register", createUser)
routerAPI.post("/login", handleLogin)

routerAPI.get("/account", getAccount);

//admin route
routerAPI.get("/users", checkRole(["ADMIN"]), getUser)
routerAPI.post("/create-doctor", checkRole(["ADMIN"]), createDoctor)
routerAPI.delete("/users/:id", checkRole(["ADMIN"]), deleteUser)

module.exports = routerAPI; //export default