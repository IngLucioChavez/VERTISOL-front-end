import { Action, AppState } from "./types";

export const initialState: AppState = {
    user: null,
    isAuthenticated: false,

    products: [],

    sales: [],
};

export const reducer = (
    state: AppState,
    action: Action
): AppState => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };

        case "LOGOUT":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };

        case "ADD_PRODUCT":
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload,
                ],
            };

        case "ADD_PRODUCTS":
            return {
                ...state,
                products: action.payload
            };

        case "ADD_SALE":
            return {
                ...state,
                sales: [
                    ...state.sales,
                    action.payload,
                ],
            };

        default:
            return state;
    }
};