"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Product } from "@/context/types";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { BACKEND_ROUTES } from "@/API-EndPoints/back";

export default function ProductDetailPage() {
    const params = useParams();
    const { state } = useApp();
    const [producto, setProducto] = useState<Product | null>(null);

    useEffect(() => {

        api.post(BACKEND_ROUTES.GETPRODUCTOS, {
            id_producto: params.id
        }).then((r) => {
            setProducto(r.data.response[0]);
        });

    }, []);

    if (!producto) {
        return <div>Producto no encontrado</div>;
    }

    // return <></>

    return (
        <Card className="max-w-xl mx-auto p-6">
            <Image
                src={producto.image}
                alt={producto.nombre}
                width={400}
                height={300}
                className="rounded-xl w-full h-72 object-cover"
            />

            <h1 className="text-3xl font-bold mt-4 text-red-600">
                {producto.nombre}
            </h1>

            <p className="mt-2 text-gray-600">
                {producto.descripcion}
            </p>

            <p className="text-2xl font-bold mt-4">
                ${producto.precio}
            </p>
        </Card>
    );
}