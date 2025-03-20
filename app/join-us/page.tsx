"use client";
import Card from "@/components/join-us/card";
import {useEffect, useState} from "react";
import Loader from "@/components/loading";
import { useRouter} from "next/navigation";
import {Suspense} from "react";
import { useStorage } from "@/hooks/useStorage";

interface CardData {
    id: number;
    title: string;
    profile: string;
    tools: string;
    characteristics: string;
    icon: string;
}

function JoinUs() {
    const { getItem, removeItem } = useStorage();

    const [cards, setCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showNewCard, setShowNewCard] = useState<boolean>(false);
    const [isSubmitted, setSubmitted] = useState(false);
    const token = getItem('token');
    const router = useRouter();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_API_URL}/vacancies`);
                const data = await response.json();
                setCards(data.vacancies);
            } catch (error) {
                console.error("Error fetching cards:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [isSubmitted]);
    
    const isAuthenticated = token !== null && token !== "";

    const handleLogout = () => {
        removeItem("token");
        router.push("/");
    };

    return (
        <div>
            {loading && <Loader/>}

            <section className="flex flex-col w-full items-center text-[#808080]">
                <img
                    className='mt-[32px] mb-[20px] w-[179px] lg:w-[250px] xl:w-[600px] xl:mt-0 xl:mb-0'
                    src="/images/imagen-unete-al-equipo.webp"
                    alt="Imagen Únete al Equipo"
                />
                <p className="font-light text-[20px] md:text-[40px] xl:text-[60px] xl:leading-tight">ÚNETE</p>
                <p className="font-bold text-[20px] md:text-[40px] xl:text-[60px] xl:leading-tight">AL EQUIPO</p>
                <p className="hidden md:block mx-[348px] mt-[54px] mb-[150px] text-[33px] font-bold text-center md:mb-[120px] md:mx-[150px] md:text-[22px] leading-tight">
                    Estamos buscando personas que puedan sumar esfuerzos a nuestro equipo. <br/>
                    <span className="font-normal">
                        Consulta nuestras vacantes:
                    </span>
                </p>
                <p className="mx-[68px] mt-[48px] mb-[18px] text-[12px] font-bold text-center md:hidden">
                    Estamos buscando personas que puedan sumar esfuerzos a nuestro equipo.
                </p>
                <p className="text-[12px] mb-[52px] md:hidden">
                    Consulta nuestras vacantes:
                </p>
            </section>

            {isAuthenticated && (
                <div className="flex justify-center gap-4">
                    {showNewCard ? (
                        <button
                            className="bg-gray-500 text-white font-bold rounded-xl mb-16 hover:bg-gray-300 px-2 py-3 text-xs w-[120px] md:px-3 md:py-4 md:text-md md:w-[200px] xl:text-xl"
                            onClick={() => setShowNewCard(!showNewCard)}
                        >
                            CANCELAR
                        </button>
                    ) : (
                        <button
                            className="bg-blue-500 text-white font-bold rounded-xl mb-16 hover:bg-blue-300 px-2 py-3 text-xs w-[120px] md:px-3 md:py-4 md:text-md md:w-[200px] xl:text-xl"
                            onClick={() => setShowNewCard(!showNewCard)}
                        >
                            AGREGAR
                        </button>
                    )}

                    <button
                        className="bg-red-500 text-white font-bold rounded-xl mb-16 hover:bg-red-300 px-2 py-3 text-xs w-[120px] md:px-3 md:py-4 md:text-md md:w-[200px] xl:text-xl"
                        onClick={handleLogout}
                    >
                        CERRAR SESIÓN
                    </button>
                </div>
            )}

            <section
                className="flex flex-wrap flex-col w-full items-center mb-[68px] gap-[70px] xl:gap-[120px] 2xl:px-40 xl:mb-[178px] xl:mt-[32px] md:flex-row md:justify-center"
            >
                {showNewCard && (
                    <Card
                        id={0}
                        title=""
                        profile=""
                        tools=""
                        characteristics=""
                        icon=""
                        isEdit={true}
                        onSubmitted={setSubmitted}
                        isSubmitted={isSubmitted}
                        token={token}
                        onShow={setShowNewCard}
                    />
                )}
                {cards && cards.map((card: CardData) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        profile={card.profile}
                        tools={card.tools}
                        characteristics={card.characteristics}
                        icon={card.icon}
                        isSubmitted={isSubmitted}
                        onSubmitted={setSubmitted}
                        token={token}
                        onShow={setShowNewCard}
                    />
                ))}
            </section>
        </div>
    )
}

export default function JoinUsPage() {
    return (
        <Suspense>
            <JoinUs/>
        </Suspense>
    )
}
