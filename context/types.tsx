export interface User {
    id: string;
    nombre: string;
    email: string;
    token: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Product {
    id_producto: number;
    nombre: string;
    precio: number;
    image: string;
    descripcion: string;
    estatus?: number;
    created_at?: null;
    updated_at?: null;
}

export interface Sale {
    id: string;
    productId: string;
    quantity: number;
    total: number;
}

export interface AppState {
    user: User | null;
    isAuthenticated: boolean;

    products: Product[];
    sales: Sale[];
}

export type Action =
    | {
        type: "LOGIN";
        payload: User;
    }
    | {
        type: "LOGOUT";
    }
    | {
        type: "ADD_PRODUCT";
        payload: Product;
    }
    | {
        type: "ADD_PRODUCTS";
        payload: Product[];
    }
    | {
        type: "ADD_SALE";
        payload: Sale;
    };