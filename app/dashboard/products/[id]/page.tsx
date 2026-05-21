"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Card } from "@/components/ui/card";
import { Product } from "@/context/types";

export default function ProductDetailPage() {
    const params = useParams();
    const { state } = useApp();

    const product = state.products.find(
        (p: Product) => p.id === params.id
    );

    if (!product) {
        return <div>Producto no encontrado</div>;
    }

    return (
        <Card className="max-w-xl mx-auto p-6">
            <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="rounded-xl w-full h-72 object-cover"
            />

            <h1 className="text-3xl font-bold mt-4 text-red-600">
                {product.name}
            </h1>

            <p className="mt-2 text-gray-600">
                {product.description}
            </p>

            <p className="text-2xl font-bold mt-4">
                ${product.price}
            </p>
        </Card>
    );
}