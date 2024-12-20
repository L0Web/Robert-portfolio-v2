import { globalLoadingContext } from "@/utils/globalLoadingContext";
import { useContext } from "react";
import { SlSocialBehance, SlSocialInstagram, SlSocialLinkedin, SlSocialTwitter } from "react-icons/sl"

export default function Footer() {
    const { isLoadingGlobally, loadingText } = useContext(globalLoadingContext);

    return (
        <footer className="">
            <div className="max-w-[var(--max-width)] flex gap-4 m-auto px-6 py-2">
                <div className="hidden lg:block flex-1">
                    <span className="flex items-center h-full text-gray-500 justify-center gap-2 w-fit">
                        <span className="text-sm tracking-tight">Robert Orji, Copyright <span className="font-geist">2024</span></span>
                        <span className="block h-4 w-0 border-l border-gray-300"></span>
                        <span className="text-sm tracking-tight">Last updated - <span className="font-geist">2.02.2024</span></span>
                    </span>
                </div>
                <div className="flex-1 h-8 flex flex-col items-center overflow-hidden">
                    <span className={`${isLoadingGlobally ? '' : '-translate-y-full'} transition-transform ease-expo duration-500 flex gap-2 p-1 h-8 pr-4 items-center justify-center border border-gray-400/60 rounded-full`}>
                        <span className="animate-rotate relative w-6 h-6 rounded-full border border-gray-400">
                            <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 aspect-square rounded-full border border-gray-400" />
                            <span className="absolute top-1/2 right-1 -translate-y-1/2 w-1 aspect-square rounded-full border border-gray-400" />
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 aspect-square rounded-full border border-gray-400" />
                            <span className="absolute top-1/2 left-1 -translate-y-1/2 w-1 aspect-square rounded-full border border-gray-400" />
                        </span>
                        <span className="text-sm tracking-tight text-gray-600">{loadingText ? 'Loading more...' : loadingText}</span>
                    </span>
                    <a href="#" className={`${!isLoadingGlobally ? '-translate-y-full' : 'translate-y'} transition-transform ease-expo duration-500 flex items-center justify-center gap-2 p-1 h-8 px-4 rounded-full bg-gray-300 text-gray-500 hover:bg-gray-400/50 hover:text-gray-600`}>
                        <span className="text-sm tracking-tight">Back to top</span>
                    </a>
                </div>
                <div className="flex-1 hidden lg:flex items-center justify-end gap-1">
                    <div className="group/footer-1 relative h-8 px-3 rounded-full border border-gray-400/60 flex items-center justify-center">
                        <span className="text-sm text-gray-600">Credits</span>
                        <div className="absolute bottom-full right-0 flex flex-col gap-1 pb-2 w-fit min-w-[200px] pointer-events-none opacity-0 group-hover/footer-1:opacity-100 group-hover/footer-1:pointer-events-all transition-opacity duration-500 ease-expo">
                            <div className="grid grid-cols-[8ch,_1fr] gap-2 p-3 tracking-tight text-gray-600 rounded-lg border border-gray-400/60 bg-gray-200">
                                <span className="text-xs">Design</span>
                                <span className="text-xs whitespace-nowrap">Yi Zheng</span>
                            </div>
                            <div className="grid grid-cols-[8ch,_1fr] gap-2 p-3 tracking-tight text-gray-600 rounded-lg border border-gray-400/60 bg-gray-200">
                                <span className="text-xs">Developer</span>
                                <span className="text-xs">Ezema Emmanuel</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative group/footer-2 h-8 px-3 rounded-full border border-gray-400/60 flex items-center justify-center">
                        <span className="text-sm text-gray-600">Contact</span>
                        <div className="absolute bottom-full right-0 flex flex-col gap-1 pb-2 w-fit min-w-[200px] pointer-events-none opacity-0 group-hover/footer-2:opacity-100 group-hover/footer-2:pointer-events-all transition-opacity duration-500 ease-expo">
                            <div className="grid grid-cols-[8ch,_1fr] gap-2 p-3 tracking-tight text-gray-600 rounded-lg border border-gray-400/60 bg-gray-200">
                                <span className="text-xs">Email</span>
                                <span className="text-xs">emmanuelezema6@gmail.com</span>
                            </div>
                            <div className="grid grid-cols-[8ch,_1fr] gap-2 p-3 tracking-tight text-gray-600 rounded-lg border border-gray-400/60 bg-gray-200">
                                <span className="text-xs">Socials</span>
                                <div className="flex justify-start flex-wrap gap-3">
                                    {
                                        [
                                            {
                                                title: "Twitter",
                                                Icon: SlSocialTwitter
                                            },
                                            {
                                                title: "Instagrm",
                                                Icon: SlSocialInstagram
                                            },
                                            {
                                                title: "Behance",
                                                Icon: SlSocialBehance
                                            },
                                            {
                                                title: "LinkedIn",
                                                Icon: SlSocialLinkedin
                                            },
                                        ].map(({ title, Icon }, index) => (
                                            <span key={index} className="flex items-center justify-center gap-1">
                                                <Icon size={12} />
                                                <span className="text-xs">{title}</span>
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}