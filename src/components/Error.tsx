import { QueryResult } from "@/types";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { VscRefresh } from "react-icons/vsc";


export default function ErrorFetching({ text, refetch }: { text: string; refetch: ((variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<QueryResult>>) | undefined }) {
    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-[4rem] font-semibold text-gray-500">Oops!</h3>
            <p className="text-base tracking-tight text-gray-400 mt-4">{text}</p>
            {
                refetch ?
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-base tracking-tight text-gray-400">Click the button below to retry</p>
                    <button onClick={() => refetch()} className="flex items-center justify-center gap-2 px-8 h-10 rounded-full border bg-red-500 text-white hover:bg-red-600 hover:border-red-600 hover:text-white">
                        <VscRefresh size={16} />
                        <span className="text-sm tracking-tight">Reload</span>
                    </button>
                </div> :
                null
            }
        </div>
    )
}