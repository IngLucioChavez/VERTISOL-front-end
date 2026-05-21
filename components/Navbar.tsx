"use client";

import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="bg-red-600 text-white px-6 py-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <h1 className="font-bold text-2xl">
                    Fintech Portal
                </h1>

                <div className="flex flex-wrap gap-4">
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
            </div>
        </nav>
    );
};