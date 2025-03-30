"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { motion } from "framer-motion";

import { Artwork as ArtworkType } from "@/types";

import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

interface ModifiedArtworkType extends ArtworkType {
    isRelated?: boolean;
};

export default function Artwork({ _id, title, categories, images, isRelated }: ModifiedArtworkType) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const nextImage = () => setCurrentImageIndex(currentImageIndex + 1 >= images.length ? currentImageIndex : currentImageIndex + 1);
    const prevImage = () => setCurrentImageIndex(currentImageIndex - 1 < 0 ? currentImageIndex : currentImageIndex - 1);

    const handleClick = () => document.documentElement.scroll(0, 0);
  
    return (
      <motion.li 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        style={{ WebkitColumnBreakInside: 'avoid' } as React.CSSProperties} 
        className="relative mb-2 w-full h-auto ease-expo transition-opaicity duration-500 flex flex-col"
      >
        <div className="relative">
          {
            images.length > 1 ? 
              <>
                <button onClick={prevImage} className={`image-btn ${currentImageIndex <= 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-100 active:opacity-80'} w-6 aspect-square flex items-center justify-center bg-white/50 opacity-80 rounded-full text-black backdrop-blur-md absolute top-1/2 -translate-y-1/2 left-3 z-[1]`}>
                  <FiChevronLeft size={14} className="pointer-events-none" />
                </button>
                <button onClick={nextImage} className={`image-btn ${currentImageIndex >= images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-100 active:opacity-80'} w-6 aspect-square flex items-center justify-center bg-white/50 opacity-80 rounded-full text-black backdrop-blur-md absolute top-1/2 -translate-y-1/2 right-3 z-[1]`}>
                  <FiChevronRight size={14} className="pointer-events-none" />
                </button>
              </> :
              null
          }
          <Link 
            href={`/artworks/artwork/${_id}`} 
            onClick={handleClick}
            className="flex flex-col gap-1"
          >
            <div className="relative overflow-hidden rounded-xl">
              <Image 
                src={images[0]?.image?.publicUrl} 
                alt={`image of artwork: ${title} 1`} 
                height={600} 
                width={1000} 
                className={`w-full ${isRelated ? 'aspect-square object-cover' : 'h-auto'} rounded-xl`}
              />
              <div className="absolute top-0 left-0 w-full h-full">
                {
                  images.slice(1,).map(({ _id, image }, index) => (
                    <div 
                      key={_id}
                      style={{ transform: `translateX(${Math.max(0, (-currentImageIndex + (index + 1)) * 100)}%)` }}
                      className="absolute top-0 left-0 w-full h-full transition-transform ease-expo duration-500"
                    >
                      <Image 
                        src={image.publicUrl} 
                        alt={`image of artwork: ${title} ${index + 2}`} 
                        fill
                        className="object-cover" 
                      />
                    </div>
                  ))
                }
              </div>
            </div>
          </Link>
        </div>
        <Link href={`/artworks/artwork/${_id}`} onClick={handleClick} className="pt-2 flex justify-between gap-4">
            <div className="flex flex-col">
                <span className="text-xs lg:text-sm font-semibold tracking-tight dark:text-white/80">{title}</span>
                <span className="text-[.6rem] lg:text-xs tracking-tight text-gray-600 dark:text-white/50">
                  {categories}
                </span>
            </div>
            <span className="flex items-center justify-center px-2 h-4 lg:h-6 rounded-full bg-gray-300 dark:bg-white/10 dark:text-white/60 text-[.55rem] lg:text-[.6rem]">
              {
                images.length > 1 ?
                  <>
                  <span>{currentImageIndex + 1}</span>
                  <span>/</span>
                  <span>{images.length}</span>
                  </> :
                  <span>Detail</span>
              }
            </span>
        </Link>
      </motion.li>
    )
  }