"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE = [.61,.41,.32,.96];

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                initial={{ scale: .9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: EASE }}
                key={pathname}
            >
                <motion.div 
                    key={pathname} 
                    initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} 
                    animate={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }} 
                    transition={{ duration: 1, ease: EASE }}
                    className="fixed top-0 left-0 pointer-events-none bg-gray-200 dark:bg-[#202020] w-full h-screen z-[99]" 
                />
                {children}
            </motion.div>
        </AnimatePresence>
    )
}