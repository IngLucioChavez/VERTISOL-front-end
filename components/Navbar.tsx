"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useApp } from "@/context/AppContext";

export const Navbar = () => {
    const router = useRouter();

    const { dispatch, state } = useApp();

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });

        localStorage.removeItem("user");

        document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        router.push("/login");
    };

    return (
        <nav className="bg-red-600 text-white px-6 py-4">

            <div className="flex flex-col md:flex-row justify-between gap-4">

                <div className="flex items-center gap-6 flex-wrap">

                    <h1 className="font-bold text-2xl">
                        Fintech Portal
                    </h1>

                    <Link href="/dashboard/products">
                        Productos
                    </Link>

                    <Link href="/dashboard/products/new">
                        Nuevo Producto
                    </Link>

                    <Link href="/dashboard/sales/new">
                        Registrar Venta
                    </Link>

                    <Link href="/dashboard/sales">
                        Ventas
                    </Link>
                </div>

                <div className="flex items-center gap-4">

                    <span>
                        {state.user?.name}
                    </span>

                    <button
                        onClick={logout}
                        className="bg-white text-red-600 px-4 py-2 rounded-xl font-bold"
                    >
                        Salir
                    </button>
                </div>
            </div>
        </nav>
    );
};