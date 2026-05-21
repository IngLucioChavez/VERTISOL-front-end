"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { api } from "@/lib/axios";

import {
    BACKEND_ROUTES
} from "@/API-EndPoints/back";
import { AxiosResponse } from "axios";
import { ResponseLogin } from "../interfaces/responseLogin";

export default function LoginPage() {
    const router = useRouter();
    const { dispatch } = useApp();

    const [showPassword, setShowPassword] = useState(false);
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");


    const login = async () => {

        // validaciones simples de campos login
        if (correo === "" || password === "") {
            toast.error(
                "Todos los campos son obligatorios", {
                position: "top-center"
            });
            return
        } else if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo))) {
            toast.error(
                "Correo no valido", {
                position: "top-center"
            });
            return
        }

        try {
            // comunicación a ruta /api/login donde NEXT JS interceptará la petición
            // y en el interceptor se llama a la ruta real del back
            const response: AxiosResponse<ResponseLogin> = await api.post(
                BACKEND_ROUTES.LOGIN,
                { correo, password }
            );


            // guardar en context
            dispatch({
                type: "LOGIN",
                payload: {
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    token: response.data.token,
                },
            });

            // guardar cookie auth
            document.cookie = `token=${response.data.token}; path=/`;

            // guardar user persistente
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // redireccionando a dashboard
            router.push("/dashboard");

        } catch (error: any) {

            toast.error(
                error?.response?.data?.message ||
                "Error al iniciar sesión", {
                position: "top-center"
            });

        }

    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-700 via-red-800 to-red-950 flex items-center justify-center px-4">

            {/* Círculos decorativos */}
            <div className="absolute w-72 h-72 bg-white/30 rounded-full -top-20 -left-20 blur-2xl" />
            <div className="absolute w-72 h-72 bg-white/30 rounded-full top-50 left-20 blur-2xl" />
            <div className="absolute w-96 h-96 bg-white/25 rounded-full bottom-0 right-50 blur-3xl" />
            <div className="absolute w-56 h-56 bg-white/30 rounded-full top-1/2 left-1/3 blur-2xl" />
            <div className="absolute w-56 h-56 bg-white/30 rounded-full top-10 right-10 blur-2xl" />

            {/* Card Login */}
            <Card className="relative z-10 w-full max-w-md border-none bg-white/20 backdrop-blur-xl shadow-2xl rounded-3xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-white">
                        Fintech Portal
                    </h1>

                    <p className="text-white/80 mt-3 text-sm">
                        Bienvenido a Sistema Fintech
                    </p>
                </div>

                {/* Inputs */}
                <div className="space-y-5">

                    <div>
                        <label className="text-white text-sm mb-2 block">
                            Correo electrónico
                        </label>

                        <Input
                            placeholder="correo@empresa.com"
                            className="bg-white/80 border-none h-12 rounded-xl"
                            onKeyUp={(e) => setCorreo(e.currentTarget.value)}
                        />
                    </div>

                    <div>
                        <label className="text-white text-sm mb-2 block">
                            Contraseña
                        </label>

                        <div className="relative">
                            <Input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="********"
                                className="bg-white/80 border-none h-12 rounded-xl pr-12"
                                onKeyUp={(e) => setPassword(e.currentTarget.value)}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <Button
                        onClick={login}
                        className="w-full h-12 rounded-xl bg-white text-red-600 hover:bg-red-100 font-bold text-base transition-all duration-300"
                    >
                        Iniciar sesión
                    </Button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-white/70 text-sm">
                    Plataforma de gestión financiera
                </div>
            </Card>
        </div>
    );
}