"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Product } from "@/context/types";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { BACKEND_ROUTES } from "@/API-EndPoints/back";
import { ResponseObtenerProductos } from "@/app/interfaces/responseObtenerProductos";
import { toast } from "sonner";

export default function ProductsPage() {
    const { state, dispatch } = useApp();

    useEffect(() => {

        const response: Promise<ResponseObtenerProductos | void> = api.get(BACKEND_ROUTES.GETPRODUCTOS)
            .then((response) => {
                dispatch({
                    type: "ADD_PRODUCTS",
                    payload: response.data.response
                });
            }).catch((erro) => {
                toast.error(
                    "Error al obtener productos", {
                    position: "top-center"
                });
            });

    }, [])

    return (
        <div className="overflow-auto">
            <h2 className="text-3xl font-bold mb-6 text-red-600">
                Productos
            </h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Descripción</TableHead>
                        <TableHead>Precio</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {state.products.map((product: Product) => (
                        <TableRow key={product.id_producto}>
                            <TableCell>
                                {product.id_producto}
                            </TableCell>
                            <TableCell>
                                <Link
                                    className="text-red-600 font-semibold"
                                    href={`/dashboard/products/${product.id_producto}`}
                                >
                                    {product.nombre}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {product.descripcion}
                            </TableCell>
                            <TableCell>
                                ${product.precio}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}