"use client";

import { useEffect, useState } from "react";

import { useApp } from "@/context/AppContext";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { api } from "@/lib/axios";

import { BACKEND_ROUTES } from "@/API-EndPoints/back";

import { Product } from "@/context/types";

import { toast } from "sonner";

import {
    ShoppingCart,
    Package,
    Hash,
    DollarSign
} from "lucide-react";

export default function NewSalePage() {

    const { state, dispatch } = useApp();

    const [productId, setProductId] =
        useState("");

    const [quantity, setQuantity] =
        useState(1);

    const [productos, setProductos] =
        useState<Product[]>([]);

    const [loading, setLoading] =
        useState(false);

    // PRODUCTO SELECCIONADO

    const productoSeleccionado =
        productos.find(
            (product) =>
                String(product.id_producto) ===
                productId
        );

    // REGISTRAR VENTA

    const submit = async () => {

        try {

            setLoading(true);

            const response =
                await api.post(
                    BACKEND_ROUTES.REGISTRARVENTA,
                    {
                        id_producto: productId,
                        cantidad: quantity
                    }
                );

            toast.success(
                `${response.data.message}`,
                {
                    position: "top-center"
                }
            );

            // LIMPIAR FORM

            setProductId("");
            setQuantity(1);

        } catch (err: any) {

            toast.error(
                err?.response?.data?.message ||
                "Error al registrar venta",
                {
                    position: "top-center"
                }
            );

            // LIMPIAR FORM

            setProductId("");
            setQuantity(1);

        } finally {

            setLoading(false);

        }
    };

    // OBTENER PRODUCTOS

    useEffect(() => {

        api.get(
            BACKEND_ROUTES.GETPRODUCTOS
        )

            .then((response) => {

                setProductos(
                    response.data.response
                );

            })

            .catch((err) => {

                toast.error(
                    `Error - ${err?.response?.data?.message
                    }`
                );

            });

    }, []);

    return (

        <div
            className="
                min-h-[80vh]
                flex
                items-center
                justify-center
                px-4
                py-8
            "
        >

            {/* CARD */}

            <div
                className="
                    relative
                    w-full
                    max-w-2xl
                    bg-white
                    rounded-3xl
                    shadow-2xl
                    border
                    border-gray-100
                    overflow-hidden
                    p-8
                    md:p-10
                "
            >

                {/* DECORATION */}

                <div
                    className="
                        absolute
                        -top-20
                        -right-20
                        w-52
                        h-52
                        bg-red-100
                        rounded-full
                        blur-3xl
                        opacity-70
                    "
                />

                <div
                    className="
                        absolute
                        -bottom-20
                        -left-20
                        w-52
                        h-52
                        bg-red-50
                        rounded-full
                        blur-3xl
                        opacity-70
                    "
                />

                {/* CONTENT */}

                <div className="relative z-10">

                    {/* HEADER */}

                    <div className="mb-8">

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
                                mb-4
                            "
                        >

                            <ShoppingCart size={18} />

                            Nueva Venta

                        </div>

                        <h1
                            className="
                                text-4xl
                                font-bold
                                text-red-600
                            "
                        >
                            Registrar Venta
                        </h1>

                        <p
                            className="
                                text-gray-500
                                mt-2
                            "
                        >
                            Registra ventas de productos
                            en el sistema fintech
                        </p>

                    </div>

                    {/* FORM */}

                    <div className="space-y-6">

                        {/* PRODUCTO */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-2
                            "
                        >

                            <label
                                className="
                                    font-semibold
                                    text-gray-700
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <Package
                                    size={18}
                                    className="text-red-500"
                                />

                                Producto

                            </label>

                            <select
                                value={productId}
                                className="
                                    w-full
                                    h-12
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    px-4
                                    bg-white
                                    shadow-sm
                                    outline-none
                                    focus:ring-2
                                    focus:ring-red-500
                                "
                                onChange={(e) =>
                                    setProductId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Seleccione producto
                                </option>

                                {
                                    productos.map(
                                        (product) => (

                                            <option
                                                key={
                                                    product.id_producto
                                                }
                                                value={
                                                    product.id_producto
                                                }
                                            >

                                                {
                                                    product.nombre
                                                }

                                                {" - $"}
                                                {
                                                    product.precio
                                                }

                                            </option>

                                        )
                                    )
                                }

                            </select>

                        </div>

                        {/* CANTIDAD */}

                        <div
                            className="
                                flex
                                flex-col
                                gap-2
                            "
                        >

                            <label
                                className="
                                    font-semibold
                                    text-gray-700
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <Hash
                                    size={18}
                                    className="text-red-500"
                                />

                                Cantidad

                            </label>

                            <Input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Number(
                                            e.currentTarget.value
                                        )
                                    )
                                }
                                className="
                                    h-12
                                    rounded-2xl
                                    border-gray-200
                                    shadow-sm
                                    focus-visible:ring-red-500
                                "
                            />

                        </div>

                        {/* RESUMEN */}

                        {
                            productoSeleccionado && (

                                <div
                                    className="
                                        bg-gray-50
                                        rounded-2xl
                                        border
                                        p-5
                                        space-y-3
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <span
                                            className="
                                                text-gray-500
                                            "
                                        >
                                            Producto
                                        </span>

                                        <span
                                            className="
                                                font-semibold
                                            "
                                        >

                                            {
                                                productoSeleccionado.nombre
                                            }

                                        </span>

                                    </div>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <span
                                            className="
                                                text-gray-500
                                            "
                                        >
                                            Precio unitario
                                        </span>

                                        <span
                                            className="
                                                font-semibold
                                                text-green-600
                                            "
                                        >

                                            $
                                            {
                                                productoSeleccionado.precio
                                            }

                                        </span>

                                    </div>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            border-t
                                            pt-3
                                        "
                                    >

                                        <span
                                            className="
                                                font-bold
                                            "
                                        >
                                            Total estimado
                                        </span>

                                        <span
                                            className="
                                                text-2xl
                                                font-bold
                                                text-red-600
                                            "
                                        >

                                            $
                                            {
                                                (
                                                    Number(
                                                        productoSeleccionado.precio
                                                    ) *
                                                    quantity
                                                ).toFixed(2)
                                            }

                                        </span>

                                    </div>

                                </div>

                            )
                        }

                        {/* BUTTON */}

                        <div
                            className="
                                flex
                                justify-end
                                pt-2
                            "
                        >

                            <Button
                                onClick={submit}
                                disabled={loading}
                                className="
                                    bg-red-600
                                    hover:bg-red-700
                                    rounded-2xl
                                    h-12
                                    px-8
                                    text-base
                                    shadow-lg
                                "
                            >

                                {
                                    loading
                                        ? "Registrando..."
                                        : "Registrar Venta"
                                }

                            </Button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}