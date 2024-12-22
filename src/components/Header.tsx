"use client";

import { FiChevronRight } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ArtworkCategories from "./ArtworkCategories";
import { useEffect, useRef, useState } from "react";

const NAVIGATION = [
    {
        title: "Works",
        href: "/artworks"
    },
    {
        title: "About",
        href: "/about"
    },
    {
        title: "Contact",
        href: "/contact"
    }
];

function NavLink ({ title, href, isActive }: { title: string; href: string; isActive: boolean; }) {
    return (                                    
        <Link 
            href={href} 
            className={`border flex rounded-full ${isActive ? 'border-gray-200 dark:border-transparent bg-black/10 dark:bg-white/10 text-black dark:text-white/80' : 'border-gray-300 dark:border-white/10 dark:text-white/50 text-gray-500 hover:bg-black/5 hover:border-gray-200 dark:hover:border-white/30'} border-gray-300 items-center justify-center px-3 h-full text-xs`}
        >
            <span>{title}</span>
        </Link>
    )
}


export default function Header({ theme, toggleTheme }: { theme: 'light' | 'dark'; toggleTheme: () => void; }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();
    const hideArtworkCategories = pathname === "/" || pathname === "/artworks" || pathname === "/artworks/";

    const [hideNav, setHideNav] = useState(false);
    const [showAlternativeNav, setShowAlternativeNav] = useState(false);


    useEffect(() => {
        const handleWindowResize = () => {
            if(!containerRef?.current || !navRef?.current) return;
            const parentRect = containerRef.current.getBoundingClientRect();
            const childRect = navRef.current.getBoundingClientRect();

            const childIsOverflowing = (parentRect.left + parentRect.width) > (childRect.left + childRect.width);

            setShowAlternativeNav(childIsOverflowing);
        };
        handleWindowResize();

        window.addEventListener('resive', handleWindowResize);

        return () => window.removeEventListener('resive', handleWindowResize);
    }, [navRef, containerRef]);

    useEffect(() => {
        document.documentElement.scroll(0, 0);
    }, [pathname])

    return (
        <div className="sticky top-0 z-[999] lg:z-10 bg-gray-200 dark:bg-[#202020] transition-[background-color] duration-300 ease-expo">
            <div className="m-auto max-w-[var(--max-width)] grid grid-cols-[1fr,_auto] lg:grid-cols-3 px-2 lg:px-4 py-2">
                <div ref={containerRef} className="h-8 lg:h-10 max-w-fit">
                    <div className="h-full flex items-center">
                        <Link href="/" className={`${showAlternativeNav ? 'aspect-square' : 'sm:px-3 lg:px-4'} h-full min-w-8 flex border border-gray-400 dark:border-white/30 items-center justify-center rounded-full`}>
                            <h2 className="text-base lg:text-xl tracking-tight text-black dark:text-white/80 whitespace-nowrap">
                                <span>R</span>
                                <span className={`${showAlternativeNav ? '' : 'sm:inline'} hidden`}>obert Orji</span>
                            </h2>
                        </Link>
                        <div className="h-8 lg:h-10 overflow-hidden">
                            <div ref={navRef} className={`${hideNav ? 'translate-x-[calc(-100%_+_36px)] lg:translate-x-[calc(-100%_+_44px)]' : ''} transition-transform duration-500 ease-expo flex h-full`}>
                                <nav className={`${hideNav ? 'scale-0 opacity-0' : ''} transition-[opacity,_transform] duration-500 ease-expo flex h-full rounded-full border border-gray-400 dark:border-white/30 p-[2px] lg:p-1`}>
                                    <ul className="flex gap-1 h-full">
                                        {
                                            NAVIGATION.map((item, index) => (
                                                <li key={index}>
                                                    <NavLink {...item} isActive={pathname === item.href} />
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                                <button onClick={() => setHideNav(!hideNav)} className={`${hideNav ? '' : '-rotate-180'} transition-transform duration-500 delay-300 ease-expo h-full w-8 lg:w-10 aspect-square rounded-full flex items-center justify-center dark:text-white/80 border border-gray-400 dark:border-white/30 bg-white/20 dark:bg-transparent mr-1 hover:bg-gray-300 dark:hover:bg-white/10 hover:border-gray-400/50 dark:hover:border-transparent`}>
                                    <FiChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                    {hideArtworkCategories ? null : <ArtworkCategories />}
                </div>
                <div className="flex justify-end items-center">
                    <button onClick={toggleTheme} className="flex p-1 rounded-full bg-black/10 dark:bg-white/20 hover:bg-black/20 dark:hover:bg-white/40">
                        <span className={`${theme === 'dark' ? 'translate-x-full' : ''} block w-4 h-4 rounded-full bg-gray-200 dark:bg-[#202020] transition-transform ease-expo duration-500`}></span>
                        <span className="block w-4 h-4 rounded-full bg-transparent"></span>
                    </button>
                </div>
            </div>
        </div>
    )
}