import axios from "axios";
import {
    GET_REVIEWS,
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
    GET_SEARCH_DATA,
    GET_SEARCH_CATEGORY,
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
            const { data } = await axios.get(`${url}/auth/perfil`);
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

export const getAllReviews = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${url}/reviews`);
            dispatch({
                type: GET_REVIEWS,
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
            const { data } = await axios.get(`${url}/productos`);

            dispatch({
                type: GET_PRODUCTOS,
                payload: data.data,
            });
        } catch (error) {
            console.error(error);
        }
    };
};
export const createProcut = (formData) => async () => {
    console.log("REDUX", formData);
    try {
        const response = await axios.post(`${url}/productos`, formData);
        console.log("Registro exitoso:", response.data);
    } catch (error) {
        console.error("Error en el registro:", error.message);
    }
};

export const searchData = (data) => {
    return {
        type: GET_SEARCH_DATA,
        payload: data,
    };
};
export const searchCategory = (data) => {
    return {
        type: GET_SEARCH_CATEGORY,
        payload: data,
    };
};
