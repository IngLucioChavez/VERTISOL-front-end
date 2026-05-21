"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const router = useRouter();

    const login = () => {
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-600 p-4">
            <Card className="w-full max-w-md p-6 space-y-4">
                <h1 className="text-3xl font-bold text-center text-red-600">
                    Fintech Portal
                </h1>

                <Input placeholder="Correo" />

                <Input type="password" placeholder="Contraseña" />

                <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={login}
                >
                    Iniciar sesión
                </Button>
            </Card>
        </div>
    );
}