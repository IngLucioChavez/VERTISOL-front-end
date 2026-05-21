"use client";

import { useApp } from "@/context/AppContext";

export default function DashboardPage() {

    const { dispatch, state } = useApp();

    return (
        <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-red-600">
                    Fintech Dashboard <br /> Bienvenido {state.user.nombre}
                </h1>

                <p className="mt-4 text-gray-500">
                    Plataforma de gestión de pagos y ventas
                </p>
            </div>
        </div>
    );
}