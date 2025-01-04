"use client";

import { useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";

import { motion } from "framer-motion";

import { isEmail } from "validator";

import emailjs from "@emailjs/browser";
import Loading from "@/components/Loading";

import { MdCheck, MdClose } from "react-icons/md";
import { AnimatePresence } from "framer-motion";


const HEADER = "Are you interested in working together and elevate your business to the next level? Let's get to work!";

export default function Contact() {
    const timeout = useRef<NodeJS.Timeout>(null);
    const [{ from_name, from_email, service, price_range, message }, setValues] = useState({ 
        from_name: "", 
        from_email: "", 
        service: "", 
        price_range: "",
        message: "" 
    });

    const [{ errorMessage, sendingError }, setError] = useState({ errorMessage: "", sendingError: false });
    const [{ sending, success }, setSendingState] = useState({ sending: false, success: false });

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }
    
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if(!(process.env.EMAIL_SERVICE_ID && process.env.EMAIL_TEMPLATE_ID && process.env.EMAIL_PUBLIC_KEY)) return;

        if(!from_email) {
            setError({ sendingError: true, errorMessage: "Please provide an email address" });
            return;
        }
        else if(!isEmail(from_email)) {
            setError({ sendingError: true, errorMessage: "Email address is invalid" });
            return;
        }
        else if(!message) {
            setError({ sendingError: true, errorMessage: "Message cannot be empty" });
            return;
        }

        setError({ sendingError: false, errorMessage: "" });
        setSendingState({ sending: true, success: false });

        const emailValues = { from_name, from_email, service, price_range, message };
        emailjs
            .send(
                process.env.EMAIL_SERVICE_ID, 
                process.env.EMAIL_TEMPLATE_ID, 
                emailValues,
                process.env.EMAIL_PUBLIC_KEY
            )
            .then(() => {
                setSendingState((prev) => ({ ...prev, success: true }));
            })
            .catch((error) => {
                console.warn(error);
                setError({ sendingError: true, errorMessage: error.messge || error.text || "Could not send message" });
                setSendingState((prev) => ({ ...prev, error: true }))
            })
            .finally(() => setSendingState((prev) => ({ ...prev, sending: false })));
    };

    useEffect(() => {
        if(timeout.current) clearTimeout(timeout.current);

        timeout.current = setTimeout(() => setSendingState(prev => ({ ...prev, success: false })), 5000);
    }, [sending])

    return (
        <div className="min-h-screen pt-6 mb-10 max-w-[var(--max-width)] m-auto">
            <div className="flex flex-col gap-6">
                <h2 className="tracking-tight text-xl md:text-4xl max-w-[60ch] px-2 lg:px-6 dark:text-white/80">
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
                    <form onSubmit={handleSubmit} id="email-form" action="" className="flex flex-col gap-2 md:gap-4 overflow-clip">
                        <AnimatePresence>
                            {
                                sendingError ?
                                    <motion.div initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} className="flex items-center gap-1 p-4 rounded-[32px] bg-red-500 text-white">
                                        <button 
                                            onClick={() => setError({ errorMessage: "", sendingError: false })} 
                                            className="w-6 aspect-square rounded-full hover:bg-white/10 flex items-center justify-center"
                                        >
                                            <MdClose size={14} />
                                        </button>
                                        <span className="text-xs font-geist tracking-tight">{errorMessage}</span>
                                    </motion.div> :
                                    success ?
                                    <motion.div initial={{ y: '-100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} className="flex gap-2 p-4 rounded-[32px] bg-green-500 text-white">
                                        <MdCheck size={14} />
                                        <span className="text-xs font-geist tracking-tight">Message sent!</span>
                                    </motion.div> :
                                    null
                            }
                        </AnimatePresence>
                        <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-0 md:gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 dark:bg-white/10 items-center rounded-2xl md:rounded-[32px]">
                            <label htmlFor="from_name" className="text-sm md:text-lg tracking-tight h-full flex items-center dark:text-white/80">Name*</label>
                            <input 
                                type="text" 
                                id="from_name" 
                                name="from_name" 
                                onChange={handleChange} 
                                value={from_name}
                                className="h-10 md:h-16 text-base md:text-lg tracking-tight placeholder:text-gray-400 font-geist bg-transparent dark:text-white/80 dark:placeholder:text-white/50 focus:outline-none" 
                                placeholder="Your Name" 
                            />
                        </div>
                        <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-0 md:gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 dark:bg-white/10 items-center rounded-2xl md:rounded-[32px]">
                            <label htmlFor="from_email" className="text-sm md:text-lg tracking-tight h-full flex items-center dark:text-white/80">Email*</label>
                            <input 
                                type="email" 
                                id="from_email" 
                                name="from_email" 
                                onChange={handleChange}
                                value={from_email}
                                className="h-10 md:h-16 text-base md:text-lg tracking-tight placeholder:text-gray-400 dark:placeholder:text-white/50 dark:text-white/80 font-geist bg-transparent focus:outline-none" 
                                placeholder="name@company.com" 
                            />
                        </div>
                        <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-2 md:gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 dark:bg-white/10 rounded-2xl md:rounded-[32px]">
                            <label htmlFor="service" className="text-sm md:text-lg tracking-tight md:h-16 flex items-center dark:text-white/80">You are interested in:</label>
                            <div className="flex gap-2 flex-wrap py-2">
                                {
                                    ["UI/UX Design", "Art Direction", "Webflow Dev", "Branding", "Other"]
                                        .map((value, index) => (
                                            <span key={index} className="relative flex items-center justify-center px-3 py-1 rounded-full border border-gray-200 dark:border-white/20 text-gray-400 dark:text-white/50 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:border-transparent hover:text-gray-400 dark:hover:text-white/60 has-[input:checked]:bg-gray-200 has-[input:checked]:text-gray-500">
                                                <span className="pointer-events-none text-sm md:text-lg tracking-tight font-geist whitespace-nowrap">{value}</span>
                                                <input 
                                                    id="service" 
                                                    name="service" 
                                                    type="radio" 
                                                    onChange={handleChange}
                                                    value={value} 
                                                    className="absolute top-0 left-0 w-full h-full opacity-0"
                                                />
                                            </span>
                                        ))
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 dark:bg-white/10 rounded-2xl md:rounded-[32px]">
                            <label htmlFor="price_range" className="text-sm md:text-lg tracking-tight md:h-16 flex items-center dark:text-white/80">Budget in USD:</label>
                            <div className="flex gap-2 flex-wrap py-2">
                                {
                                    ["$1k-$5k", "$5k-$10k", "$10k-$15k", "$15k+"]
                                        .map((value, index) => (
                                            <span key={index} className="relative flex items-center justify-center px-3 py-1 rounded-full border border-gray-200 dark:border-white/20 text-gray-400 dark:text-white/50 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:border-transparent hover:text-gray-400 dark:hover:text-white/60 has-[input:checked]:bg-gray-200 has-[input:checked]:text-gray-500">
                                                <span className="pointer-events-none text-sm md:text-lg tracking-tight font-geist whitespace-nowrap">{value}</span>
                                                <input 
                                                    id="price_range" 
                                                    name="price_range" 
                                                    type="radio" 
                                                    onChange={handleChange}
                                                    value={value} 
                                                    className="absolute top-0 left-0 w-full h-full opacity-0" 
                                                />
                                            </span>
                                        ))
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-0 md:gap-4 sm:pt-2 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 dark:bg-white/10 rounded-2xl md:rounded-[32px]">
                            <label htmlFor="message" className="text-sm pt-4 md:pt-0 md:text-lg tracking-tight md:h-16 flex items-center dark:text-white/80">Project Details</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                onChange={handleChange}
                                value={message}
                                className="h-32 py-4 text-base md:text-lg tracking-tight placeholder:text-gray-400 dark:placeholder:text-white/50 dark:text-white/80 font-geist bg-transparent focus:outline-none" 
                                placeholder="Write here"
                            ></textarea>
                        </div>
                        <div className="w-full md:pl-12 grid grid-cols-[1fr,_2fr] lg:grid-cols-2">
                            <div className="hidden md:block"></div>
                            <button className="group w-full flex col-span-full md:col-span-1 dark:text-white/80">
                                <span className="flex-1 h-12 md:h-16 rounded-full border border-gray-600 dark:border-white/50 flex items-center justify-center group-hover:bg-gray-300 dark:group-hover:bg-white/20 group-hover:border-gray-300 dark:group-hover:border-transparent">
                                    <span className="text-base md:text-lg tracking-tight">Send message</span>
                                </span>
                                <span className="w-12 md:w-16 aspect-square flex items-center justify-center rounded-full border border-gray-600 dark:border-white/50 group-hover:bg-gray-300  dark:group-hover:bg-white/20 group-hover:border-gray-300 dark:group-hover:border-transparent">
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