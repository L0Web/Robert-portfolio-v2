"use client";

import { QueryResult } from "@/types";
import { ApolloQueryResult, gql, OperationVariables, useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import Category from "./Category";
import CategoryAlt from "./CategoryAlt";
import Link from "next/link";
import { VscRefresh } from "react-icons/vsc";

const FETCH_QUERY = gql`
    query {
        categories {
            id
            name
        }
    }
`;

function LoadingCategories() {
    return (
        <div className="flex items-center justify-center">
            <span className="animate-rotate relative w-8 lg:w-10 h-8 lg:h-10 rounded-full border border-gray-400">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 w-2 aspect-square rounded-full border border-gray-400" />
                <span className="absolute top-1/2 right-2 -translate-y-1/2 w-2 aspect-square rounded-full border border-gray-400" />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 aspect-square rounded-full border border-gray-400" />
                <span className="absolute top-1/2 left-2 -translate-y-1/2 w-2 aspect-square rounded-full border border-gray-400" />
            </span>
        </div>
    )
};

function Error ({ refresh }: { refresh: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<QueryResult>>; }) {
    return (
        <div className="flex items-center justify-center">
            <button onClick={refresh} className="h-8 lg:h-10 flex gap-2 items-center justify-center px-6 rounded-full border border-red-400 text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white">
                <VscRefresh size={16} />
                <span className="text-sm tracking-tight">Retry</span>
            </button>
        </div>
    )
}

export default function ArtworkCategories() {
    const searchParams = useSearchParams();
    const selectedCategories = useMemo(() => searchParams.get('categories') || "", [searchParams]);
    const [showMore, setShowMore] = useState(false);

    const { loading, error, data, refetch } = useQuery<QueryResult>(FETCH_QUERY);

    if(loading) return <LoadingCategories />
    else if(error) return <Error refresh={refetch} />
    else return (
        <div className="relative">
            <ul className="w-fit flex gap-1 h-10 sm:h-8 lg:h-10 group-has-[.carousel:hover]:opacity-0 group-has-[.carousel:hover]:delay-200 transition-opacity duration-300 ease-expo rounded-full p-[2px] lg:p-1 sm:border sm:border-gray-400/60">
                <li className="hidden sm:block">
                    <Link 
                        href="/artworks"
                        onClick={() => setShowMore(false)}
                        className="w-full max-w flex items-center justify-center gap-1 h-full rounded-full bg-black/5 text-gray-600 px-4 tracking-tight hover:bg-black/10"
                    >
                        <span className="text-xs whitespace-nowrap">All Works</span>
                    </Link>
                </li>
                {
                    data
                        ?.categories
                        ?.slice()
                        ?.sort((category) => selectedCategories.includes(category.id) ? -1 : 1)
                        ?.slice(0, 2)
                        ?.map((category) => (
                            <li key={category.id} className="hidden sm:block">
                                <Category {...category} closeDialog={() => setShowMore(false)} selectedCategories={selectedCategories} />
                            </li>
                        ))
                }
                <li className="flex">
                    <button onClick={() => setShowMore(!showMore)}  className="flex">
                        <span className="border flex items-center justify-center h-full rounded-full border-gray-400/60 text-black px-3">
                            <span className="hidden sm:block text-xs whitespace-nowrap">{showMore ? 'Less Categories' : 'More Categories'}</span>
                            <span className="block sm:hidden text-xs whitespace-nowrap px-2">Categories</span>
                        </span>
                        <span className={`${showMore ? 'rotate-180' : ''} transition-transform ease-expo duration-300 h-full aspect-square rounded-full border border-gray-400/60 flex items-center justify-center`}>
                            <FiChevronDown size={14} />
                        </span>
                    </button>
                </li>
            </ul>
            <div className={`${showMore ? '' : 'scale-y-50 scale-x-75 opacity-0'} origin-top transition-[transform,_opacity] ease-expo duration-500 absolute top-[calc(100%_+_6px)] left-0 w-full rounded-[20px] bg-gray-200 border border-gray-400/60`}>
                <div className={`${showMore ? 'delay-200' : 'opacity-0'} origin-top transition-[opacity] ease-expo duration-500 flex flex-col gap-4 p-4`}>
                    <span className="hidden sm:flex items-center gap-2 rounded-full px-2 bg-gray-300 text-gray-600">
                        <BiSearch size={16} />
                        <input type="text" placeholder="Search categories..." className="flex-1 bg-transparent focus:outline-none h-8 text-xs tracking-tight placeholder:text-gray-400" />
                    </span>
                    <ul className="flex flex-wrap gap-2">
                        {
                            data
                                ?.categories
                                ?.slice()
                                ?.sort((category) => selectedCategories.includes(category.id) ? -1 : 1)
                                ?.map((category) => (
                                    <li key={category.id} className="flex-1">
                                        <CategoryAlt {...category} closeDialog={() => setShowMore(false)} selectedCategories={selectedCategories} />
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}