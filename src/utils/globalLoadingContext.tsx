import { createContext, useState } from "react";

type LoadingContext = {
    isLoadingGlobally: boolean;
    loadingText: string;
    startLoading: (text: string) => void;
    endLoading: () => void;
}

export const globalLoadingContext = createContext<LoadingContext>({
    isLoadingGlobally: false,
    loadingText: "",
    startLoading: () => null,
    endLoading: () => null
});

export function GlobalLoadingContextProvider ({ children }: { children: React.ReactNode }) {
    const [loadingValues, setLoadingValues] = useState({
        isLoadingGlobally: false,
        loadingText: ""
    });

    const startLoading = (loadingText: string) => setLoadingValues({ isLoadingGlobally: true, loadingText });
    const endLoading = () => setLoadingValues({ isLoadingGlobally: false, loadingText: "" });

    return (
        <globalLoadingContext.Provider value={{ ...loadingValues, startLoading, endLoading }}>
            {children}
        </globalLoadingContext.Provider>
    )
}