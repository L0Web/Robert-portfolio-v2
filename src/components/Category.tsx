
import { Category as CategoryType } from "@/types";
import Link from "next/link";
import { useMemo } from "react";

interface ModifiedCategoryType extends CategoryType {
    selectedCategories: string;
    closeDialog: () => void;
}

export default function Category({ id, name, selectedCategories, closeDialog }: ModifiedCategoryType) {
    const isSelected = useMemo(() => selectedCategories.includes(id), [selectedCategories, id]);
    const newSelectedCategories = useMemo(() => (isSelected ? 
        [...(selectedCategories.split(" "))].filter((item) => !item.includes(id)).join(" ") :
        [...(selectedCategories.split(" ")), id].join(" ")
    ), [selectedCategories, id, isSelected]);

    return (
        <Link 
            href={`/artworks?categories=${newSelectedCategories}`} 
            onClick={closeDialog}
            className={`w-full max-w flex items-center justify-center gap-1 h-full rounded-full ${isSelected ? 'bg-black/10 text-black px-3' : 'bg-black/5 text-gray-600 px-4 tracking-tight hover:bg-black/10'}`}
        >
            <span className="text-xs whitespace-nowrap">{name}</span>
        </Link>
    )
}