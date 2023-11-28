import {
    FILTER_INACTIVE_USERS,
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

const initialState = {
    data: [],
    products: [],
    categories: [],
    users: [],
    trips: [],
    inactiveUsers: [],
    reviews: [],
    companies: [],
    userGoogle: {},
    terminales: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_RESULTS:
            const { origin, destination, departureDate } = action.payload;
            const filter = state.trips.filter((trip) => {
                return (
                    trip.origin.toLowerCase() === origin.toLowerCase() &&
                    trip.destination.toLowerCase() ===
                        destination.toLowerCase() &&
                    trip.departureDate.toLowerCase() ===
                        departureDate.toLowerCase()
                );
            });

            return {
                ...state,
                data: filter,
            };
        case USER_LOGIN:
            return {
                ...state,
                userGoogle: action.payload,
            };
        case GET_ALL_USERS:
            return {
                ...state,
                data: action.payload,
                users: action.payload,
                inactiveUsers: action.payload.filter(
                    (user) => user.statud.id !== 1
                ),
            };
        case GET_TERMINAL:
            return {
                ...state,
                terminales: action.payload,
            };
        case GET_ALL_RUTES:
            return {
                ...state,
                trips: action.payload,
            };
        case GET_REVIEWS:
            return {
                ...state,
                reviews: action.payload,
            };

        case GET_ALL_COMPANIES:
            return {
                ...state,
                companies: action.payload,
                categories: action.payload,
            };
        case GET_PRODUCTOS:
            return {
                ...state,
                products: action.payload,
            };
        case CREATED_ROUTE:
            return {
                ...state,
                route: action.payload,
            };
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        case GET_SEARCH_DATA:
            return {
                ...state,
                data: state.users.filter((user) =>
                    user.usuario
                        .toLowerCase()
                        .includes(action.payload.toLowerCase())
                ),
            };
        case GET_SEARCH_CATEGORY:
            return {
                ...state,
                categories: state.companies.filter((categoria) =>
                    categoria.nombre
                        .toLowerCase()
                        .includes(action.payload.toLowerCase())
                ),
            };
        default:
            return state;
    }
};

export default rootReducer;
