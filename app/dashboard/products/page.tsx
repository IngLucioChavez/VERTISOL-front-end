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

import { useEffect, useMemo, useState } from "react";

import { api } from "@/lib/axios";

import { BACKEND_ROUTES } from "@/API-EndPoints/back";

import { ResponseObtenerProductos } from "@/app/interfaces/responseObtenerProductos";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
    ChevronLeft,
    ChevronRight,
    Search
} from "lucide-react";

export default function ProductsPage() {

    const { state, dispatch } = useApp();

    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const itemsPerPage = 5;

    useEffect(() => {

        api.get(
            BACKEND_ROUTES.GETPRODUCTOS
        )

            .then((response) => {

                dispatch({
                    type: "ADD_PRODUCTS",
                    payload:
                        response.data.response
                });

            })

            .catch(() => {

                toast.error(
                    "Error al obtener productos",
                    {
                        position: "top-center"
                    }
                );

            });

    }, []);

    // filtro búsqueda
    const filteredProducts =
        useMemo(() => {

            return state.products.filter(
                (product: Product) =>

                    product.nombre
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

            );

        }, [
            state.products,
            search
        ]);

    // paginado
    const totalPages =
        Math.ceil(
            filteredProducts.length /
            itemsPerPage
        );

    const paginatedProducts =
        filteredProducts.slice(
            (currentPage - 1) *
            itemsPerPage,

            currentPage *
            itemsPerPage
        );

    return (

        <div className="w-full">

            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>

                    <h2 className="text-3xl font-bold text-red-600">
                        Productos
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Administración de productos fintech
                    </p>

                </div>

                {/* SEARCH */}

                <div className="relative w-full md:w-[320px]">

                    <Search
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                    />

                    <Input
                        placeholder="Buscar producto..."
                        className="pl-10 h-11 rounded-2xl border-gray-200 bg-white shadow-sm"
                        value={search}
                        onChange={(e) => {
                            setSearch(
                                e.currentTarget.value
                            );
                            setCurrentPage(1);
                        }}
                    />

                </div>

            </div>

            {/* TABLE CONTAINER */}

            <div
                className="
                    bg-white
                    rounded-3xl
                    shadow-2xl
                    border
                    border-gray-100
                    overflow-hidden
                    max-w-800
                    mx-auto
                "
            >

                {/* responsive wrapper */}

                <div className="overflow-x-auto">

                    <Table>

                        <TableHeader>

                            <TableRow
                                className="
                                    bg-red-600
                                    hover:bg-red-600
                                "
                            >

                                <TableHead className="text-white font-semibold">
                                    ID
                                </TableHead>

                                <TableHead className="text-white font-semibold">
                                    Nombre
                                </TableHead>

                                <TableHead className="text-white font-semibold">
                                    Descripción
                                </TableHead>

                                <TableHead className="text-white font-semibold">
                                    Precio
                                </TableHead>

                            </TableRow>

                        </TableHeader>

                        <TableBody>

                            {
                                paginatedProducts.length > 0
                                    ? (
                                        paginatedProducts.map(
                                            (
                                                product: Product
                                            ) => (

                                                <TableRow
                                                    key={
                                                        product.id_producto
                                                    }
                                                    className="
                                                        hover:bg-red-50
                                                        transition-colors
                                                    "
                                                >

                                                    <TableCell className="font-medium">
                                                        {
                                                            product.id_producto
                                                        }
                                                    </TableCell>

                                                    <TableCell>

                                                        <Link
                                                            className="
                                                                text-red-600
                                                                font-semibold
                                                                hover:underline
                                                            "
                                                            href={
                                                                `/dashboard/products/${product.id_producto}`
                                                            }
                                                        >
                                                            {
                                                                product.nombre
                                                            }
                                                        </Link>

                                                    </TableCell>

                                                    <TableCell
                                                        className="
                                                            text-gray-600
                                                            min-w-[250px]
                                                        "
                                                    >
                                                        {
                                                            product.descripcion
                                                        }
                                                    </TableCell>

                                                    <TableCell
                                                        className="
                                                            font-bold
                                                            text-green-600
                                                        "
                                                    >
                                                        $
                                                        {
                                                            product.precio
                                                        }
                                                    </TableCell>

                                                </TableRow>

                                            )
                                        )
                                    )
                                    : (
                                        <TableRow>

                                            <TableCell
                                                colSpan={4}
                                                className="
                                                    text-center
                                                    py-10
                                                    text-gray-500
                                                "
                                            >
                                                No hay productos
                                            </TableCell>

                                        </TableRow>
                                    )
                            }

                        </TableBody>

                    </Table>

                </div>

                {/* FOOTER PAGINATION */}

                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        justify-between
                        gap-4
                        px-6
                        py-4
                        border-t
                        bg-gray-50
                    "
                >

                    <p className="text-sm text-gray-500">

                        Página
                        {" "}
                        <span className="font-semibold">
                            {currentPage}
                        </span>

                        {" "}
                        de
                        {" "}

                        <span className="font-semibold">
                            {totalPages || 1}
                        </span>

                    </p>

                    <div className="flex items-center gap-2">

                        <Button
                            variant="outline"
                            className="
                                rounded-xl
                                border-gray-200
                            "
                            disabled={
                                currentPage === 1
                            }
                            onClick={() =>
                                setCurrentPage(
                                    currentPage - 1
                                )
                            }
                        >

                            <ChevronLeft size={18} />

                        </Button>

                        <Button
                            variant="outline"
                            className="
                                rounded-xl
                                border-gray-200
                            "
                            disabled={
                                currentPage ===
                                totalPages
                                ||
                                totalPages === 0
                            }
                            onClick={() =>
                                setCurrentPage(
                                    currentPage + 1
                                )
                            }
                        >

                            <ChevronRight size={18} />

                        </Button>

                    </div>

                </div>

            </div>

        </div>
    );
}