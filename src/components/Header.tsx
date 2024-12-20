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
            className={`border flex rounded-full ${isActive ? 'border-gray-200 bg-black/10 text-black' : 'border-gray-300 text-gray-600 hover:bg-black/5 hover:border-gray-200'} border-gray-300 items-center justify-center px-3 h-full text-xs`}
        >
            <span>{title}</span>
        </Link>
    )
}


export default function Header() {
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

            const childIsOverflowing = (parentRect.left + parentRect.width) <= (childRect.left + childRect.width);

            console.log(childIsOverflowing, parentRect.width + parentRect.left, childRect.width + childRect.left);

            setShowAlternativeNav(childIsOverflowing);
        };
        handleWindowResize();

        window.addEventListener('resive', handleWindowResize);

        return () => window.removeEventListener('resive', handleWindowResize);
    }, [navRef, containerRef])

    return (
        <div className="sticky top-0 z-[999] lg:z-10 bg-gray-200">
            <div className="m-auto max-w-[var(--max-width)] grid grid-cols-[1fr,_auto] lg:grid-cols-3 px-2 lg:px-4 py-2">
                <div ref={containerRef} className="h-8 lg:h-10 max-w-fit">
                    <div className="h-full flex items-center">
                        <Link href="/" className={`${showAlternativeNav ? 'aspect-square' : 'sm:px-3 lg:px-4'} h-full min-w-8 flex border border-gray-400 items-center justify-center rounded-full`}>
                            <h2 className="text-base lg:text-xl tracking-tight text-black whitespace-nowrap">
                                <span>R</span>
                                <span className={`${showAlternativeNav ? '' : 'sm:inline'} hidden`}>obert Orji</span>
                            </h2>
                        </Link>
                        <div className="h-8 lg:h-10 overflow-hidden">
                            <div ref={navRef} className={`${hideNav ? 'translate-x-[calc(-100%_+_36px)] lg:translate-x-[calc(-100%_+_44px)]' : ''} transition-transform duration-500 ease-expo flex h-full`}>
                                <nav className={`${hideNav ? 'scale-0 opacity-0' : ''} transition-[opacity,_transform] duration-500 ease-expo flex h-full rounded-full border border-gray-400 bg-gray-200 p-[2px] lg:p-1`}>
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
                                <button onClick={() => setHideNav(!hideNav)} className={`${hideNav ? '' : '-rotate-180'} transition-transform duration-500 delay-300 ease-expo h-full w-8 lg:w-10 aspect-square rounded-full flex items-center justify-center border border-gray-400 bg-white/20 mr-1 hover:bg-gray-300 hover:border-gray-400/50`}>
                                    <FiChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                    {
                        hideArtworkCategories ? null : <ArtworkCategories />
                    }
                </div>
                <div className="flex justify-end items-center">
                    <button className="flex group p-1 rounded-full bg-black/10 hover:bg-black/20">
                        <span className="block w-4 h-4 rounded-full bg-black/20 group-focus:translate-x-full transition-transform ease-expo duration-500"></span>
                        <span className="block w-4 h-4 rounded-full bg-transparent"></span>
                    </button>
                </div>
            </div>
        </div>
    )
}