import { VscSend } from "react-icons/vsc";


const HEADER = "Are you interested in working together and elevate your business to the next level? Let's get to work!";

export default function Contact() {

    return (
        <div className="min-h-screen lg:min-h-[80vh] pt-6 mb-10 max-w-[var(--max-width)] m-auto">
            <div className="flex flex-col gap-10 px-2 lg:px-6">
                <h2 className="tracking-tight text-xl md:text-4xl max-w-[60ch]">
                    {HEADER}
                </h2>
                <form action="" className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-0 md:gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 items-center rounded-2xl md:rounded-[32px]">
                        <label htmlFor="name" className="text-sm md:text-lg tracking-tight h-full flex items-center">Name*</label>
                        <input type="text" id="name" className="h-10 md:h-16 text-base md:text-lg tracking-tight placeholder:text-gray-400 font-geist bg-transparent focus:outline-none" placeholder="Your Name" />
                    </div>
                    <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-0 md:gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 items-center rounded-2xl md:rounded-[32px]">
                        <label htmlFor="email" className="text-sm md:text-lg tracking-tight h-full flex items-center">Email*</label>
                        <input type="text" id="email" className="h-10 md:h-16 text-base md:text-lg tracking-tight placeholder:text-gray-400 font-geist bg-transparent focus:outline-none" placeholder="name@company.com" />
                    </div>
                    <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 rounded-2xl md:rounded-[32px]">
                        <label htmlFor="reason" className="text-sm md:text-lg tracking-tight md:h-16 flex items-center">You are interested in:</label>
                        <div className="flex gap-2 flex-wrap md:py-2">
                            {
                                ["UI/UX Design", "Art Direction", "Webflow Dev", "Branding", "Other"]
                                    .map((work, index) => (
                                        <span key={index} className="flex items-center justify-center px-3 py-1 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-200/50 hover:border-transparent hover:text-gray-400">
                                            <span className="text-sm md:text-lg tracking-tight font-geist whitespace-nowrap">{work}</span>
                                        </span>
                                    ))
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-4 pt-4 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 rounded-2xl md:rounded-[32px]">
                        <label htmlFor="price" className="text-sm md:text-lg tracking-tight md:h-16 flex items-center">Budget in USD:</label>
                        <div className="flex gap-2 flex-wrap py-2">
                            {
                                ["$1k-$5k", "$5k-$10k", "$10k-$15k", "$15k+"]
                                    .map((price, index) => (
                                        <span key={index} className="flex items-center justify-center px-3 py-1 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-200/50 hover:border-transparent hover:text-gray-400">
                                            <span className="text-sm md:text-lg tracking-tight font-geist whitespace-nowrap">{price}</span>
                                        </span>
                                    ))
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-1 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr,_2fr] lg:grid-cols-2 gap-0 md:gap-4 sm:pt-2 pb-2 md:pt-0 md:pb-0 px-4 md:px-6 bg-black/10 rounded-2xl md:rounded-[32px]">
                        <label htmlFor="details" className="text-sm md:text-lg tracking-tight md:h-16 flex items-center">Project Details</label>
                        <textarea id="details" className="h-32 py-4 text-sm md:text-lg tracking-tight placeholder:text-gray-400 font-geist bg-transparent focus:outline-none" placeholder="Write here"></textarea>
                    </div>
                    <div className="w-full md:pl-12 grid grid-cols-[1fr,_2fr] lg:grid-cols-2">
                        <div className="hidden md:block"></div>
                        <button className="w-full flex col-span-full md:col-span-1">
                            <span className="flex-1 h-16 rounded-full border border-black flex items-center justify-center">
                                <span className="text-lg tracking-tight">Send message</span>
                            </span>
                            <span className="w-16 h-16  flex items-center justify-center rounded-full border border-black">
                                <VscSend size={20} />
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}