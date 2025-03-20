import type {Metadata} from "next";
import {Lato} from "next/font/google";
import Header from "@/components/header";
import "./globals.css";

const lato = Lato({
    variable: "--font-lato",
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
    fallback: []
});

export const metadata: Metadata = {
    title: "TIBS",
    description: "Tibs",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es-MX">
            <body className={`${lato.variable} antialiased flex flex-col min-h-screen`}>
                <Header/>
                <main className="flex-grow pt-11 lg:pt-[133px]">{children}</main>
            </body>
        </html>
    );
}
