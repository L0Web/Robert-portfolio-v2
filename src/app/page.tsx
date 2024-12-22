"use client";

import Image from "next/image";

import { gql, useQuery } from "@apollo/client";

import ArtworkCategories from "@/components/ArtworkCategories";
import Artworks from "@/components/Artworks";
import { QueryResult } from "@/types";
import FetchHandler from "@/components/LoadingAndErrorContainer";
import Link from "next/link";

const FETCH_QUERY = gql`
  query {
    artworks(
      where: { 
        highlightArtWork: { equals: true }
      }, 
      take: 5
    ) {
      id
      title
      images(take: 1) {
        id
        image {
          publicUrl
        }
      }
      categories {
        id
        name
      }
    }
    introTexts(take: 1) {
      id
      content
      highlitedWordsInContent
    }
    artworksCount
  }
`;

export default function Home() {
  const { loading, error, data, refetch } = useQuery<QueryResult>(FETCH_QUERY, { 
    variables: { highlightArtWork: true }
  });

  return (
    <FetchHandler loading={loading} error={error} refetch={refetch}>
      <div className="group font-[family-name:var(--font-geist-sans)] m-auto max-w-[var(--max-width)]">
        <section className="lg:mt-[20vh] min-h-[30vh] flex flex-col gap-10 justify-center items-center">
          <p className="text-gray-600 dark:text-white/60 text-center w-full flex-wrap max-w-[45ch] lg:max-w-[60ch] text-xl leading-tight lg:text-2xl">
            {
              data?.introTexts?.map(({ content, highlitedWordsInContent }) => (
                content
                  .split(" ")
                  .map((word, index) => (
                    highlitedWordsInContent.replace(", ", " ").includes(word) ?
                      <span key={index} className='text-black dark:text-white/80'>{`${word} `}</span> :
                      `${word} `
                  ))
              ))
            }
          </p>
          <div className="carousel hidden lg:block relative h-[280px] w-full translate-y-0 scale-50 hover:-translate-y-10 hover:scale-100 transition-transform duration-1000 origin-top ease-expo">
            <div className="absolute p-4 top-0 left-0 w-full h-[480px] overflow-hidden lg:hover:overflow-x-auto flex items-center justify-center gap-4">
              {
                data?.artworks?.slice(0, 5)?.map(({ id, title, images, categories }) => (
                  <Link href={`/artworks/artwork/${id}`} key={title} className="group/child-1 relative flex flex-col h-full pt-4 md:pt-10">
                    <Image src={images[0]?.image?.publicUrl} alt={title} width={1000} height={1000} className="w-full object-cover h-[320px] min-w-[200px] rounded-xl" />
                    <div className="flex justify-between items-center gap-2 mt-2">
                      <h3 className="opacity-0 group-hover/child-1:opacity-100 transition-opacity duration-300 ease-expo text-sm tracking-tighter font-semibold text-black/80 dark:text-white/80 overflow-hidden">{title}</h3>
                      <span className="opacity-0 group-hover/child-1:opacity-100 transition-opacity duration-300 ease-expo text-[.6rem] tracking-tight flex items-center justify-center px-2 h-4 rounded-full bg-black/20 dark:bg-white/10 dark:text-white/50">Details</span>
                    </div>
                    <span className="block overflow-hidden">
                      <span className="text-[.75rem] text-black/60 dark:text-white/50 block translate-y-full group-hover/child-1:translate-y-0 transition-transform duration-500 ease-expo">
                        {
                          categories.map(({ name }) => name).slice(0, 3).join(', ')
                        }
                        {
                          categories.length > 3 ? '...' : null
                        }
                      </span>
                    </span>
                  </Link>
                ))
              }
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-4 group-has-[.carousel:hover]:translate-y-[160px] transition-transform duration-500 ease-expo">
          <div className="flex relative lg:sticky lg:top-2 z-10 w-fit m-auto items-center justify-center">
            <ArtworkCategories />
          </div>
          <Artworks />
        </section>
      </div>
    </FetchHandler>
  );
}
