import { Product } from "@/context/types";

export interface ResponseObtenerProductos {
    status: number;
    response: Product[];
}
