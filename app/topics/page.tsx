"use client";
import Card from "@/components/topics/card";
import {useStorage} from "@/hooks/useStorage";
import {Suspense, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Loader from "@/components/loading";

interface CardData {
    id: number;
    title: string;
    description: string;
    image: string;
    userCreated: string;
    userUpdated: string;
    createdAt: string;
    updatedAt: string;
    link: string;
}

function Topics() {
    const {getItem, removeItem} = useStorage();

    const [cards, setCards] = useState<CardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showNewCard, setShowNewCard] = useState<boolean>(false);
    const [isSubmitted, setSubmitted] = useState(false);
    const token = getItem('token');
    const router = useRouter();

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_API_URL}/blog`);
                const data = await response.json();
                setCards(data.blogs);
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
                    className='mt-[20px] mb-[18px] w-[179px] lg:w-[250px] xl:w-[600px] xl:mt-[28px] xl:mb-[32px]'
                    src="/images/imagen-temas-interes.webp"
                    alt="Imagen Únete al Equipo"
                />
                <p className="font-light text-[20px] md:text-[40px] xl:text-[60px] xl:leading-tight">
                    TEMAS DE <span className="font-bold">INTERÉS</span>
                </p>
                <div
                    className="mx-auto flex items-center nav-border-gradient mt-[15px] w-[176px] xl:mt-[22px] lg:w-[140px] xl:w-[542px]"></div>
                <p className="mx-[35px] mt-[19px] mb-[22px] text-[12px] font-normal text-center
                                md:mb-[120px] md:mx-[150px] md:text-[22px] xl:mt-[68px] xl:text-[33px] xl:mb-[105px] xl:mx-[430px] xl:leading-tight">
                    Aquí encontraras información relevante sobre algunos temas de interés relacionados con la analítica
                    de datos, su importancia, características y uso dentro de las organizaciones.
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
                className="flex flex-wrap flex-col w-full items-center mb-[68px] gap-[40px] xl:gap-[60px] 2xl:px-40 xl:mb-[178px] xl:mt-[32px] md:flex-row md:justify-center"
            >
                {showNewCard && (
                    <Card
                        id={0}
                        title=""
                        description=""
                        image=""
                        link=""
                        date=""
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
                        description={card.description}
                        link={card.link}
                        date={card.updatedAt}
                        image={card.image}
                        isSubmitted={isSubmitted}
                        onSubmitted={setSubmitted}
                        token={token}
                        onShow={setShowNewCard}
                    />
                ))}
            </section>
        </div>
    )
};

export default function TopicsPage() {
    return (
        <Suspense>
            <Topics/>
        </Suspense>
    )
}
