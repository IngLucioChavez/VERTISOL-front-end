import { NextResponse } from "next/server";

export const POST = async (
    request: Request
) => {
    try {


        const body = await request.json();

        const response = await fetch(
            `${process.env.API_URL}/registrarVenta`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    id_producto: body.id_producto,
                    cantidad: body.cantidad,
                })
            }
        );

        const data = await response.json();

        return NextResponse.json(
            data,
            {
                status: response.status,
            }
        );

    } catch (error) {

        return NextResponse.json(
            {
                message: "Error interno del servidor"
            },
            {
                status: 500,
            }
        );

    }
}