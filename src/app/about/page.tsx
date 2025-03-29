"use client";


import Image from "next/image";

import { v4 as generateId } from "uuid";

import { QueryResult } from "@/types";
import FetchHandler from "@/components/LoadingAndErrorContainer";

import { BiLogoInternetExplorer } from "react-icons/bi";
import { SlSocialBehance, SlSocialInstagram, SlSocialLinkedin, SlSocialTwitter, SlSocialFacebook } from "react-icons/sl";
import { useFetch } from "@/utils/hook";

const BACKEND_URI = process.env.NEXT_PUBLIC_API_URI;

export default function About() {
    const { loading: socialsLoading, error: socialsError, data: socialsData, refetch: socialsRefetch } = useFetch<QueryResult>(`${BACKEND_URI}/robert/socials`);
    const { loading: aboutsLoading, error: aboutsError, data: aboutsData, refetch: aboutsRefetch } = useFetch<QueryResult>(`${BACKEND_URI}/robert/abouts`);
    const { loading: profilePicLoading, error: profilePicError, data: profilePicData, refetch: profilePicRefeth } = useFetch<QueryResult>(`${BACKEND_URI}/robert/profile-picture`);

    const refetch = () => {
        socialsRefetch();
        aboutsRefetch();
        profilePicRefeth();
    }

    return (
        <FetchHandler loading={socialsLoading || aboutsLoading || profilePicLoading} error={Boolean(socialsError || aboutsError || profilePicError)} refetch={refetch}>
            <div className="relative pt-[10vh] mb-[160px] min-h-screen max-w-[var(--max-width)] m-auto grid grid-cols-1 lg:grid-cols-[320px,_2fr,_320px] gap-2">
                <div className="hidden lg:block w-[320px]">
                    {
                        profilePicData?.profilePicture?.image?.publicUrl ?
                            <Image 
                                src={profilePicData.profilePicture.image.publicUrl} 
                                width={1000} 
                                height={1000} 
                                alt="Robert Orji's profile picture" 
                                className="grayscale w-full h-auto rounded-r-xl" 
                            /> :
                            null
                    }
                </div>
                <div>
                    <section className="flex flex-col gap-20 m-auto w-fit px-2">
                        {
                            aboutsData
                                ?.abouts
                                ?.map(({ _id, title, text }) => (
                                    <div key={_id} className="flex flex-col gap-4">
                                        <h2 className="text-3xl tracking-tight dark:text-white/80">{title}</h2>
                                        <p className="max-w-[60ch] tracking-tight text-xl text-gray-600 dark:text-white/50">
                                            {
                                                text
                                                    .replace("\n", " _space_ ")
                                                    .split(" ")
                                                    .map((characters, index) => (
                                                        characters.includes('_space_') ?
                                                            <>
                                                            <br key={generateId()} />
                                                            <br key={generateId()} /> 
                                                            </> :
                                                            /[a-z0-9-]+@[a-z]+.[a-z]+/.test(characters) ?
                                                                <a key={generateId()} href={`https://${characters}`} className="underline" target="_blank">{characters}</a> :
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
                                    socialsData
                                        ?.socials
                                        ?.map(({ _id, platform, url_link }) => (
                                            <a key={_id} href={url_link} className="flex-1 flex items-center justify-center h-10 bg-gray-300 dark:bg-white/10 hover:bg-gray-300/50 dark:hover:bg-white/20 rounded-full px-4 gap-3">
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