"use client";

import { BACKEND_ROUTES } from "@/API-EndPoints/back";

import { useApp } from "@/context/AppContext";

import { api } from "@/lib/axios";

import { useEffect, useMemo, useState } from "react";

import { toast } from "sonner";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
    Search,
    ChevronLeft,
    ChevronRight,
    ReceiptText,
    DollarSign,
    Package,
    Hash
} from "lucide-react";

export default function SalesPage() {

    const { state } = useApp();

    const [ventas, setVentas] =
        useState<any[]>([]);

    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const itemsPerPage = 5;

    // OBTENER VENTAS

    useEffect(() => {

        api.get(
            BACKEND_ROUTES.OBTENERVENTAS
        )

            .then((response) => {

                setVentas(
                    response.data.response
                );

            })

            .catch((err) => {

                toast.error(
                    `${err?.response?.data?.message
                    }`,
                    {
                        position:
                            "top-center"
                    }
                );

            });

    }, []);

    // FILTRAR

    const filteredVentas =
        useMemo(() => {

            return ventas.filter(
                (sale: any) =>

                    sale.nombre
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )

            );

        }, [ventas, search]);

    // PAGINADO

    const totalPages =
        Math.ceil(
            filteredVentas.length /
            itemsPerPage
        );

    const paginatedVentas =
        filteredVentas.slice(
            (currentPage - 1)
            * itemsPerPage,

            currentPage
            * itemsPerPage
        );

    return (

        <div className="w-full">

            {/* HEADER */}

            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                    mb-6
                "
            >

                <div>

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            bg-red-100
                            text-red-600
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                            mb-3
                        "
                    >

                        <ReceiptText size={18} />

                        Historial de Ventas

                    </div>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            text-red-600
                        "
                    >
                        Ventas Registradas
                    </h1>

                    <p
                        className="
                            text-gray-500
                            mt-2
                        "
                    >
                        Visualiza y administra
                        todas las ventas registradas
                    </p>

                </div>

                {/* SEARCH */}

                <div
                    className="
                        relative
                        w-full
                        md:w-[320px]
                    "
                >

                    <Search
                        className="
                            absolute
                            left-3
                            top-3
                            text-gray-400
                        "
                        size={18}
                    />

                    <Input
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={(e) => {

                            setSearch(
                                e.currentTarget.value
                            );

                            setCurrentPage(1);

                        }}
                        className="
                            pl-10
                            h-12
                            rounded-2xl
                            border-gray-200
                            shadow-sm
                            focus-visible:ring-red-500
                        "
                    />

                </div>

            </div>

            {/* FLOATING TABLE */}

            <div
                className="
                    bg-white
                    rounded-3xl
                    shadow-xl
                    border
                    border-gray-100
                    overflow-hidden
                "
            >

                {/* RESPONSIVE */}

                <div className="overflow-x-auto">

                    <Table>

                        {/* HEADER */}

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
                                    Producto
                                </TableHead>

                                <TableHead className="text-white font-semibold">
                                    Cantidad
                                </TableHead>

                                <TableHead className="text-white font-semibold">
                                    Total
                                </TableHead>

                            </TableRow>

                        </TableHeader>

                        {/* BODY */}

                        <TableBody>

                            {
                                paginatedVentas.length > 0
                                    ? (

                                        paginatedVentas.map(
                                            (
                                                sale: any
                                            ) => (

                                                <TableRow
                                                    key={sale.id}
                                                    className="
                                                        hover:bg-red-50
                                                        transition-colors
                                                    "
                                                >

                                                    {/* ID */}

                                                    <TableCell
                                                        className="
                                                            font-semibold
                                                        "
                                                    >

                                                        #{sale.id}

                                                    </TableCell>

                                                    {/* PRODUCTO */}

                                                    <TableCell>

                                                        <div
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-3
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    w-10
                                                                    h-10
                                                                    rounded-xl
                                                                    bg-red-100
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                "
                                                            >

                                                                <Package
                                                                    size={18}
                                                                    className="
                                                                        text-red-600
                                                                    "
                                                                />

                                                            </div>

                                                            <span
                                                                className="
                                                                    font-semibold
                                                                    text-gray-700
                                                                "
                                                            >

                                                                {
                                                                    sale.nombre
                                                                }

                                                            </span>

                                                        </div>

                                                    </TableCell>

                                                    {/* CANTIDAD */}

                                                    <TableCell>

                                                        <div
                                                            className="
                                                                inline-flex
                                                                items-center
                                                                gap-2
                                                                bg-gray-100
                                                                px-3
                                                                py-1
                                                                rounded-full
                                                                text-sm
                                                                font-semibold
                                                            "
                                                        >

                                                            <Hash
                                                                size={14}
                                                            />

                                                            {
                                                                sale.cantidad
                                                            }

                                                        </div>

                                                    </TableCell>

                                                    {/* TOTAL */}

                                                    <TableCell>

                                                        <div
                                                            className="
                                                                inline-flex
                                                                items-center
                                                                gap-2
                                                                text-green-600
                                                                font-bold
                                                                text-lg
                                                            "
                                                        >

                                                            <DollarSign
                                                                size={18}
                                                            />

                                                            {
                                                                sale.total
                                                            }

                                                        </div>

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
                                                    py-12
                                                    text-gray-500
                                                "
                                            >

                                                No existen ventas registradas

                                            </TableCell>

                                        </TableRow>

                                    )
                            }

                        </TableBody>

                    </Table>

                </div>

                {/* FOOTER */}

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

                    <p
                        className="
                            text-sm
                            text-gray-500
                        "
                    >

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

                    {/* BUTTONS */}

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <Button
                            variant="outline"
                            disabled={
                                currentPage === 1
                            }
                            onClick={() =>
                                setCurrentPage(
                                    currentPage - 1
                                )
                            }
                            className="
                                rounded-xl
                            "
                        >

                            <ChevronLeft size={18} />

                        </Button>

                        <Button
                            variant="outline"
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
                            className="
                                rounded-xl
                            "
                        >

                            <ChevronRight size={18} />

                        </Button>

                    </div>

                </div>

            </div>

        </div>
    );
}