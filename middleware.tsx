import { NextRequest, NextResponse } from "next/server";

export function middleware(
    request: NextRequest
) {
    const token =
        request.cookies.get("token");

    const isAuthenticated = !!token;

    const pathname =
        request.nextUrl.pathname;

    // rutas públicas
    const publicRoutes = ["/login"];

    // dashboard protegido
    if (
        pathname.startsWith("/dashboard") &&
        !isAuthenticated
    ) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // evitar regresar a login
    if (
        pathname === "/login" &&
        isAuthenticated
    ) {
        return NextResponse.redirect(
            new URL("/dashboard", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/dashboard/:path*",
    ],
};