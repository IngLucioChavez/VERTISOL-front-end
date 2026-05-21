import axios from "axios";

export const api = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type":
            "application/json",
    },
});

// configurando interceptor de axios para agregar token si existe en storage
// con esto todos los request enviaran automáticamente el token JWT si existe en storage
api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem(
                "token"
            );

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;
    })