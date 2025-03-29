import { useEffect, useState } from "react";

type Result<K> = {
    loading: boolean;
    error: string;
    data: K;
    refetch: () => void;
}

export function useFetch<Data>(url: string, option?: RequestInit): Result<Data | null> {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState<Data | null>(null);
    const [retry, setRetry] = useState(false);

    const refetch = () => setRetry(!retry);

    useEffect(() => {
        async function fetchData(url: string) {
            try {
                setLoading(true);
                const response = await fetch(url, option);
                const result = await response.json();

                if(response.status !== 200) throw result;
                setData(result);
            } catch (error) {
                const message = (error as Error).message;
                console.error(message);
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(url);
    }, [retry, url, option]);

    return { loading, error, data, refetch };
}