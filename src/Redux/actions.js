
import axios from "axios";
import {
    GET_CITIES,
    GET_PROVINCE,
    SEARCH_RESULTS,
    USER_LOGIN,
    GET_TERMINAL,
    GET_ALL_RUTES,
    DELETE_RUTE,
    GET_ALL_PRODUCTS,
    GET_PRODUCTOS,
    GET_ALL_CATEGORIES,
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
            console.log(data);
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
            const { data } = await axios.get(`${url}/auth/perfil`)
            console.log('user', data.user);

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

            const { data } = await axios.get(`${url}/ciudades/get_cities`);
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
            const { data } = await axios.get(`${url}/terminal/get`);
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
            const { data } = await axios.get(`${url}/provincias/get_province`);
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

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${url}/productos`)

            dispatch({
                type: GET_PRODUCTOS,
                payload: data.data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}
export const createProcut = (formData) => async () => {
    console.log('REDUX', formData);
    try {
        const response = await axios.post(`${url}/productos`, formData);
        console.log('Registro exitoso:', response.data);
    } catch (error) {
        console.error('Error en el registro:', error.message);
    }
};


