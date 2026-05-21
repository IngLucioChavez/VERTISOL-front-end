"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { toast } from "sonner";
import { api } from "@/lib/axios";

import {
    BACKEND_ROUTES
} from "@/API-EndPoints/back";

export default function LoginPage() {
    const router = useRouter();
    const { dispatch } = useApp();

    const [showPassword, setShowPassword] = useState(false);
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");


    const login = async () => {

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

        const response = await api.post(
            BACKEND_ROUTES.LOGIN,
            {
                correo,
                password,
            }
        );

        const data = response.data;

        console.log({ data })
        return

        const fakeUser = {
            id: "1",
            name: "Lucio",
            email: "lucio@gmail.com",
        };

        // guardar en context
        dispatch({
            type: "LOGIN",
            payload: fakeUser,
        });

        // guardar cookie auth
        document.cookie =
            "token=fintech_token; path=/";

        // guardar user persistente
        localStorage.setItem(
            "user",
            JSON.stringify(fakeUser)
        );

        router.push("/dashboard");
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-500 flex items-center justify-center px-4">

            {/* Círculos decorativos */}
            <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20 blur-2xl" />

            <div className="absolute w-96 h-96 bg-white/10 rounded-full bottom-0 right-0 blur-3xl" />

            <div className="absolute w-56 h-56 bg-white/10 rounded-full top-1/2 left-1/3 blur-2xl" />

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