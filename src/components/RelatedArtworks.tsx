"use client";

import Artwork from "./Artwork";
import FetchHandler from "./LoadingAndErrorContainer";

import { Category, QueryResult } from "@/types";
import { useFetch } from "@/utils/hook";


const BACKEND_URI = process.env.NEXT_PUBLIC_API_URI;

export default function RelatedArtworks({ id, categories }: { id: string | string[] | undefined; categories: Category[] }) {
    const { loading, error, data } = useFetch<QueryResult>(`${BACKEND_URI}/robert/artworks/related/${id}?filter=${categories?.join(" ")}`);

    return (
        <FetchHandler loading={loading} error={Boolean(error)}>
            <section className="mx-2 lg:mx-4 m-6 mb-8 rounded-xl lg:rounded-[30px] px-2 pt-4 md:pt-8 md:p-6 pb-4 flex flex-col gap-6 md:gap-8 bg-gray-300 dark:bg-white/5">
                <h2 className="tracking-tight text-2xl lg:text-4xl dark:text-white/80">Other Artworks</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {
                        data?.artworks?.slice(0, 6)?.map((artwork) => (
                            <Artwork key={artwork._id} {...artwork} isRelated />
                        ))
                    }
                </ul>
            </section>
        </FetchHandler>
    )
}