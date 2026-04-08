import axios from './axios.customize';

const createUserApi = (name, email, password) => {
    const URL_API = "/v1/api/register";
    const data = {
        name,
        email,
        password
    };
    return axios.post(URL_API, data);
};

const loginApi = (email, password) => {
    const URL_API = "/v1/api/login";
    const data = {
        email,
        password
    };
    return axios.post(URL_API, data);
};


//Admin API

const getUserApi = () => {
    const URL_API = "/v1/api/users";
    return axios.get(URL_API);
};

const getDoctorsApi = () => {
    const URL_API = "/v1/api/doctors";
    return axios.get(URL_API);
};

const createUserByAdminApi = (name, email, password, role) => {
    const URL_API = "/v1/api/createUserByAdmin";
    const data = {
        name,
        email,
        password,
        role
    };
    return axios.post(URL_API, data);
};

const deleteUser = (id) => {
    const URL_API = `/v1/api/users/${id}`;
    return axios.delete(URL_API);
};


//Patient API
const createAppointmentApi = (doctorId, startTime, endTime) => {
    const URL_API = "/v1/api/createAppointment";
    const data = {
        doctorId,
        startTime,
        endTime
    };
    return axios.post(URL_API, data);
};

const getScheduleApi = () => {
    const URL_API = "/v1/api/schedule";
    return axios.get(URL_API);
};

const cancelScheduleApi = (id, note) => {
    return axios.patch(`/v1/api/schedule/${id}/cancel`, { note });
};

//Doctor API
const updateScheduleApi = (id, note) => {
    return axios.patch(`/v1/api/schedule/${id}/update`, { note });
};

const createMedicalRecordApi = (id, diagnosis, prescription) => {
    const URL_API = `/v1/api/medicalRecord/${id}`;
    const data = {
        diagnosis,
        prescription
    }
    return axios.post(URL_API, data);
}

export {
    createUserApi,
    loginApi,
    getUserApi,
    getDoctorsApi,
    createUserByAdminApi,
    deleteUser,
    createAppointmentApi,
    getScheduleApi,
    cancelScheduleApi,
    updateScheduleApi,
    createMedicalRecordApi
};