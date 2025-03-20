import { useEffect, useState } from "react";

export const useStorage = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Comprobar si estamos en el cliente
        setIsClient(true);
    }, []);

    const getItem = (key: string) => {
        if (isClient && typeof window !== "undefined" && sessionStorage) {
            return sessionStorage.getItem(key);
        }
        return null;
    };

    const setItem = (key: string, value: string) => {
        if (isClient && typeof window !== "undefined" && sessionStorage) {
            sessionStorage.setItem(key, value);
        }
    };

    const removeItem = (key: string) => {
        if (isClient && typeof window !== "undefined" && sessionStorage) {
            sessionStorage.removeItem(key);
        }
    };

    return {
        getItem,
        setItem,
        removeItem
    };
};