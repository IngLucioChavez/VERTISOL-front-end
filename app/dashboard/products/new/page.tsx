"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { v4 as uuid } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewProductPage() {
    const { dispatch } = useApp();
    const router = useRouter();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] =
        useState("");

    const submit = () => {
        dispatch({
            type: "ADD_PRODUCT",
            payload: {
                id: uuid(),
                name,
                price: Number(price),
                image,
                description,
            },
        });

        router.push("/dashboard/products");
    };

    return (
        <div className="max-w-lg mx-auto space-y-4">
            <h1 className="text-3xl font-bold text-red-600">
                Nuevo Producto
            </h1>

            <Input
                placeholder="Nombre"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <Input
                placeholder="Precio"
                value={price}
                onChange={(e) =>
                    setPrice(e.target.value)
                }
            />

            <Input
                placeholder="URL Imagen"
                value={image}
                onChange={(e) =>
                    setImage(e.target.value)
                }
            />

            <Input
                placeholder="Descripción"
                value={description}
                onChange={(e) =>
                    setDescription(e.target.value)
                }
            />

            <Button
                onClick={submit}
                className="bg-red-600 hover:bg-red-700"
            >
                Guardar
            </Button>
        </div>
    );
}