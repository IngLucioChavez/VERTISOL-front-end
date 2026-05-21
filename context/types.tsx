export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
}

export interface Sale {
    id: string;
    productId: string;
    quantity: number;
    total: number;
}

export interface AppState {
    products: Product[];
    sales: Sale[];
}

export type Action =
    | { type: "ADD_PRODUCT"; payload: Product }
    | { type: "ADD_SALE"; payload: Sale };