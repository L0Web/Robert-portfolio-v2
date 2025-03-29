"use client";

import { Suspense, useContext, useEffect, useMemo, useState } from "react";

import FetchHandler from "./LoadingAndErrorContainer";
import Artwork from "./Artwork";

import { Artwork as ArtworkType, QueryResult } from "@/types";
import { useSearchParams } from "next/navigation";

import { motion } from "framer-motion";
import { globalLoadingContext } from "@/utils/globalLoadingContext";
import { useFetch } from "@/utils/hook";


const BACKEND_URI = process.env.NEXT_PUBLIC_API_URI;

function Artworks() {
  const limit = 10;

  const searchParams = useSearchParams();
  const { isLoadingGlobally, startLoading, endLoading } = useContext(globalLoadingContext);

  const categoriesFilter = useMemo(() => searchParams.get("categories"), [searchParams]);

  const [page, setPage] = useState(0);
  const skip = useMemo(() => limit * page, [page]);

  const { loading, error, data, refetch } = useFetch<QueryResult>(`${BACKEND_URI}/robert/artworks?${limit}&page=${page}&filter=${categoriesFilter ? categoriesFilter : ''}`);

  const [prevArtworks, setPrevArtworks] = useState<ArtworkType[]>([]);
  const prevArtworkIds = useMemo(() => prevArtworks.map(({ _id }) => _id), [prevArtworks]);
  const artworks = useMemo<ArtworkType[]>(() => [
    ...prevArtworks, 
    ...(
        data
          ?.artworks
          ?.filter(({ _id }) => !prevArtworkIds.includes(_id)) || []
    )
  ], [data, prevArtworks, prevArtworkIds]);

  const triggerNextPageFetch = () => {
    const triggerFetch = !loading && (skip + limit) < Number(data?.artworksCount);
    if(!triggerFetch) return;
    setPage(page + 1);
  };

  useEffect(() => {
    if(!loading && isLoadingGlobally) endLoading();
    else if(loading && !isLoadingGlobally) startLoading("Loading more...");
  }, [isLoadingGlobally, loading, endLoading, startLoading]);

  useEffect(() => {
    setPage(/\D/.test(String(searchParams.get('page'))) ? 0 : Number(searchParams.get('page')))
  }, [searchParams]);

  useEffect(() => {
    setPage(0);
    setPrevArtworks([]);
  }, [categoriesFilter]);

  useEffect(() => {
    if(!data?.artworks?.length || data?.artworks?.some(({ _id }) => prevArtworkIds.includes(_id))) return;

    const newValues = [...prevArtworks, ...data.artworks];
    setPrevArtworks(newValues);
  }, [data, prevArtworks, prevArtworkIds]);
  
  return (
    <FetchHandler 
      isEmpty={Boolean(!data?.artworks?.length && typeof data?.artworks?.length === 'number')} 
      loading={loading} 
      loadOnce={true} 
      error={Boolean(error)} 
      refetch={refetch}
    >
      <ul
        className="px-2 lg:px-4 mb-[64px] column-count-1 md:column-count-3"
      >
          {
              artworks.map((artwork) => (
                artwork.images.length >= 1 ?
                  <Artwork {...artwork} key={artwork._id} /> :
                  null
              ))
          }
      </ul>
      {!loading ? <motion.span className="opacity-0" onViewportEnter={triggerNextPageFetch}></motion.span> : null}
    </FetchHandler>
  )
};


export default function SuspensedArtworks() {
  return (
    <Suspense>
      <Artworks />
    </Suspense>
  )
}