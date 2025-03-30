"use client";

import { Suspense, useContext, useEffect, useMemo, useRef, useState } from "react";

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
  const [loadOnce, setLoadOnce] = useState(false);

  const searchParams = useSearchParams();
  const { isLoadingGlobally, startLoading, endLoading } = useContext(globalLoadingContext);

  const categoriesFilter = useMemo(() => searchParams.get("categories"), [searchParams]);

  const [page, setPage] = useState(0);
  const prevArtworks = useRef<ArtworkType[]>([]);

  const { loading, error, data, refetch } = useFetch<QueryResult>(`${BACKEND_URI}/robert/artworks?${limit}&page=${page}&filter=${categoriesFilter ? categoriesFilter : ''}`);

  const artworks = useMemo<ArtworkType[]>(() => {
    if(page <= 0) prevArtworks.current = [];

    const prevArtworkIds = prevArtworks.current.map(({ _id }) => _id);
    const filteredFetchedData = data?.artworks ? data?.artworks?.filter(({ _id }) => !prevArtworkIds.includes(_id)) : [];
    prevArtworks.current = [
      ...prevArtworks.current, 
      ...filteredFetchedData
    ];

    return prevArtworks.current;
  }, [data, page, prevArtworks])

  const triggerNextPageFetch = () => {
    const triggerFetch = !loading && (limit * (page + 1)) < Number(data?.total);
    if(!triggerFetch) return;
    setPage(page + 1);
  };

  useEffect(() => { 
    if(!loading) setLoadOnce(true);
  }, [loading]);

  useEffect(() => {
    setPage(0);
    setLoadOnce(false);
  }, [categoriesFilter]);

  useEffect(() => {
    if(!loading && isLoadingGlobally) endLoading();
    else if(loading && !isLoadingGlobally) startLoading("Loading more...");
  }, [isLoadingGlobally, loading, endLoading, startLoading]);

  useEffect(() => {
    setPage(Number(searchParams.get('page')) >= 0 ? Number(searchParams.get('page')) : 0);
  }, [searchParams]);
  
  return (
    <FetchHandler 
      isEmpty={artworks.length < 1} 
      loading={loading}
      loadOnce={loadOnce} 
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