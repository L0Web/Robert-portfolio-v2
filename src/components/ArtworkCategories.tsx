"use client";
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";

import { QueryResult } from "@/types";
import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { VscRefresh } from "react-icons/vsc";

import Category from "./Category";
import CategoryAlt from "./CategoryAlt";
import { useFetch } from "@/utils/hook";


const BACKEND_URI = process.env.NEXT_PUBLIC_API_URI;

function LoadingCategories() {
    return (
        <div className="flex items-center justify-center">
            <span className="animate-rotate relative w-8 lg:w-10 h-8 lg:h-10 rounded-full border border-gray-400 dark:border-white/20">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 w-2 aspect-square rounded-full border border-gray-400 dark:border-white/20" />
                <span className="absolute top-1/2 right-2 -translate-y-1/2 w-2 aspect-square rounded-full border border-gray-400 dark:border-white/20" />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 aspect-square rounded-full border border-gray-400 dark:border-white/20" />
                <span className="absolute top-1/2 left-2 -translate-y-1/2 w-2 aspect-square rounded-full border border-gray-400 dark:border-white/20" />
            </span>
        </div>
    )
};

function Error ({ refetch }: { refetch: () => void; }) {
    return (
        <div className="flex items-center justify-center">
            <button onClick={refetch} className="h-10 flex gap-2 items-center justify-center px-6 rounded-full border border-red-400 dark:bg-red-800/50 dark:border-transparent text-red-500 dark:text-red-200 hover:bg-red-500 hover:border-red-500 hover:text-white">
                <VscRefresh size={16} />
                <span className="text-sm tracking-tight">Retry</span>
            </button>
        </div>
    )
}

function ArtworkCategories() {
    const searchParams = useSearchParams();
    const selectedCategories = useMemo(() => searchParams.get('categories') || "", [searchParams]);
    const [showMore, setShowMore] = useState(false);

    const { loading, error, data, refetch } = useFetch<QueryResult>(`${BACKEND_URI}/robert/categories`);

    if (loading) return <LoadingCategories />
    else if (error) return <Error refetch={refetch} />
    else return (
        <div className="relative">
            <ul className="w-fit flex gap-1 h-10 sm:h-8 lg:h-10 group-has-[.carousel:hover]:opacity-0 group-has-[.carousel:hover]:delay-200 transition-opacity duration-300 ease-expo rounded-full p-[2px] lg:p-1 sm:border sm:border-gray-300/50 sm:dark:border-white/20">
                <li className="hidden sm:block">
                    <Link 
                        href="/artworks"
                        onClick={() => setShowMore(false)}
                        className="w-full max-w flex items-center justify-center gap-1 h-full rounded-full bg-black/5 dark:bg-white/5 text-gray-600 dark:text-white/50 px-4 tracking-tight hover:bg-black/10 dark:hover:bg-white/10"
                    >
                        <span className="text-xs whitespace-nowrap">All Works</span>
                    </Link>
                </li>
                {
                    data
                        ?.categories
                        ?.slice()
                        ?.sort((category) => selectedCategories.includes(category._id) ? -1 : 1)
                        ?.slice(0, 2)
                        ?.map((category) => (
                            <li key={category._id} className="hidden sm:block">
                                <Category {...category} closeDialog={() => setShowMore(false)} selectedCategories={selectedCategories} />
                            </li>
                        ))
                }
                <li className="flex">
                    <button onClick={() => setShowMore(!showMore)}  className="group flex text-black dark:text-white/80">
                        <span className="flex items-center justify-center h-full rounded-full px-3 bg-gray-300/70 dark:bg-white/20 group-hover:bg-gray-300/50 dark:group-hover:bg-white/10">
                            <span className="hidden sm:block text-xs whitespace-nowrap">{showMore ? 'Less Categories' : 'More Categories'}</span>
                            <span className="block sm:hidden text-xs whitespace-nowrap px-2">Categories</span>
                        </span>
                        <span className={`${showMore ? 'rotate-180' : ''} transition-transform ease-expo duration-300 h-full aspect-square rounded-full bg-gray-300/70 dark:bg-white/20 flex items-center justify-center group-hover:bg-gray-300/50 dark:group-hover:bg-white/10`}>
                            <FiChevronDown size={14} />
                        </span>
                    </button>
                </li>
            </ul>
            <div className={`${showMore ? '' : 'scale-y-50 scale-x-75 opacity-0'} origin-top transition-[transform,_opacity] ease-expo duration-500 absolute top-[calc(100%_+_6px)] left-1/2 -translate-x-1/2 w-fit min-w-full rounded-[20px] bg-gray-200 dark:bg-[#202020] border border-gray-300/50 dark:border-white/20`}>
                <div className={`${showMore ? 'delay-200' : 'opacity-0'} origin-top transition-[opacity] ease-expo duration-500 flex flex-col gap-4 p-4`}>
                    <span className="hidden sm:flex items-center gap-2 rounded-full px-2 bg-gray-300/30 dark:bg-white/10 text-gray-600 dark:text-white/50">
                        <BiSearch size={16} />
                        <input type="text" placeholder="Search categories..." className="flex-1 bg-transparent focus:outline-none h-8 text-xs tracking-tight placeholder:text-gray-400 dark:placeholder-white/40" />
                    </span>
                    <ul className="flex flex-wrap gap-2">
                        {
                            data
                                ?.categories
                                ?.slice()
                                ?.sort((category) => selectedCategories.includes(category._id) ? -1 : 1)
                                ?.map((category) => (
                                    <li key={category._id} className="flex-1">
                                        <CategoryAlt {...category} closeDialog={() => setShowMore(false)} selectedCategories={selectedCategories} />
                                    </li>
                                ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default function SuspensedArtworkCategories() {
    return (
        <Suspense>
            <ArtworkCategories />
        </Suspense>
    )
}