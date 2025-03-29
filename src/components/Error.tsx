import { VscRefresh } from "react-icons/vsc";


export default function ErrorFetching({ text, refetch }: { text: string; refetch: (() => void) | undefined }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-[4rem] font-semibold text-gray-500 dark:text-white/80">Oops!</h3>
            <p className="text-base tracking-tight text-gray-400 dark:text-white/50 mt-4">{text}</p>
            {
                refetch ?
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-base tracking-tight text-gray-400 dark:text-white/50">Click the button below to retry</p>
                    <button onClick={() => refetch()} className="flex items-center justify-center gap-2 px-8 h-10 rounded-full bg-red-500 dark:bg-red-600 text-white dark:text-red-100 hover:bg-red-600 dark:hover:bg-red-800 transition-[background-color] hover:text-white">
                        <VscRefresh size={16} />
                        <span className="text-sm tracking-tight">Reload</span>
                    </button>
                </div> :
                null
            }
        </div>
    )
}