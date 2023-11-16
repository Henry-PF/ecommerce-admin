import axios from 'axios';
import { GET_CITIES, GET_PROVINCE, SEARCH_RESULTS, USER_LOGIN, GET_TERMINAL, GET_ALL_RUTES, DELETE_RUTE, GET_PRODUCTOS, GET_ALL_COMPANIES, GET_ALL_USERS, CREATED_ROUTE,GET_ALL_PRODUCTS, GET_ALL_CATEGORIES} from './action-types'

export const searchResults = (data) => {
    return {
        type: SEARCH_RESULTS,
        payload: data
    }
}
export const createRoute = (formData) => async (dispatch) => {
    try {
        const { data } = await axios.post('rutas', formData);
        dispatch({
            type: CREATED_ROUTE,
            payload: data
        })
    } catch (error) {
        console.error(error);
    }
};

export const deleteRute = (idRutes) => async () => {
    try {
        const response = await axios.post('rutas/delete', idRutes);
        console.log(response);
    } catch (error) {
        console.error('Error en el borrado:', error);
    }
};
export const deleteUsers = (iduser) => async () => {
    try {
        const response = await axios.post('usuarios/delete', iduser);
        console.log(response);
    } catch (error) {
        console.error('Error en el borrado:', error);
    }
};
export const getAllRutes = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('rutas/getAll');
            dispatch({
                type: GET_ALL_RUTES,
                payload: data.data
            })
        } catch (error) {
            console.error(error);
        }
    }
};
export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('usuarios/getAll');
            console.log(data);
            dispatch({
                type: GET_ALL_USERS,
                payload: data.data
            })
        } catch (error) {
            console.error(error);
        }
    }
};

export const userLogin = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('auth/perfil')
            console.log('user', data.user);
            dispatch({
                type: USER_LOGIN,
                payload: data
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export const getCities = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('ciudades/get_cities');
            dispatch({
                type: GET_CITIES,
                payload: data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}
export const getTerminales = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('terminal/get');
            dispatch({
                type: GET_TERMINAL,
                payload: data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export const getProvince = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('provincias/get_province');
            dispatch({
                type: GET_PROVINCE,
                payload: data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export const getAllCompanies = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('empresas/get');
            dispatch({
                type: GET_ALL_COMPANIES,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3002/api/productos')
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
        const response = await axios.post('http://localhost:3002/api/productos', formData);
        console.log('Registro exitoso:', response.data);
    } catch (error) {
        console.error('Error en el registro:', error.message);
    }
};

export const getAllCategories = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3002/api/categorias');
            dispatch({
                type: GET_ALL_CATEGORIES,
                payload: data.data,
            })
        } catch (error) {
            console.error(error);
        }
    }
}
