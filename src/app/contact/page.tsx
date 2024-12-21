"use client";

import { useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";

import emailjs from "@emailjs/browser";
import Loading from "@/components/Loading";
import { MdCheck, MdClose } from "react-icons/md";


const HEADER = "Are you interested in working together and elevate your business to the next level? Let's get to work!";

export default function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const [{ sending, sendingError, success }, setSendingState] = useState({ sending: false, sendingError: false, success: false });
    
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setSendingState({ sending: true, sendingError: false, success: false });

        if(!(form.current && process.env.EMAIL_SERVICE_ID && process.env.EMAIL_TEMPLATE_ID)) return;

        emailjs.sendForm(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, form.current, {
                publicKey: process.env.EMAIL_PUBLIC_KEY
            }).then(() => {
                setSendingState((prev) => ({ ...prev, success: true }));
            }).catch((error) => {
                console.warn(error.text);
                setSendingState((prev) => ({ ...prev, error: true }))
            }).finally(() => setSendingState((prev) => ({ ...prev, sending: false })));
    }

    return (
        <div className="min-h-screen pt-6 mb-10 max-w-[var(--max-width)] m-auto">
            <div className="flex flex-col gap-6">
                <h2 className="tracking-tight text-xl md:text-4xl max-w-[60ch] px-2 lg:px-6">
                    {HEADER}
                </h2>
                <div className="relative px-2 lg:px-6 py-4">
                    {
                        sending ?
                            <div className="absolute z-[2] flex items-center justify-center  top-0 left-0 w-full h-full bg-gray-200/30 backdrop-blur-md">
                                <Loading text="Sending message..." />
                            </div> :
                            null
                    }
                    <form ref={form} onSubmit={handleSubmit} id="email-form" action="" className="flex flex-col gap-4">
                        {
                            sendingError ?
                                <div className="flex gap-2 p-4 rounded-[32px] bg-red-500 text-white">
                                    <MdClose size={14} />
                                    <span className="text-xs font-geist tracking-tight">Message could not be sent!</span>
                                </div> :
                                success ?
                                <div className="flex gap-2 p-4 rounded-[32px] bg-green-500 text-white">
                                    <MdCheck size={14} />
                                    <span className="text-xs font-geist tracking-tight">Message sent!</span>
                                </div> :
                                null
                        }
                        <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-0 md:gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 items-center rounded-2xl md:rounded-[32px]">
                            <label htmlFor="from_name" className="text-sm md:text-lg tracking-tight h-full flex items-center">Name*</label>
                            <input type="text" id="from_name" name="from_name" className="h-10 md:h-16 text-base md:text-lg tracking-tight placeholder:text-gray-400 font-geist bg-transparent focus:outline-none" placeholder="Your Name" />
                        </div>
                        <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-0 md:gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 items-center rounded-2xl md:rounded-[32px]">
                            <label htmlFor="from_email" className="text-sm md:text-lg tracking-tight h-full flex items-center">Email*</label>
                            <input type="text" id="from_email" name="from_email" className="h-10 md:h-16 text-base md:text-lg tracking-tight placeholder:text-gray-400 font-geist bg-transparent focus:outline-none" placeholder="name@company.com" />
                        </div>
                        <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 rounded-2xl md:rounded-[32px]">
                            <label htmlFor="service" className="text-sm md:text-lg tracking-tight md:h-16 flex items-center">You are interested in:</label>
                            <div className="flex gap-2 flex-wrap md:py-2">
                                {
                                    ["UI/UX Design", "Art Direction", "Webflow Dev", "Branding", "Other"]
                                        .map((value, index) => (
                                            <span key={index} className="relative flex items-center justify-center px-3 py-1 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-200/50 hover:border-transparent hover:text-gray-400 has-[input:checked]:bg-gray-200 has-[input:checked]:text-gray-500">
                                                <span className="pointer-events-none text-sm md:text-lg tracking-tight font-geist whitespace-nowrap">{value}</span>
                                                <input id="service" name="service" type="radio" value={value} className="absolute top-0 left-0 w-full h-full opacity-0" />
                                            </span>
                                        ))
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 rounded-2xl md:rounded-[32px]">
                            <label htmlFor="price_range" className="text-sm md:text-lg tracking-tight md:h-16 flex items-center">Budget in USD:</label>
                            <div className="flex gap-2 flex-wrap py-2">
                                {
                                    ["$1k-$5k", "$5k-$10k", "$10k-$15k", "$15k+"]
                                        .map((value, index) => (
                                            <span key={index} className="relative flex items-center justify-center px-3 py-1 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-200/50 hover:border-transparent hover:text-gray-400 has-[input:checked]:bg-gray-200 has-[input:checked]:text-gray-500">
                                                <span className="pointer-events-none text-sm md:text-lg tracking-tight font-geist whitespace-nowrap">{value}</span>
                                                <input id="price_range" name="price_range" type="radio" value={value} className="absolute top-0 left-0 w-full h-full opacity-0" />
                                            </span>
                                        ))
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-0 md:gap-4 sm:pt-2 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 rounded-2xl md:rounded-[32px]">
                            <label htmlFor="message" className="text-sm md:text-lg tracking-tight md:h-16 flex items-center">Project Details</label>
                            <textarea id="message" name="message" className="h-32 py-4 text-sm md:text-lg tracking-tight placeholder:text-gray-400 font-geist bg-transparent focus:outline-none" placeholder="Write here"></textarea>
                        </div>
                        <div className="w-full md:pl-12 grid grid-cols-[1fr,_2fr] lg:grid-cols-2">
                            <div className="hidden md:block"></div>
                            <button className="group w-full flex col-span-full md:col-span-1">
                                <span className="flex-1 h-16 rounded-full border border-gray-600 flex items-center justify-center group-hover:bg-gray-300 group-hover:border-gray-300">
                                    <span className="text-lg tracking-tight">Send message</span>
                                </span>
                                <span className="w-16 h-16 flex items-center justify-center rounded-full border border-gray-600 group-hover:bg-gray-300 group-hover:border-gray-300">
                                    <VscSend size={20} />
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}