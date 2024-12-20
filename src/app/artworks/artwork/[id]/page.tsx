"use client";

import { useRef } from "react";
import Image from "next/image";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoMdExpand } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";

import ImageViewer from "@/components/ImageViewer";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import Link from "next/link";
import FetchHandler from "@/components/LoadingAndErrorContainer";
import RelatedArtworks from "@/components/RelatedArtworks";
import { QueryResult } from "@/types";

const FETCH_QUERY = gql`
  query($id: ID) {
    artwork(where: { id: $id }) {
      id
      title
      desc
      categories {
        id
        name
      }
      images {
        id
        image {
          publicUrl
        }
      }
      name
      role
      platform
      url_link
      createdAt
    }
  }
`;


export default function Project() {
  const { id } = useParams();

  const { loading, error, data } = useQuery<QueryResult>(FETCH_QUERY, { 
    variables: { id }
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => dialogRef.current?.show();
  const closeDialog = () => dialogRef.current?.close();

  return (
    <FetchHandler loading={loading} error={error}>
        <div className="min-h-screen max-w-[var(--max-width)] m-auto">
          <ImageViewer images={data?.artwork?.images} ref={dialogRef} closeDialog={closeDialog} />
            <section className="relative flex flex-col gap-4 pt-4 pb-6 px-2 lg:px-6 mb-6">
                <ul className="h-[320px] lg:h-[60vh] min-h-[400px] flex gap-4 justify-center">
                    {
                        data?.artwork?.images?.slice(0, 3)?.map(({ id, image }, index) => (
                            <li key={id} className="relative h-full">
                                <div className="relative h-full">
                                    <Image width={1024} height={1024} src={image.publicUrl} alt={`${data?.artwork?.title} image ${index}`} className="object-cover h-full w-auto rounded-lg" />
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div className="flex justify-between gap-4 items-center">
                    <span className="flex items-center justify-center h-8 px-4 rounded-full border border-gray-400">
                        <GoArrowLeft size={18} />
                    </span>
                    <button onClick={openDialog} className="flex items-center justify-center p-1 pr-4 gap-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-300 hover:border-gray-300">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300">
                            <IoMdExpand size={16} />
                        </span>
                        <span className="text-sm tracking-tight">Expand images</span>
                    </button>
                    <span className="flex items-center justify-center h-8 px-4 rounded-full border border-gray-400">
                        <GoArrowRight size={18} />
                    </span>
                </div>
            </section>
            <section className="m-auto flex flex-col-reverse md:flex-row justify-start gap-20 mb-20 px-2 lg:px-6">
                <div className="flex flex-col gap-4 md:w-[320px]">
                    <h3 className="text-3xl tracking-tight">Artwork Details</h3>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl tracking-tight">Date</h4>
                        <p className="text-sm text-gray-600"><span className="font-geist">1</span>st December <span className="font-geist">2024</span></p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl tracking-tight">Meta</h4>
                        <p className="flex gap-1 flex-wrap text-sm text-gray-600">
                          <span>Categories — </span>
                          {
                            data?.artwork?.categories.map(({ id, name }, index) => (
                              <Link href={`/artworks?categories=${id}`} key={id} className="hover:underline">
                                {name}{index < data?.artwork?.categories.length - 1 ? "," : ""}
                              </Link>
                            ))
                          }
                        </p>
                        <p className="text-sm text-gray-600">Collection (<span className="font-geist">{data?.artwork?.images?.length || 0}</span> image{data?.artwork?.images?.length !== 1 ? '' : ''})</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl tracking-tight">Client</h4>
                        <p className="text-sm text-gray-600">{data?.artwork?.name} — <span className="text-black">{data?.artwork?.role}</span></p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl tracking-tight">Platform</h4>
                        <p className="text-sm text-gray-600">Posted on <span className="text-black">{data?.artwork?.platform || "Unknown"}</span></p>
                        <a className="h-10 rounded-full border border-gray-400 flex items-center justify-center gap-2 px-8 min-w-[200px] w-fit" href={data?.artwork.url_link || "#"}>
                            <span className="text-xs tracking-tight">View Post</span>
                            <MdOutlineArrowOutward size={16} />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-6">
                        <h2 className="max-w-[45ch] text-4xl tracking-tight">{data?.artwork?.title}</h2>
                        <p className="text-sm text-gray-600 max-w-[120ch]">
                          {
                            data
                            ?.artwork
                            ?.desc
                            ?.replace("\n", " _space_ ")
                            ?.split(" ")
                            ?.map((characters, index) => (
                                characters.includes('_space_') ?
                                    <>
                                    <br key={(characters + Math.round(Math.random() * 1000))} />
                                    <br key={(characters + Math.round(Math.random() * 1000))} /> 
                                    </> :
                                    /[a-z0-9-]+@[a-z]+.[a-z]+/.test(characters) ?
                                        <a key={index} href={`https://${characters}`} className="underline" target="_blank">{characters}</a> :
                                        `${characters} `
                            ))
                          }
                        </p>
                    </div>
                </div>
            </section>
            <RelatedArtworks id={id} categories={data?.artwork?.categories || []} />
        </div>
      </FetchHandler>
    )
}