"use client";

import { useApp } from "@/context/AppContext";

export default function SalesPage() {
    const { state } = useApp();

    return (
        <div>
            <h1 className="text-3xl font-bold text-red-600 mb-6">
                Ventas Registradas
            </h1>

            <div className="grid gap-4">
                {state.sales.map((sale) => {
                    const product = state.products.find(
                        (p) => p.id === sale.productId
                    );

                    return (
                        <div
                            key={sale.id}
                            className="border rounded-xl p-4 shadow"
                        >
                            <h2 className="font-bold">
                                {product?.name}
                            </h2>

                            <p>
                                Cantidad: {sale.quantity}
                            </p>

                            <p>
                                Total: ${sale.total}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}