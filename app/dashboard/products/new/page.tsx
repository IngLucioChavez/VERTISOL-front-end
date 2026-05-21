"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { BACKEND_ROUTES } from "@/API-EndPoints/back";
import { toast } from "sonner";

import {
    Package,
    DollarSign,
    ImageIcon,
    FileText
} from "lucide-react";

export default function NewProductPage() {

    const { dispatch } = useApp();
    const router = useRouter();
    const [name, setName] =
        useState("");
    const [price, setPrice] =
        useState("");
    const [image, setImage] =
        useState("");
    const [description, setDescription] =
        useState("");
    const [loading, setLoading] =
        useState(false);

    const submit = async () => {

        try {

            setLoading(true);
            await api.post(
                BACKEND_ROUTES.REGISTRARPRODUCTO,
                {
                    nombre: name,
                    precio: price,
                    image: image,
                    descripcion: description,
                }
            );

            toast.success(
                "Producto registrado exitosamente",
                {
                    position: "top-center"
                }
            );

            setTimeout(() => {
                router.push(
                    "/dashboard/products"
                );
            }, 1000);

        } catch (err: any) {

            toast.error(
                err?.response?.data?.message ||
                "Error en registro de producto",
                {
                    position: "top-center"
                }
            );

        } finally {
            setLoading(false);
        }
    };

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
                    w-full
                    max-w-2xl
                    bg-white
                    rounded-3xl
                    shadow-2xl
                    border
                    border-gray-100
                    p-8
                    md:p-10
                    relative
                    overflow-hidden
                "
            >

                {/* DECORATION */}

                <div
                    className="
                        absolute
                        -top-20
                        -right-20
                        w-56
                        h-56
                        bg-red-100
                        rounded-full
                        blur-3xl
                        opacity-60
                    "
                />

                <div
                    className="
                        absolute
                        -bottom-20
                        -left-20
                        w-56
                        h-56
                        bg-red-50
                        rounded-full
                        blur-3xl
                        opacity-70
                    "
                />

                {/* CONTENT */}

                <div className="relative z-10">

                    <div className="mb-8">

                        <h1
                            className="
                                text-4xl
                                font-bold
                                text-red-600
                            "
                        >
                            Nuevo Producto
                        </h1>

                        <p
                            className="
                                text-gray-500
                                mt-2
                            "
                        >
                            Registra un nuevo producto
                            para el portal fintech
                        </p>

                    </div>

                    {/* FORM */}

                    <div className="space-y-6">

                        {/* NOMBRE */}

                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                md:items-center
                                gap-3
                            "
                        >

                            <label
                                className="
                                    md:w-40
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

                                Nombre

                            </label>

                            <Input
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.currentTarget.value
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

                        {/* PRECIO */}

                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                md:items-center
                                gap-3
                            "
                        >

                            <label
                                className="
                                    md:w-40
                                    font-semibold
                                    text-gray-700
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <DollarSign
                                    size={18}
                                    className="text-red-500"
                                />

                                Precio

                            </label>

                            <Input
                                type="number"
                                value={price}
                                onChange={(e) =>
                                    setPrice(
                                        e.currentTarget.value
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

                        {/* IMAGE */}

                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                md:items-center
                                gap-3
                            "
                        >

                            <label
                                className="
                                    md:w-40
                                    font-semibold
                                    text-gray-700
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                <ImageIcon
                                    size={18}
                                    className="text-red-500"
                                />

                                URL Imagen

                            </label>

                            <Input
                                value={image}
                                onChange={(e) =>
                                    setImage(
                                        e.currentTarget.value
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

                        {/* DESCRIPTION */}

                        <div
                            className="
                                flex
                                flex-col
                                md:flex-row
                                gap-3
                            "
                        >

                            <label
                                className="
                                    md:w-40
                                    font-semibold
                                    text-gray-700
                                    flex
                                    items-start
                                    gap-2
                                    pt-3
                                "
                            >

                                <FileText
                                    size={18}
                                    className="text-red-500"
                                />

                                Descripción

                            </label>

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.currentTarget.value
                                    )
                                }
                                className="
                                    w-full
                                    min-h-[140px]
                                    rounded-2xl
                                    border
                                    border-gray-200
                                    p-4
                                    shadow-sm
                                    resize-none
                                    outline-none
                                    focus:ring-2
                                    focus:ring-red-500
                                "
                            />

                        </div>

                        {/* BUTTON */}

                        <div
                            className="
                                flex
                                justify-end
                                pt-4
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
                                        ? "Guardando..."
                                        : "Guardar Producto"
                                }

                            </Button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}