
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";


export default function NotFound() {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="relative flex flex-col items-center justify-center">
                <h1 className="font-bold tracking-tight text-[8rem] leading-[8rem] text-gray-600 font-geist">404</h1>
                <h2 className="mt-4 text-gray-400 tracking-tight text-sm">Sorry, the page you are looking for does not exist.</h2>
                <Link href="/" className="mt-2 flex items-center justify-center gap-1 px-4 h-10 rounded-full bg-gray-300 text-gray-600">
                    <span className="text-xs tracking-tight">Back to home</span>
                    <FiArrowRight size={14} />
                </Link>
            </div>
        </div>
    )
};