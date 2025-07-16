import { getTokenCookie } from "@/utils/cookie";
import { useEffect, useState } from "react";

export function useAuthToken() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getTokenCookie();
            if (token) setToken(token.value);
        };

        fetchToken();
    }, []);

    return token;
}