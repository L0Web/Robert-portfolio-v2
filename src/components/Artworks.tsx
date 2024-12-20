"use client";

import { Suspense, useContext, useEffect, useMemo, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import FetchHandler from "./LoadingAndErrorContainer";
import Artwork from "./Artwork";

import { Artwork as ArtworkType, QueryResult } from "@/types";
import { useSearchParams } from "next/navigation";

import { motion } from "framer-motion";
import { globalLoadingContext } from "@/utils/globalLoadingContext";

const FETCH_QUERY = gql`
  query ($where: ArtworkWhereInput, $skip: Int, $limit: Int) {
    artworks(where: $where, take: $limit, skip: $skip) {
      id
      title
      categories {
        id
        name
      }
      images {
        image {
          id
          publicUrl
        }
      }
    }
    artworksCount(where: $where)
  }
`;

function Artworks() {
  const limit = 10;

  const searchParams = useSearchParams();
  const { isLoadingGlobally, startLoading, endLoading } = useContext(globalLoadingContext);

  const categoriesFilter = useMemo(() => searchParams
    .get("categories")
    ?.split(" ")
    ?.filter(categoryId => categoryId)
    ?.map((categoryId) => ({
      categories: {
        some: {
          id: {
            equals: categoryId
          }
        }
      }
    }))
  , [searchParams]);

  const [page, setPage] = useState(0);

  const skip = useMemo(() => limit * page, [page]);
  const { loading, error, data, refetch } = useQuery<QueryResult>(FETCH_QUERY, {
    variables: 
      {
        where: (categoriesFilter?.length ?
          {
            AND: categoriesFilter,
            NOT: { 
              categories: {
                none: {}
              }
            }
          } :
          {
            categories: { some: {} }
          }
        ),
        limit,
        skip
      }
  });
  const [prevArtworks, setPrevArtworks] = useState<ArtworkType[]>([]);
  const prevArtworkIds = useMemo(() => prevArtworks.map(({ id }) => id), [prevArtworks]);
  const artworks = useMemo<ArtworkType[]>(() => [
    ...prevArtworks, 
    ...(
        data
          ?.artworks
          ?.filter(({ id }) => !prevArtworkIds.includes(id)) || []
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
    if(!data?.artworks?.length || data?.artworks?.some(({ id }) => prevArtworkIds.includes(id))) return;

    const newValues = [...prevArtworks, ...data.artworks];
    setPrevArtworks(newValues);
  }, [data, prevArtworks, prevArtworkIds]);
  
  return (
    <FetchHandler 
      isEmpty={Boolean(!data?.artworks?.length && typeof data?.artworks?.length === 'number')} 
      loading={loading} 
      loadOnce={true} 
      error={error} 
      refetch={refetch}
    >
      <ul
        className="px-2 lg:px-4 mb-[64px] column-count-1 md:column-count-3"
      >
          {
              artworks.map((artwork) => (
                artwork.images.length >= 1 ?
                  <Artwork {...artwork} key={artwork.id} /> :
                  null
              ))
          }
      </ul>
      {!loading ? <motion.span className="opacity-0" onViewportEnter={triggerNextPageFetch}></motion.span> : null}
    </FetchHandler>
  )
};


export default function ArtworksComponentExport() {
  return (
    <Suspense>
      <Artworks />
    </Suspense>
  )
}