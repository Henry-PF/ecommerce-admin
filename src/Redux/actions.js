import axios from "axios";
import {
    GET_CITIES,
    GET_PROVINCE,
    SEARCH_RESULTS,
    USER_LOGIN,
    GET_TERMINAL,
    GET_ALL_RUTES,
    DELETE_RUTE,
    GET_BUSES,
    GET_ALL_COMPANIES,
    GET_ALL_USERS,
    CREATED_ROUTE,
} from "./action-types";

const url = "http://localhost:3002/api";

export const searchResults = (data) => {
    return {
        type: SEARCH_RESULTS,
        payload: data,
    };
};
export const createRoute = (formData) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            "https://api-54nh.onrender.com/rutas",
            formData
        );
        dispatch({
            type: CREATED_ROUTE,
            payload: data,
        });
    } catch (error) {
        console.error(error);
    }
};

export const deleteRute = (idRutes) => async () => {
    try {
        const response = await axios.post(
            "https://api-54nh.onrender.com/rutas/delete",
            idRutes
        );
        console.log(response);
    } catch (error) {
        console.error("Error en el borrado:", error);
    }
};
export const getAllRutes = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                "https://api-54nh.onrender.com/rutas/getAll"
            );
            dispatch({
                type: GET_ALL_RUTES,
                payload: data.data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const deleteUsers = (iduser) => async () => {
    try {
        const response = await axios.post(`${url}/usuarios/delete`, iduser);
        console.log(response);
    } catch (error) {
        console.error("Error en el borrado:", error);
    }
};

export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${url}/usuarios`);
            dispatch({
                type: GET_ALL_USERS,
                payload: data.data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const userLogin = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                "https://api-54nh.onrender.com/auth/perfil"
            );
            console.log("user", data.user);
            dispatch({
                type: USER_LOGIN,
                payload: data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getCities = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                "https://api-54nh.onrender.com/ciudades/get_cities"
            );
            dispatch({
                type: GET_CITIES,
                payload: data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};
export const getTerminales = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                "https://api-54nh.onrender.com/terminal/get"
            );
            dispatch({
                type: GET_TERMINAL,
                payload: data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getProvince = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                "https://api-54nh.onrender.com/provincias/get_province"
            );
            dispatch({
                type: GET_PROVINCE,
                payload: data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};

export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${url}/categorias`);
            dispatch({
                type: GET_ALL_COMPANIES,
                payload: data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const getBuses = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                "https://api-54nh.onrender.com/buses/get_buses"
            );
            dispatch({
                type: GET_BUSES,
                payload: data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};
