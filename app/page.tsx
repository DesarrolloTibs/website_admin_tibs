"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import IconSend from "@/public/icons/icono-enviar.webp";
import {useStorage} from "@/hooks/useStorage";
import Loader from "@/components/loading";

export default function AdminLogin() {

    const {getItem, setItem} = useStorage();
    const tokenKey = getItem('token');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            if (!res.ok) {
                throw new Error("Credenciales incorrectas");
            }

            const data = await res.json();
            const token = encodeURIComponent(data.body.token);

            setItem('token', token);
            document.cookie = `token=${token}; path=/`;

            router.push('/topics');
        } catch (err) {
            const error = err as { message: string };
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tokenKey) {
            router.push('/topics');
        } else {
            setCheckingAuth(false);
        }
    }, [tokenKey]);

    if (checkingAuth || loading) {
        return <Loader/>
    }

    return (
        <div className="text-center font-lato my-12 md:my-16 xl:my-20">
            <h2 className="font-bold text-[#00178F] mb-[14px] xl:mt-[100px] text-[14px] md:text-[20px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px]">
                LOGIN
            </h2>
            <h3 className="text-[#808080] mx-[37px] mb-[36px] md:mx-[120px] lg:mx-[180px] xl:mx-[250px] 2xl:mx-[548] xl:mt-[32px] xl:mb-[100px]">
                Inicia sesión con tus credenciales
            </h3>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[28px] text-[#808080] text-[14px] mx-[55px] md:text-[16px] md:gap-[40px] lg:text-[24px] md:mx-[150px] lg:mx-[200px] lg:gap-[50px] xl:mx-[300px] 2xl:mx-[550px] xl:gap-[66px] 2xl:gap-[100px]"
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

                <div
                    className="relative mx-auto w-[172px] lg:w-[250px] xl:w-[450px] 2xl:w-[450px] mt-[40px] mb-[38px] xl:mt-[20px]">
                    <button
                        type="submit"
                        className="text-[14px] lg:text-[18px] 2xl:text-[24px] font-bold pl-4 2xl:pl-10 pr-12 2xl:pr-24 rounded-l-[12px] xl:rounded-l-[16px] 2xl:rounded-l-[32px] w-full h-[33px] lg:h-[45px] xl:h-[55px] bg-[#F1F1F1] flex items-center justify-between"
                    >
                        <span className="text-[#808080]">Iniciar sesión</span>
                        <img
                            className="absolute right-[-10px] focus:ring-transparent xl:right-[-15px] 2xl:right-[-40px] top-1/2 transform -translate-y-1/2 w-11 lg:w-[60px] xl:w-[70px]"
                            src={IconSend.src}
                            alt="Botón Iniciar Sesión"
                        />
                    </button>
                </div>
            </form>
        </div>
    );
}
