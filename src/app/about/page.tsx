"use client";

import FetchHandler from "@/components/LoadingAndErrorContainer";
import { QueryResult } from "@/types";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { BiLogoInternetExplorer } from "react-icons/bi";
import { SlSocialBehance, SlSocialInstagram, SlSocialLinkedin, SlSocialTwitter, SlSocialFacebook } from "react-icons/sl";

const FETCH_QUERY = gql`
    query {
        abouts {
            id
            title
            text
        }
        socials {
            id
            platform
            url_link
        }
    }
`;

export default function About() {
    const { loading, error, data, refetch } = useQuery<QueryResult>(FETCH_QUERY);

    return (
        <FetchHandler loading={loading} error={error} refetch={refetch}>
            <div className="relative pt-[10vh] mb-[160px] min-h-screen max-w-[var(--max-width)] m-auto grid grid-cols-1 lg:grid-cols-[320px,_2fr,_320px] gap-2">
                <div className="hidden lg:block w-[320px]">
                    <Image src="/sample_art_works/21.jpg" width={1000} height={1000} alt="Profile picture" className="w-full h-auto rounded-r-xl" />
                </div>
                <div>
                    <section className="flex flex-col gap-20 m-auto w-fit px-2">
                        {
                            data?.abouts?.map(({ id, title, text }) => (
                                <div key={id} className="flex flex-col gap-4">
                                    <h2 className="text-3xl tracking-tight dark:text-white/80">{title}</h2>
                                    <p className="max-w-[60ch] tracking-tight text-xl text-gray-600 dark:text-white/50">
                                        {
                                            text
                                                .replace("\n", " _space_ ")
                                                .split(" ")
                                                .map((characters, index) => (
                                                    characters.includes('_space_') ?
                                                        <>
                                                        <br />
                                                        <br /> 
                                                        </> :
                                                        /[a-z0-9-]+@[a-z]+.[a-z]+/.test(characters) ?
                                                            <a key={index} href={`https://${characters}`} className="underline" target="_blank">{characters}</a> :
                                                            `${characters} `
                                                ))
                                        }
                                    </p>
                                </div>
                            ))
                        }
                        <div className="flex flex-col gap-4">
                            <h2 className="text-3xl tracking-tight dark:text-white/80">Socials</h2>
                            <div className="max-w-[60ch] tracking-tight text-xl text-gray-600 dark:text-white/50 flex gap-4 flex-wrap">
                                {
                                    data?.socials?.map(({ id, platform, url_link }) => (
                                        <a key={id} href={url_link} className="flex-1 flex items-center justify-center h-10 bg-gray-300 dark:bg-white/10 hover:bg-gray-300/50 dark:hover:bg-white/20 rounded-full px-4 gap-3">
                                            <span className="flex items-center justify-center">
                                                {
                                                    platform === "Twitter" ?
                                                        <SlSocialTwitter size={20} /> :
                                                        platform === "Instagram" ?
                                                        <SlSocialInstagram size={20} /> :
                                                        platform === "LinkedIn" ?
                                                        <SlSocialLinkedin size={20} /> :
                                                        platform === "Behance" ?
                                                        <SlSocialBehance size={20} /> :
                                                        platform === "Facebook" ?
                                                        <SlSocialFacebook size={20} /> :
                                                        <BiLogoInternetExplorer size={20} />
                                                }
                                            </span>
                                            <span>{platform}</span>
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </FetchHandler>
    )
}