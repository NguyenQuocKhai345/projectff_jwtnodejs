const express = require('express');
const { createUser, handleLogin, getDoctors, getAccount, createAppointment, getSchedule, cancelSchedule, getMedicalReport } = require('../controllers/userController');
const delay = require('../middleware/delay');
const { auth, checkRole } = require('../middleware/auth');
const { createUserByAdmin, deleteUser, getUser } = require('../controllers/adminController.js');
const { updateSchedule, createMedicalRecord } = require('../controllers/doctorController.js');

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

//patient route
routerAPI.post("/register", createUser)
routerAPI.post("/login", handleLogin)
routerAPI.post("/createAppointment", checkRole(["PATIENT"]), createAppointment)
routerAPI.get("/schedule", getSchedule);
routerAPI.patch("/schedule/:id/cancel", checkRole(["PATIENT", "DOCTOR"]), cancelSchedule);
routerAPI.get("/getMedicalRecord/:id", getMedicalReport);

routerAPI.get("/account", getAccount);
routerAPI.get("/doctors", getDoctors);

//admin route
routerAPI.get("/users", checkRole(["ADMIN"]), getUser)
routerAPI.post("/createUserByAdmin", checkRole(["ADMIN"]), createUserByAdmin)
routerAPI.delete("/users/:id", checkRole(["ADMIN"]), deleteUser)

//doctor route
routerAPI.patch("/schedule/:id/update", checkRole(["DOCTOR"]), updateSchedule);
//routerAPI.get("/medicalRecord", checkRole(["DOCTOR"]), getMedicalReport);
routerAPI.post("/medicalRecord/:id", checkRole(["DOCTOR"]), createMedicalRecord);

module.exports = routerAPI; //export default