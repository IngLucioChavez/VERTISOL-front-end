"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ProductsPage() {
    const { state } = useApp();

    return (
        <div className="overflow-auto">
            <h2 className="text-3xl font-bold mb-6 text-red-600">
                Productos
            </h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {state.products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <Link
                                    className="text-red-600 font-semibold"
                                    href={`/dashboard/products/${product.id}`}
                                >
                                    {product.name}
                                </Link>
                            </TableCell>

                            <TableCell>
                                ${product.price}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}