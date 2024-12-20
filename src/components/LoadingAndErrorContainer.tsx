
import { ApolloError, ApolloQueryResult, OperationVariables } from "@apollo/client";
import ErrorFetching from "./Error";
import Loading from "./Loading";

import { QueryResult } from "@/types";
import { useRef } from "react";
import Empty from "./Empty";

type Props = { 
    isEmpty?: boolean;
    emptyText?: string;
    loading: boolean; 
    loadOnce?: boolean; 
    loadingText?: string; 
    error: ApolloError | undefined; 
    errorText?: string; 
    children: React.ReactNode; 
    refetch?: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<QueryResult>> 
};


export default function FetchHandler({ isEmpty, emptyText, loading, loadOnce, loadingText, error, errorText, children, refetch }: Props) {
    const hasLoadedOnce = useRef<boolean>(false);

    if (loading && !hasLoadedOnce.current) {
        if(loadOnce) hasLoadedOnce.current = true;

        return (
            <div className="h-[calc(100vh_-_100px)] flex items-center justify-center">
                <Loading refetch={refetch} text={loadingText || "Please wait..."} />
            </div>
        )
    } 
    else if (!loading && isEmpty) {
        return (
            <div className="h-[calc(100vh_-_100px)] flex items-center justify-center">
                <Empty text={emptyText || "No resources could be found."} />
            </div>
        )
    }
    else if (error) {
        return (
            <div className="h-[calc(100vh_-_100px)] flex items-center justify-center">
                <ErrorFetching refetch={refetch} text={errorText || "Something went wrong while fetching data"} />
            </div>
        )
    }
    else return children;
}