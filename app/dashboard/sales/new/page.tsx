"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";

import { useApp } from "@/context/AppContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewSalePage() {
    const { state, dispatch } = useApp();

    const [productId, setProductId] =
        useState("");

    const [quantity, setQuantity] =
        useState(1);

    const submit = () => {
        const product = state.products.find(
            (p) => p.id === productId
        );

        if (!product) return;

        dispatch({
            type: "ADD_SALE",
            payload: {
                id: uuid(),
                productId,
                quantity,
                total: quantity * product.price,
            },
        });
    };

    return (
        <div className="space-y-4 max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-red-600">
                Registrar Venta
            </h1>

            <select
                className="w-full border rounded-md p-3"
                onChange={(e) =>
                    setProductId(e.target.value)
                }
            >
                <option>Seleccione producto</option>

                {state.products.map((product) => (
                    <option
                        key={product.id}
                        value={product.id}
                    >
                        {product.name}
                    </option>
                ))}
            </select>

            <Input
                type="number"
                placeholder="Cantidad"
                onChange={(e) =>
                    setQuantity(Number(e.target.value))
                }
            />

            <Button
                onClick={submit}
                className="bg-red-600 hover:bg-red-700"
            >
                Registrar
            </Button>
        </div>
    );
}