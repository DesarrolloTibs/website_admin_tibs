"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import IconSend from "@/public/icons/icono-enviar.webp";
import { useStorage } from "@/hooks/useStorage";

export default function AdminLogin() {

    const { getItem, setItem } = useStorage();
    const tokenKey = getItem('token');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${process.env.NEXT_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const data = await res.json();
            const token = encodeURIComponent(data.body.token);
            setItem('token', token);
            router.push('/join-us');
        } catch (err) {
            const error = err as { message: string };
            setError(error.message);
        }
    };

    useEffect(() => {
        if(tokenKey) {
            router.push('/join-us');
        }
    }, [])


    return (
        <div className="text-center font-lato my-12 md:my-16 xl:my-20">
            <p className="font-bold text-[#00178F] text-[14px] mb-[14px] md:text-[20px] lg:text-[30px] xl:text-[40px] xl:mt-[100px]">
                LOGIN
            </p>
            <p className="text-[#808080] text-[14px] mx-[37px] mb-[36px] md:text-[16px] lg:text-[23px] xl:text-[33px] md:mx-[100px] xl:mx-[250px] 2xl:mx-[348] xl:mt-[32px] xl:mb-[100px]">
                Inicia sesión con tus credenciales
            </p>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[28px] text-[#808080] text-[14px] mx-[55px] md:text-[16px] lg:text-[25px] xl:text-[35px] md:mx-[150px] lg:mx-[200px] xl:mx-[400px] 2xl:mx-[550px] xl:gap-[66px]"
            >
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-bold">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="border-b border-[#808080] p-2 outline-none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="font-bold">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="border-b border-[#808080] p-2 outline-none"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-500 text-sm md:text-md xl:text-xl">{error}</p>}

                <div className="relative mx-auto w-[172px] xl:w-[450px] 2xl:w-[500px] mt-[40px] mb-[38px] xl:mt-[20px]">
                    <button
                        type="submit"
                        className="text-[14px] lg:text-[18px] 2xl:text-[30px] font-bold pl-4 2xl:pl-10 pr-12 2xl:pr-24 rounded-l-[12px] xl:rounded-l-[16px] 2xl:rounded-l-[32px] w-full h-[33px] xl:h-[45px] 2xl:h-[75px] bg-[#F1F1F1] flex items-center justify-between"
                    >
                        <span className="text-[#808080]">Iniciar sesión</span>
                        <img
                            className="absolute right-[-10px] focus:ring-transparent 2xl:right-[-60px] top-1/2 transform -translate-y-1/2 w-11 xl:w-[55px] 2xl:w-[90px]"
                            src={IconSend.src}
                            alt="Botón Iniciar Sesión"
                        />
                    </button>
                </div>
            </form>
        </div>
    );
}
