
import axios from "axios";
import {
    GET_CITIES,
    GET_PROVINCE,
    SEARCH_RESULTS,
    USER_LOGIN,
    GET_TERMINAL,
    GET_PRODUCTOS,
    GET_ALL_COMPANIES,
    GET_ALL_USERS,
    GET_FACTURAS_MAP,
    GET_ALL_FACTURAS
} from "./action-types";

const url = process.env.BACKEND_URL;

export const searchResults = (data) => {
    return {
        type: SEARCH_RESULTS,
        payload: data,
    };
};

export const deleteUsers = (iduser) => async () => {
    try {
        const response = await axios.post(`${url}/usuarios/delete`, iduser);

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
export const getFacturasMap = () => {
    let indice = 0;
    let beneficios = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${url}/facturas`);
            const facturas = data.data;

            while (indice < 13) {
                facturas.map((factura) => {
                    if (factura.createdAt[5] == indice && factura.createdAt[6] == "-") {
                        const resultado = beneficios[indice - 1] + 1;
                        beneficios[indice - 1] = resultado
                    }
                    else if (indice > 9 && Number(factura.createdAt[5]) === 1) {
                        if (Number(factura.createdAt[6]) === 0 || Number(factura.createdAt[6]) === 1 || Number(factura.createdAt[6]) === 2) {
                            let number = factura.createdAt[5] + factura.createdAt[6];
                            if (number == indice) {
                                const resultado = beneficios[indice - 1] + 1;
                                beneficios[indice - 1] = resultado
                            }
                        }
                    }
                })
                indice++;
            }

            dispatch({
                type: GET_FACTURAS_MAP,
                payload: beneficios,
            });
        } catch (error) {
            console.error(error);
        }
    };
};
export const getAllFacturas = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${url}/facturas`);
            dispatch({
                type: GET_ALL_FACTURAS,
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
    try {
        const response = await axios.post(`${url}/productos`, formData);
        console.log('Registro exitoso:', response.data);
    } catch (error) {
        console.error('Error en el registro:', error.message);
    }
};


