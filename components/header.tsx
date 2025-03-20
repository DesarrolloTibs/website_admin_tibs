"use client";
import {useState} from "react";
import { usePathname } from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);
    const pathname = usePathname();

    const handleToggle = () => {
        if (isOpen) {
            setIsAnimating(false);
            setTimeout(() => setIsOpen(false), 300);
        } else {
            setIsOpen(true);
            setIsAnimating(true);
        }
    };

    return (
        <header>
            <nav
                className={`fixed top-0 left-0 w-full bg-[#F1F1F3] ${!isOpen ? "border-b-4 nav-border-gradient" : ""} z-10`}>
                <div
                    className="container max-w-full h-[44px] lg:h-[133px] p-4 lg:mx-auto flex items-center justify-between px-12 xl:px-28">
                    <div className="w-full lg:w-auto flex items-center justify-between">
                        <img
                            src="/images/logo-tibs.webp"
                            alt="Logo Tibs"
                            width={60}
                            height={19}
                            className="block lg:hidden"
                        />

                        <img
                            src="/images/logo-tibs.webp"
                            alt="Logo Tibs"
                            width={138}
                            height={58}
                            className="hidden lg:block"
                        />

                        <button className="lg:hidden ml-auto" onClick={handleToggle}>
                            {!isOpen && (
                                <img
                                    src="/icons/icono-menu-movil.svg"
                                    alt="Icono abrir menú"
                                    width={18}
                                    height={15}
                                />
                            )}
                        </button>
                    </div>

                    <ul className="hidden h-[48px] lg:flex items-end space-x-8 text-[#808080] text-[16px] xl:text-[19px] font-medium">
                        {[
                            { name: "Temas de interés", path: "/topics" },
                            // { name: "Blog", path: "/blog" },
                            { name: "Únete al equipo", path: "/join-us" },
                        ].map((link) => (
                            <li key={link.path}>
                                <Link
                                    href={link.path}
                                    className={`hover:text-[#00178F] relative pb-1 ${
                                        pathname === link.path ? "font-bold border-b-4 nav-border-gradient-active" : ""
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {isOpen && (
                    <AnimatePresence>
                        {isAnimating && (
                            <>
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-25 z-20"
                                    onClick={handleToggle}
                                />
                                <motion.div
                                    initial={{opacity: 0, y: -20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    className="absolute top-0 left-0 w-full bg-[#F1F1F3] flex flex-col items-center py-3 space-y-3 pb-14 text-[14px] border-b-4 nav-border-gradient z-30"
                                >
                                    <button
                                        className="absolute top-4 right-12"
                                        onClick={handleToggle}
                                    >
                                        <img
                                            src="/icons/icono-cerrar-movil.svg"
                                            alt="Icono cerrar menú"
                                            width={18}
                                            height={15}
                                        />
                                    </button>

                                    <div className="pt-[54px] text-[#808080] flex flex-col items-center space-y-[6px]">
                                        <span className="text-[#00178F] font-bold text-[16px]">Menú</span>
                                        <Link href="/topics" className="hover:text-[#00178F]"
                                           onClick={() => setIsOpen(false)}>Temas de interés</Link>

                                        <Link href="/join-us" className="hover:text-[#00178F]"
                                           onClick={() => setIsOpen(false)}>Únete al equipo</Link>
                                    </div>

                                    <div>
                                        <img
                                            src="/icons/icono-telefono.webp"
                                            alt="Icono telefono"
                                            width={40}
                                            height={40}
                                            className="mt-[44px] img-shadow"
                                        />
                                    </div>

                                    <p className="text-[#00178F] font-bold">Monterrey {" "}
                                        <span className="text-[#808080] font-bold">+52 81 1972. 5300</span>
                                    </p>
                                    <span className="text-[#808080] font-bold">info@tibs.com.mx</span>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                )}
            </nav>
        </header>
    )
};
