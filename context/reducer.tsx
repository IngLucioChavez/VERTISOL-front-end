import { Action, AppState } from "./types";

export const initialState: AppState = {
    products: [
        {
            id: "1",
            name: "iPhone 15",
            price: 24000,
            image:
                "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
            description: "Smartphone premium Apple",
        },
        {
            id: "2",
            name: "MacBook Pro",
            price: 52000,
            image:
                "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
            description: "Laptop profesional",
        },
    ],
    sales: [],
};

export const reducer = (
    state: AppState,
    action: Action
): AppState => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {
                ...state,
                products: [...state.products, action.payload],
            };

        case "ADD_SALE":
            return {
                ...state,
                sales: [...state.sales, action.payload],
            };

        default:
            return state;
    }
};