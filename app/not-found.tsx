"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-500 flex items-center justify-center px-4">

            {/* Círculos decorativos */}
            <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20 blur-2xl" />

            <div className="absolute w-96 h-96 bg-white/10 rounded-full bottom-0 right-0 blur-3xl" />

            <div className="absolute w-56 h-56 bg-white/10 rounded-full top-1/2 left-1/3 blur-2xl" />

            {/* Card */}
            <div className="relative z-10 bg-white/20 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-10 max-w-xl text-center">

                <h1 className="text-8xl font-extrabold text-white">
                    404
                </h1>

                <h2 className="text-3xl font-bold text-white mt-4">
                    Página no encontrada
                </h2>

                <p className="text-white/80 mt-4">
                    La ruta que intentas visitar no existe
                    o fue movida.
                </p>

                <div className="mt-8">
                    <Link href="/login">
                        <Button className="bg-white text-red-600 hover:bg-red-100 rounded-xl px-8 h-12 font-bold">
                            Volver al Login
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}