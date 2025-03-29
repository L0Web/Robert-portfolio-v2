import { useEffect, useRef, useState } from "react";
import { VscRefresh } from "react-icons/vsc";



export default function Loading({ text, refetch }: { text: string; refetch?: (() => void) | undefined }) {
    const [isTakingTooLong, setIsTakingTooLong] = useState(false);
    const timeout = useRef<NodeJS.Timeout>(null);

    const handleClick = () => {
        if(!timeout.current || !refetch) return;
        clearTimeout(timeout.current);
        setIsTakingTooLong(false);
        refetch();
    }

    useEffect(() => {
        if(!refetch) return;
        timeout.current = setTimeout(() => setIsTakingTooLong(true), 5000);
    }, [isTakingTooLong]);

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <span className="animate-rotate relative w-12 h-12 rounded-full border border-gray-400 dark:border-white/60">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 w-2 aspect-square rounded-full border border-gray-400 dark:border-white/60" />
                <span className="absolute top-1/2 right-2 -translate-y-1/2 w-2 aspect-square rounded-full border border-gray-400 dark:border-white/60" />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 aspect-square rounded-full border border-gray-400 dark:border-white/60" />
                <span className="absolute top-1/2 left-2 -translate-y-1/2 w-2 aspect-square rounded-full border border-gray-400 dark:border-white/60" />
            </span>
            {
                refetch ?
                <>
                    <span className={`${isTakingTooLong ? 'mt-4' : ''} text-gray-400 dark:text-white/50 tracking-tight text-center`}>{isTakingTooLong ? "Request is taking a long time to load" : text}</span>
                    {
                        isTakingTooLong ?
                            <button className="h-10 flex items-center justify-center gap-2 px-8 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-500 dark:text-white/60 hover:text-gray-600 dark:hover:text-white/80" onClick={handleClick}>
                                <VscRefresh size={16} />
                                <span className="text-sm tracking-tight">Refresh</span>
                            </button> :
                            null
                    }
                </> :
                null
            }
        </div>
    )
}