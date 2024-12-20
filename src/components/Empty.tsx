
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const HEADER = "It's Empty";

export default function Empty({ text }: { text: string }) {
    
    return (
        <div className="flex flex-col items-center justify-center">
            <h3 className="text-[4rem] font-semibold text-gray-500">{HEADER}</h3>
            <p className="text-base tracking-tight text-gray-400 mt-4">{text}</p>
            <Link href="/artworks" className="mt-2 flex items-center justify-center gap-2 px-8 h-10 rounded-full bg-gray-300/50 text-gray-500 hover:bg-gray-300 hover:text-gray-600">
                <span className="text-sm tracking-tight">Other artworks</span>                
                <GoArrowRight size={16} />
            </Link>
        </div>
    )
}