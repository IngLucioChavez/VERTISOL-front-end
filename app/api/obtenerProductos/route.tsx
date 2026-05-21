import { NextResponse } from "next/server";

export const GET = async (
    request: Request
) => {
    try {


        // const body = await request.json();

        const response = await fetch(
            `${process.env.API_URL}/obtenerProductos`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
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