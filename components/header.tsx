"use client";
import {useState} from "react";
import { usePathname } from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import { useStorage } from "@/hooks/useStorage";
import LogoutSVG from "./logout-svg";

export default function Header() {
    const { removeItem } = useStorage();

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

    const handleLogout = () => {
        document.cookie = "token=; path=/; max-age=0";
        window.location.href = "/";
    };

    return (
        <header>
            <nav
                className={`fixed top-0 left-0 w-full bg-[#F1F1F3] ${!isOpen ? "border-b-4 nav-border-gradient" : ""} z-10`}>
                <div
                    className="container max-w-full h-[44px] md:h-[55px] lg:h-[100px] p-4 lg:mx-auto flex items-center justify-between px-12 lg:px-8 xl:px-20 2xl:px-28">
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
                            width={108}
                            height={58}
                            className="hidden lg:block xl:hidden"
                        />

                        <img
                            src="/images/logo-tibs.webp"
                            alt="Logo Tibs"
                            width={138}
                            height={58}
                            className="hidden xl:block"
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

                    {
                        pathname !== "/" && (
                            <div className="flex items-center">
                                <ul className="border-r-[1px] pr-2 border-gray-300 hidden h-[48px] lg:flex items-end space-x-7 xl:space-x-10 2xl:space-x-14 text-[#808080] font-medium">
                                    {[
                                        { name: "Temas de interés", path: "/topics" },
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

                                <div className="hidden lg:flex h-[48px] items-end ml-4">
                                    <button
                                        className="flex items-center text-[#808080] font-medium text-lg"
                                        onClick={handleLogout}
                                    >
                                        <span className="pr-1 font-medium">Logout</span>
                                        <LogoutSVG  />
                                    </button>
                                </div>
                            </div>
                        )
                    }


                </div>

                {(isOpen && pathname !== "/") && (
                    <AnimatePresence>
                        {isAnimating && (
                            <>
                                <button
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
                                        <Link href="/" className="hover:text-[#00178F] flex items-center"
                                           onClick={() => {
                                                removeItem("token");
                                                setIsOpen(false);
                                            }
                                           }>
                                            <span className="text-sm pr-1">Logout</span>
                                            <LogoutSVG  />

                                        </Link>
                                    </div>

                                    <a href="tel:52 (81) 1972 . 5300">
                                        <img
                                            src="/icons/icono-telefono.webp"
                                            alt="Icono telefono"
                                            width={40}
                                            height={40}
                                            className="mt-[44px] img-shadow cursor-pointer"
                                        />
                                    </a>

                                    <a href="tel:52 (81) 1972 . 5300" className="text-[#00178F] font-bold text-sm">Monterrey {" "}
                                        <span className="cursor-pointer text-[#808080] font-bold text-sm">+52 81 1972. 5300</span>
                                    </a>
                                    <a href="mailto:info@tibs.com.mx" className="cursor-pointer text-[#808080] font-bold text-sm">info@tibs.com.mx</a>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                )}
            </nav>
        </header>
    )
};
