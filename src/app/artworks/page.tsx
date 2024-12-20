

import ArtworkCategories from "@/components/ArtworkCategories"
import ArtworksComponent from "@/components/Artworks"

export default function Artworks() {

    return (
        <div className='min-h-screen m-auto max-w-[var(--max-width)]'>
            <h1 className="my-6 font-geist text-xl lg:text-3xl tracking-tight text-center mb-4 px-6">My Artworks</h1>
            <div className="lg:sticky relative lg:top-2 z-10 w-fit m-auto mb-6">
                <ArtworkCategories />
            </div>
            <ArtworksComponent />
        </div>
    )
}