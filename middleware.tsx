import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
    request: NextRequest
) {
    const pathname = request.nextUrl.pathname;

    // rutas públicas
    const publicRoutes = ["/login"];

    // simulación auth
    const isAuthenticated = true;

    // proteger dashboard
    if (
        pathname.startsWith("/dashboard") &&
        !isAuthenticated
    ) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // evitar entrar a login si ya está autenticado
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