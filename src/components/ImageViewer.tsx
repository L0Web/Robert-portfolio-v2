

import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { MdClose } from "react-icons/md";
import { ArtworkImage } from "@/types";


type ImageViewerProps = {
    images: ArtworkImage[] | undefined; 
    ref: React.RefObject<HTMLDialogElement | null>; 
    closeDialog: () => void;
    currentImageIndex: number;
    setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function ImageViewer({ images, ref, closeDialog, currentImageIndex, setCurrentImageIndex, }: ImageViewerProps) {
    const nextImage = () => currentImageIndex + 1 < Number(images?.length) && setCurrentImageIndex(currentImageIndex + 1);
    const prevImage = () => currentImageIndex - 1 >= 0 && setCurrentImageIndex(currentImageIndex - 1);

    return (
        <dialog ref={ref} className="fixed z-[999] top-0 left-0 flex pointer-events-none open:pointer-events-auto opacity-0 open:opacity-100 w-screen h-screen bg-white/50 dark:bg-black/50 backdrop-blur-lg backdrop:bg-transparent transition-opacity duration-500 ease-expo">
            <div className="relative w-full h-full p-2 md:p-6 grid grid-cols-1 grid-rows-[auto,_1fr,_auto] md:grid-rows-1 md:grid-cols-[auto,_1fr,_auto] gap-4">
                <div className="flex">
                    <button onClick={closeDialog} className="flex items-center justify-center gap-2 pl-4 pr-2 h-8 border border-gray-400 dark:border-white/20 text-gray-600 dark:text-white/60 dark:text-white-60 rounded-full hover:bg-black/10 dark:hover:bg-white/10 dark:hover:text-white/60 hover:border-transparent">
                        <span className="text-sm tracking-close">Close</span>
                        <MdClose size={16} />
                    </button>
                </div>
                <div className="relative overflow-hidden">
                    {
                        images?.map(({ image, id }, index) => (
                            <div 
                                key={id} 
                                style={{ transform: `translatex(${(index - currentImageIndex) * 100}%) scale(${index === currentImageIndex ? '1' : '.5'})` }}
                                className={`${index === currentImageIndex ? '' : 'opacity-0'} transition-[opacity,_transform] origin-left ease-expo duration-[1000ms] absolute top-0 left-0 w-full h-full flex items-center justify-center`}
                            >
                                <Image src={image.publicUrl} alt={`full Screen Image ${index + 1}`} width={1024} height={1024} className="w-auto h-full object-contain" />
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-row md:flex-col justify-between gap-4 items-center md:items-end">
                    <span className="flex items-center justify-center gap-2 text-xl tracking-tight font-geist text-gray-600 dark:text-white/80">
                        <span className="relative block overflow-hidden">
                            <span className="opacity-0">00</span>
                            <div style={{ transform: `translateY(${currentImageIndex * -100}%)` }} className="transition-transform ease-expo duration-1000 absolute top-0 left-0 w-full h-full flex flex-col">
                                {
                                    images?.map(({ id }, index) => (
                                        <span key={id} className="block">
                                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                        </span>
                                    ))
                                }
                            </div>
                        </span>
                        <span>—</span>
                        <span>{`${Number(images?.length)< 10 ? `0${Number(images?.length)}` : Number(images?.length)}`}</span>
                    </span>
                    <div className="flex items-center justify-center gap-2">
                        <button onClick={prevImage} className="h-8 rounded-full px-4 flex items-center justify-center border border-gray-400 dark:text-white/60 dark:border-white/20 hover:bg-black/20  dark:hover:bg-white/10 dark:hover:text-white/80 hover:border-transparent">
                            <GoArrowLeft size={18} />
                        </button>
                        <button onClick={nextImage} className="h-8 rounded-full px-4 flex items-center justify-center border border-gray-400 dark:text-white/60 dark:border-white/20 hover:bg-black/20  dark:hover:bg-white/10 dark:hover:text-white/80 hover:border-transparent">
                            <GoArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}