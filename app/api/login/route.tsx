import { NextResponse } from "next/server";

export const POST = async (
    request: Request
) => {
    try {

        const body =
            await request.json();

        const response = await fetch(
            `${process.env.API_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
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
                message: "Error interno del servidor",
            },
            {
                status: 500,
            }
        );

    }
}